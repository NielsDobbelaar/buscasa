<template>
  <section>
    Woningzoeker
    <br>
    <HouseMap v-if="houses" :data="houses" />
    
    <button @click="setFilterOverlay(true)">
      Hier komt de filterknop
    </button>
    
    <router-link to="/woningzoeker/vergelijk">Vergelijken</router-link>
    
    <FilterOverlay :isFilterOverlayOpen="isFilterOverlayOpen"
    @closeFilterOverlay="setFilterOverlay(false)" />
    

  </section>
</template>

<script setup>
import HouseMap from '@/components/HouseMap.vue'
import FilterOverlay from '@/components/FilterOverlay.vue'
import { ref } from 'vue'
import { useHousesStore } from '@/stores/houses'

// Store
const housesStore = useHousesStore ()

// Filters
const isFilterOverlayOpen = ref(false)

const setFilterOverlay = (value) => {
  isFilterOverlayOpen.value = value
}

const houses = housesStore.getHouses

</script>

<style scoped>

</style>
