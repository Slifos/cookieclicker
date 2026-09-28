<template>
  <button class="upgrade">
    <img class="upgrade-image" :src="imageSrc" :alt="upgradeName" />
    <h2 class="upgrade-name">{{ upgradeName }}</h2>
    <h2 class="upgrade-cost">{{ upgradeCost }}</h2>
  </button>
</template>

<script>
export default {
  name: 'UpgradeComponent',
  props: {
    imageSrc: {
      type: String,
      required:true
    },
    upgradeName: {
      type: String,
      required:true
    },
    upgradeCost: {
      type: Number,
      required:true
    },
    

  }


}
</script>

<style scoped>
.upgrade {
  display: flex;
  align-items: center;
  gap: 16px;
}

.upgrade-image {
  width: 64px;
  height: 64px;
  object-fit: contain;
}

.upgrade-name {
  flex: 1;
  text-align: center;
}

.upgrade-cost {
  text-align: right;
}
</style>
