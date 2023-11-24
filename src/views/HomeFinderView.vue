<template>
  <section>
    <HouseMap v-if="houses" :data="houses" />
  </section>
</template>

<script setup>
import { useHousesStore } from '@/stores/houses'
import HouseMap from '../components/HouseMap.vue'

const housesStore = useHousesStore()
const houses = housesStore.getHouses
</script>

<style scoped></style>
