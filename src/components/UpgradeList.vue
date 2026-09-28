<template>
<div>
    <UpgradeComponent imageSrc='/cursor.png' upgradeName="Click Booster" :upgradeCost="10" @click="upgradeFactory(10)" />
    <UpgradeComponent imageSrc='/productive.png' upgradeName="Autoclicker" :upgradeCost="20" @click="upgradeAutoClick(20)" />
</div>

</template>

<script>
import UpgradeComponent from './UpgradeComponent.vue'
import {useCookies} from '../composables/PlayerScore.js'
export default {
  name: 'UpgradeList',
  components: { UpgradeComponent },
  setup() {
    const { upgradeFactory,upgradeAutoClick } = useCookies()
    return { upgradeFactory, upgradeAutoClick }
  },
  data() {
    return { upgrades: [
    { id: 1, imageSrc: '/cursor.png', upgradeName: 'Click Booster', upgradeCost: 10 , upgradeFunction: this.upgradeFactory },
    { id: 2, imageSrc: '/productive.png', upgradeName: 'Autoclicker', upgradeCost: 20 , upgradeFunction: this.upgradeAutoClick }
    
]} 
  }
}




</script>