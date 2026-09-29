import { ref, watch } from 'vue';
import { useUsers } from './Users.js';

const { currentUser, isConnected, setScore, getLevel, levelUp } = useUsers();

// Coût de départ de chaque upgrade (niveau 0)
const upgrades = {
    clickBooster: { baseCost: 200 },
    autoClicker: { baseCost: 500 },
};

// Le score vient de l'utilisateur connecté
const cookieCount = ref(currentUser.value ? currentUser.value.score : 0);

// Quand on change d'utilisateur ou que son score est remis à zéro, on recharge son score
watch(() => currentUser.value ? currentUser.value.score : 0, (score) => {
    cookieCount.value = score;
});


watch(cookieCount, (score) => setScore(score));


setInterval(() => {
    if (isConnected.value) {
        cookieCount.value += getLevel('autoClicker');
    }
}, 800);


export function useCookies() {
  // Click Booster : chaque niveau double les cookies par clic
  function cookieClick() {
    cookieCount.value += getLevel('clickBooster')+1;
  }

  
  function upgradeCost(name) {
    
    return upgrades[name].baseCost * Math.pow(2, getLevel(name));

  }

  function buyUpgrade(name) {
    const cost = upgradeCost(name);
    if (cookieCount.value >= cost) {
        cookieCount.value -= cost;
        levelUp(name);
    }
  }

  return { cookieCount, cookieClick, getLevel, upgradeCost, buyUpgrade }


}
