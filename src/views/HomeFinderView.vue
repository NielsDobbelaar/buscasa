<script setup>
</script>

<template>
  <section>
    Woningzoeker
    <br>
    Store houses: {{ houses }}
  </section>
</template>

<script setup>
import { useHousesStore } from '@/stores/houses'

const housesStore = useHousesStore()
const houses = housesStore.getHouses
</script>


<style scoped>

</style>
