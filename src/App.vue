<template>
  <h1>Cookie Clicker</h1>
  <h2>Your Score: {{ cookieCount }}</h2>
  
  
  <CookieButton @click="cookieClick" />
  <UpgradeList />
</template>

<script>

import CookieButton from './components/CookieButton.vue'
import {useCookies} from './composables/PlayerScore.js'
import UpgradeList from './components/UpgradeList.vue'

export default {
  name: 'App',
  components: {
    
    CookieButton,
    UpgradeList
    
  },
   setup() {
    const { cookieCount, cookieClick, upgradeFactory } = useCookies()
    return { cookieCount, cookieClick, upgradeFactory }
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
  margin-top: 60px;
}
</style>
