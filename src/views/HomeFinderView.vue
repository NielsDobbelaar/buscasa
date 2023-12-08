<template>
  <section class="woningzoeker">
    <Header />

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

    <!-- Overlays -->
    <FilterOverlay :isFilterOverlayOpen="isFilterOverlayOpen" @closeFilterOverlay="setFilterOverlay(false)" />

    <CompareOverlay :isCompareOverlayOpen="isCompareOverlayOpen" @closeCompareOverlay="setCompareOverlay(false)" />

    <transition name="from-bottom" mode="both">
      <SingleHouseOverlay v-if="isSingleHouseOverlayOpen" :isSingleHouseOverlayOpen="isSingleHouseOverlayOpen"
        @closeSingleHouseOverlay="setSingleHouseOverlay(false)" :houseId="3977" />
    </transition>
  </section>
</template>

<script setup>
import Header from '@/components/Header.vue'
import HouseMap from '@/components/HouseMap.vue'
import FilterOverlay from '@/components/FilterOverlay.vue'
import CompareOverlay from '@/components/CompareOverlay.vue'
import { ref } from 'vue'
import { useHousesStore } from '@/stores/houses'
import SingleHouseOverlay from '@/components/SingleHouseOverlay.vue'

// Store
const housesStore = useHousesStore()

// Filters
const isFilterOverlayOpen = ref(false)
const isCompareOverlayOpen = ref(false)
const isSingleHouseOverlayOpen = ref(false)

setTimeout(() => {
  isSingleHouseOverlayOpen.value = true
}, 1000)

const setFilterOverlay = (value) => {
  isFilterOverlayOpen.value = value
}
const setCompareOverlay = (value) => {
  isCompareOverlayOpen.value = value
}
const setSingleHouseOverlay = (value) => {
  isSingleHouseOverlayOpen.value = value
}

const houses = housesStore.getHouses

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
}
</style>
