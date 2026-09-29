import { ref, computed } from 'vue';

// Utilisateurs créés au premier lancement (quand rien n'est encore dans le localStorage)
const defaultUsers = [
  { id: 'admin', password: 'admin', score: 0, type: 'admin', levels: {} },
  { id: 'simon', password: '1234', score: 0, type: 'membre', levels: {} },
];

const users = ref(JSON.parse(localStorage.getItem('users')) || defaultUsers);
const currentUserId = ref(localStorage.getItem('currentUserId'));

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users.value));
}
saveUsers();

const currentUser = computed(() => users.value.find(u => u.id === currentUserId.value) || null);
const isConnected = computed(() => currentUser.value !== null);
const isAdmin = computed(() => isConnected.value && currentUser.value.type === 'admin');

export function useUsers() {
  function login(id, password) {
    const user = users.value.find(u => u.id === id && u.password === password);
    if (!user) {
      return false;
    }
    currentUserId.value = user.id;
    localStorage.setItem('currentUserId', user.id);
    return true;
  }

  function register(id, password) {
    if (!id || !password || users.value.some(u => u.id === id)) {
      return false;
    }
    users.value.push({ id, password, score: 0, type: 'membre', levels: {} });
    saveUsers();
    return login(id, password);
  }

  function logout() {
    currentUserId.value = null;
    localStorage.removeItem('currentUserId');
  }

  function setScore(score) {
    if (currentUser.value) {
      currentUser.value.score = score;
      saveUsers();
    }
  }

  // Niveau d'une upgrade pour l'utilisateur connecté (0 si jamais achetée)
  function getLevel(name) {
    if (!currentUser.value || !currentUser.value.levels) {
      return 0;
    }
    return currentUser.value.levels[name] || 0;
  }

  function levelUp(name) {
    if (currentUser.value) {
      // Les anciens comptes n'ont pas encore de "levels"
      currentUser.value.levels = currentUser.value.levels || {};
      currentUser.value.levels[name] = getLevel(name) + 1;
      saveUsers();
    }
  }

  function resetScore(id) {
    const user = users.value.find(u => u.id === id);
    if (user) {
      user.score = 0;
      saveUsers();
    }
  }

  function deleteUser(id) {
    if (id === currentUserId.value) {
      return; // l'admin ne peut pas se supprimer lui-même
    }
    users.value = users.value.filter(u => u.id !== id);
    saveUsers();
  }

  return { users, currentUser, isConnected, isAdmin, login, register, logout, setScore, getLevel, levelUp, resetScore, deleteUser };
}
