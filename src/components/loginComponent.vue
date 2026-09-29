<template>
    <div v-if="!isConnected" class="login">
        <!-- @submit.prevent : la touche Entrée connecte sans recharger la page -->
        <form class="dome" @submit.prevent="onLogin">
            <h2>Connexion</h2>
            <input v-model="id" placeholder="Identifiant" />
            <input v-model="password" type="password" placeholder="Mot de passe" />
            <div class="actions">
                <button type="button" class="btn-text" @click="onRegister">Créer un compte</button>
                <button type="submit" class="btn-main">Se connecter</button>
            </div>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
    </div>

    <div v-else class="login connected">
        <span>Connecté en tant que <b>{{ currentUser.id }}</b> ({{ currentUser.type }})</span>
        <button class="btn-text" @click="logout">Se déconnecter</button>
    </div>
</template>


<script>
import { ref } from 'vue'
import { useUsers } from '../composables/Users.js'

export default {
    name: 'LoginComponent',
    setup() {
        const { currentUser, isConnected, login, register, logout } = useUsers()
        const id = ref('')
        const password = ref('')
        const error = ref('')

        function onLogin() {
            error.value = login(id.value, password.value) ? '' : 'Identifiant ou mot de passe incorrect'
            password.value = ''
        }

        function onRegister() {
            error.value = register(id.value, password.value) ? '' : 'Identifiant déjà pris ou champs vides'
            password.value = ''
        }

        return { currentUser, isConnected, id, password, error, onLogin, onRegister, logout }
    }
}
</script>

<style scoped>
.login {
    font-family: 'Google Sans', 'Roboto', Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Demi-cercle : largeur = 2 × hauteur, coins du haut arrondis à fond */
.dome {
    width: min(560px, 100%);
    aspect-ratio: 2 / 1;
    box-sizing: border-box;
    border-radius: 50% 50% 0 0 / 100% 100% 0 0;
    /* Contour en dégradé : fond blanc à l'intérieur, dégradé sur la bordure */
    border: 5px solid transparent;
    border-bottom: none;
    background:
        linear-gradient(white, white) padding-box,
        linear-gradient(135deg, #f4b400, #d9822b, #8b4513) border-box;
    box-shadow: 0 -6px 24px rgba(139, 69, 19, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    padding-bottom: 20px;
}

h2 {
    margin: 0 0 4px;
    font-weight: 500;
    font-size: 1.6em;
    color: #202124;
}

input {
    width: 60%;
    box-sizing: border-box;
    padding: 12px 16px;
    font-family: inherit;
    font-size: 1em;
    border: 1px solid #dadce0;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus {
    border-color: #d9822b;
    box-shadow: 0 0 0 3px rgba(217, 130, 43, 0.2);
}

.actions {
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    font-family: inherit;
    font-size: 0.95em;
    font-weight: 500;
    cursor: pointer;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    transition: background 0.2s;
}

.btn-main {
    background: #d9822b;
    color: white;
}

.btn-main:hover {
    background: #b86a1f;
}

.btn-text {
    background: transparent;
    color: #d9822b;
}

.btn-text:hover {
    background: rgba(217, 130, 43, 0.1);
}

.error {
    color: #d93025;
    font-size: 0.9em;
}

/* Une fois connecté : petite barre arrondie */
.connected {
    flex-direction: row;
    justify-content: center;
    gap: 12px;
    width: fit-content;
    margin: 0 auto;
    padding: 6px 6px 6px 20px;
    background: #f7f3ee;
    border-radius: 30px;
}
</style>
