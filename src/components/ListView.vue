<template>
  <article>
    <section className="lijstweergave_section">
      <h2>Lijstweergave:</h2>
      <ListViewCard v-for="item in filteredData" :item="item" :key="item.id" />
      <section v-if="filteredData.length === 0">
        <h4>Geen woningen gevonden die voldoen aan de filters</h4>
      </section>
    </section>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useGeneralStore } from '@/stores/general'
import checkFilter from '@/utils/checkFilter'
import ListViewCard from './base/ListViewCard.vue'

const generalStore = useGeneralStore()

const { data } = defineProps(['data'])

const appliedFilters = computed(() => {
  return generalStore.getAppliedFilters
})

const filters = generalStore.getFilters

const filteredData = computed(() => {
  const filteredPlots = data.plots.filter((plot) => {
    return checkFilter(data, appliedFilters, filters, plot.id)
  })
  return filteredPlots
})
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
