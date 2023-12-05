<template>

  <section class="woningzoeker">
  <Header/>

    Woningzoeker
    <br>
    <HouseMap v-if="houses" :data="houses" />
    
    <button @click="setFilterOverlay(true)">
      Hier komt de filterknop
    </button>
    <button @click="setCompareOverlay(true)">
      Hier komt de compare knop
    </button>

    <router-link to="/woningzoeker/vergelijk">Vergelijken</router-link>
    
    <FilterOverlay :isFilterOverlayOpen="isFilterOverlayOpen"
    @closeFilterOverlay="setFilterOverlay(false)" />

    <CompareOverlay :isCompareOverlayOpen="isCompareOverlayOpen"
    @closeCompareOverlay="setCompareOverlay(false)" />
    

  </section>
</template>

<script setup>
import Header from '@/components/Header.vue'
import HouseMap from '@/components/HouseMap.vue'
import FilterOverlay from '@/components/FilterOverlay.vue'
import CompareOverlay from '@/components/CompareOverlay.vue'
import { ref } from 'vue'
import { useHousesStore } from '@/stores/houses'

// Store
const housesStore = useHousesStore()

// Filters
const isFilterOverlayOpen = ref(false)
const isCompareOverlayOpen = ref(false)

const setFilterOverlay = (value) => {
  isFilterOverlayOpen.value = value
}
const setCompareOverlay = (value) => {
  isCompareOverlayOpen.value = value
}

const houses = housesStore.getHouses

</script>

<style scoped>
.woningzoeker {
  position: relative;
}
</style>
