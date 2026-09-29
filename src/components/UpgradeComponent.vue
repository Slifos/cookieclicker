<template>
  <button class="upgrade">
    <img class="upgrade-image" :src="imageSrc" :alt="upgradeName" />
    <h2 class="upgrade-name">{{ upgradeName }} (Niv. {{ level }})</h2>
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
    level: {
      type: Number,
      default: 0
    },

  }


}
</script>

<style scoped>
.upgrade {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
}

.upgrade:hover {
  background: #fff8e7;
}

.upgrade-image {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.upgrade-name {
  flex: 1;
  font-size: 1em;
  text-align: left;
}

.upgrade-cost {
  font-size: 1em;
  text-align: right;
}
</style>
