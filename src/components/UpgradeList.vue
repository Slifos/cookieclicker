<template>
<div>
    <UpgradeComponent v-for="upgrade in upgrades" :key="upgrade.name"
        :imageSrc="upgrade.imageSrc"
        :upgradeName="upgrade.upgradeName"
        :upgradeCost="upgradeCost(upgrade.name)"
        :level="getLevel(upgrade.name)"
        @click="buyUpgrade(upgrade.name)" />
</div>

</template>

<script>
import UpgradeComponent from './UpgradeComponent.vue'
import {useCookies} from '../composables/PlayerScore.js'
export default {
  name: 'UpgradeList',
  components: { UpgradeComponent },
  setup() {
    const { getLevel, upgradeCost, buyUpgrade } = useCookies()
    const upgrades = [
      { name: 'clickBooster', imageSrc: '/cursor.png', upgradeName: 'Click Booster' },
      { name: 'autoClicker', imageSrc: '/productive.png', upgradeName: 'Autoclicker' },
    ]
    return { upgrades, getLevel, upgradeCost, buyUpgrade }
  }
}
</script>
