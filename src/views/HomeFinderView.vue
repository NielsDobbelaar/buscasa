<template>
  <Header />
  <section class="woningzoeker">
    <HouseMap @closeMapView="setDisplayType()" v-if="canShowHouses" :data="houses" />
    <ListView v-if="canShowListView" @showMapView="setDisplayType()" :data="houses" />

    <FilterOverlay
      :isFilterOverlayOpen="isFilterOverlayOpen"
      @closeFilterOverlay="setFilterOverlay(false)"
    />

    <CompareOverlay
      :isCompareOverlayOpen="isCompareOverlayOpen"
      @closeCompareOverlay="setCompareOverlay(false)"
    />

    <transition name="from-bottom" mode="both">
      <SingleHouseOverlay v-if="isSingleHouseOverlayOpen" />
    </transition>
  </section>
  <Footer
    @openVergelijkingsTool="setCompareOverlay(true)"
    @openFilterTool="setFilterOverlay(true)"
    @lijstMapSwitch="setDisplayType()"
    :isMapOpen="canShowHouses"
  />
</template>

<script setup>
import Header from '@/components/Header.vue'
import HouseMap from '@/components/HouseMap.vue'
import ListView from '@/components/ListView.vue'
import FilterOverlay from '@/components/FilterOverlay.vue'
import { ref, computed } from 'vue'
import CompareOverlay from '@/components/CompareOverlay.vue'
import { useHousesStore } from '@/stores/houses'

import SingleHouseOverlay from '@/components/SingleHouseOverlay.vue'
import { useGeneralStore } from '@/stores/general'
import Footer from '@/components/Footer.vue'

const generalStore = useGeneralStore()

// Store
const housesStore = useHousesStore()

// Filters
const isFilterOverlayOpen = ref(false)
const isCompareOverlayOpen = ref(false)

const isSingleHouseOverlayOpen = computed(() => {
  return generalStore.getIsSingleHouseOverlayOpen
})

const setFilterOverlay = (value) => {
  isFilterOverlayOpen.value = value
}
const setCompareOverlay = (value) => {
  isCompareOverlayOpen.value = value
}

// map / lijstweergave switch
// 0 is map - 1 is lijstweergave
const currentView = ref(1)

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
</script>

<style scoped>
.from-bottom-enter-active {
  transition: all 0.3s ease-in-out;
}

.from-bottom-enter-from {
  transform: translateY(100%);
}

.from-bottom-enter-to {
  transform: translateY(0);
}

.from-bottom-leave-from {
  transform: translateY(0);
}

.from-bottom-leave-to {
  transform: translateY(100%);
}

.from-bottom-leave-active {
  transition: all 0.3s ease-in-out;
}

.woningzoeker {
  position: relative;
  height: 82vh;
  overflow: scroll;
}
</style>
