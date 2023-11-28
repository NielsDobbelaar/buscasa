<template>
  <section>
    Woningzoeker FILTERS DATA: {{ appliedFilters }}
    <br />
    <HouseMap v-if="houses" :data="houses" />

    <button @click="setFilterOverlay(true)">Hier komt de filterknop</button>

    <router-link to="/woningzoeker/vergelijk">Vergelijken</router-link>

    <FilterOverlay
      :isFilterOverlayOpen="isFilterOverlayOpen"
      @closeFilterOverlay="setFilterOverlay(false)"
    />
  </section>
</template>

<script setup>
import HouseMap from '@/components/HouseMap.vue'
import FilterOverlay from '@/components/FilterOverlay.vue'
import { ref, computed } from 'vue'
import { useHousesStore } from '@/stores/houses'
import { useGeneralStore } from '@/stores/general'

const generalStore = useGeneralStore()

// Store
const housesStore = useHousesStore()

// Filters
const isFilterOverlayOpen = ref(false)

const setFilterOverlay = (value) => {
  isFilterOverlayOpen.value = value
}

const houses = housesStore.getHouses

const appliedFilters = computed(() => {
  return generalStore.getAppliedFilters
})
</script>

<style scoped></style>
