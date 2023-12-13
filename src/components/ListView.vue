<template>
  <article>
    <section className="lijstweergave_section">
      <ListViewCard v-for="item in houseTypes" :item="item" :key="item" />
    </section>
  </article>
</template>

<script setup>
import { useGeneralStore } from '@/stores/general'
import ListViewCard from './base/ListViewCard.vue'

const generalStore = useGeneralStore()

const houseTypes = generalStore.getHouseTypes
</script>

<style>
article {
  width: 100vw;
  margin: 0 auto;
}

.lijstweergave_section {
  width: 100%;
}
</style>
