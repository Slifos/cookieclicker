<template>
  <header>
    <h1>Cookie Clicker</h1>
    <LoginComponent />
  </header>

  <main v-if="isConnected" class="game">
    <section class="panel">
      <h2>Classement</h2>
      <LeaderboardComponent />
    </section>

    <section class="center">
      <h2 class="score">{{ cookieCount }} cookies</h2>
      <CookieButton class="cookie" @click="cookieClick" />
    </section>

    <section class="panel">
      <h2>Upgrades</h2>
      <UpgradeList />
    </section>
  </main>
</template>

<script>

import CookieButton from './components/CookieButton.vue'
import {useCookies} from './composables/PlayerScore.js'
import {useUsers} from './composables/Users.js'
import UpgradeList from './components/UpgradeList.vue'
import LoginComponent from './components/loginComponent.vue'
import LeaderboardComponent from './components/leaderboardComponent.vue'

export default {
  name: 'App',
  components: {

    CookieButton,
    UpgradeList,
    LoginComponent,
    LeaderboardComponent

  },
   setup() {
    const { cookieCount, cookieClick } = useCookies()
    const { isConnected } = useUsers()
    return { cookieCount, cookieClick, isConnected }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

header {
  margin-bottom: 30px;
}

/* 3 colonnes : classement | cookie | upgrades */
.game {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  align-items: start;
}

.panel {
  background: #f7f3ee;
  border-radius: 12px;
  padding: 16px;
}

.panel h2 {
  margin-top: 0;
}

.score {
  font-size: 2em;
}

.cookie {
  width: 100%;
  max-width: 320px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.1s;
}

.cookie:hover {
  transform: scale(1.05);
}

.cookie:active {
  transform: scale(0.95);
}

/* Sur petit écran, les colonnes s'empilent */
@media (max-width: 900px) {
  .game {
    grid-template-columns: 1fr;
  }
}
</style>
