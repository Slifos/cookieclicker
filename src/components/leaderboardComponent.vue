<template>
<table>
    <tr>
        <th>Id</th><th>Score</th>
        <th v-if="isAdmin" colspan="2">Actions</th>
    </tr>
    <tr v-for="user in sortedUsers" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.score }}</td>
        <td v-if="isAdmin"><button @click="resetScore(user.id)">Reset Score</button></td>
        <td v-if="isAdmin"><button @click="deleteUser(user.id)">Supprimer</button></td>
    </tr>
</table>
</template>

<script>
import { computed } from 'vue'
import { useUsers } from '../composables/Users.js'

export default {
    name: 'LeaderboardComponent',
    setup() {
        const { users, isAdmin, resetScore, deleteUser } = useUsers()
        // Seulement les membres, triés par score décroissant
        const sortedUsers = computed(() => users.value
            .filter(u => u.type === 'membre')
            .sort((a, b) => b.score - a.score))
        return { sortedUsers, isAdmin, resetScore, deleteUser }
    }
}
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 6px;
    border-bottom: 1px solid #ddd;
}
</style>
