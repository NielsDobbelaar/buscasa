<template>
  <section class="woningzoeker">
    <Header />

    Woningzoeker applied filters {{ appliedFilters }}

    <button @click="setDisplayType()">lijst/map switcher</button>
    <br />
    <HouseMap v-if="canShowHouses" :data="houses" />
    <ListView v-if="canShowListView" :data="houses" />

    <button @click="setFilterOverlay(true)">Hier komt de filterknop</button>
    <button @click="setCompareOverlay(true)">Hier komt de compare knop</button>

    <router-link to="/woningzoeker/vergelijk">Vergelijken</router-link>

    <FilterOverlay
      :isFilterOverlayOpen="isFilterOverlayOpen"
      @closeFilterOverlay="setFilterOverlay(false)"
    />

    <CompareOverlay
      :isCompareOverlayOpen="isCompareOverlayOpen"
      @closeCompareOverlay="setCompareOverlay(false)"
    />

    <button @click="setFilterOverlay(true)">Hier komt de filterknop</button>
  </section>
</template>

<script setup>
import Header from '@/components/Header.vue'
import HouseMap from '@/components/HouseMap.vue'
import ListView from '@/components/ListView.vue'
import FilterOverlay from '@/components/FilterOverlay.vue'
import { ref, computed } from 'vue'
import CompareOverlay from '@/components/CompareOverlay.vue'
import { useHousesStore } from '@/stores/houses'
import { useGeneralStore } from '@/stores/general'

const generalStore = useGeneralStore()

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

// map / lijstweergave switch
// 0 is map - 1 is lijstweergave
const currentView = ref(0)

const setDisplayType = () => {
  if (currentView.value === 0) {
    currentView.value = 1
    return
  }
  currentView.value = 0
}

const houses = housesStore.getHouses

const canShowHouses = computed(() => {
  return houses && currentView.value === 0
})

const canShowListView = computed(() => {
  return houses && currentView.value === 1
})

const appliedFilters = computed(() => {
  return generalStore.getAppliedFilters
})
</script>

<style scoped>
.woningzoeker {
  position: relative;
}
</style>
