<template>
  <section>
    Woningzoeker
    <br>
    Store houses: {{ houses }}
  </section>

  <FilterOverlay />
</template>

<script setup>
import FilterOverlay from '@/components/FilterOverlay.vue'
import { useHousesStore } from '@/stores/houses'

const housesStore = useHousesStore()
const houses = housesStore.getHouses
</script>


<style scoped>

</style>
