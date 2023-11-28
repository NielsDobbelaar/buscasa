<template>
  <section>
    Woningzoeker
    <br>

    <button @click="setFilterOverlay(true)">
      Hier komt de filterknop
    </button>

    <HouseMap />

    <FilterOverlay :isFilterOverlayOpen="isFilterOverlayOpen"
      @closeFilterOverlay="setFilterOverlay(false)" />

  </section>
</template>

<script setup>
import HouseMap from '@/components/HouseMap.vue'
import FilterOverlay from '@/components/FilterOverlay.vue'
import { ref } from 'vue'

// Filters
const isFilterOverlayOpen = ref(false)

const setFilterOverlay = (value) => {
  isFilterOverlayOpen.value = value
}

</script>

<style scoped>

</style>
