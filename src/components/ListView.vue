<template>
  <article>
    <section class="titleSection">
      <h1 class="listView_title">Woningtypes</h1>
    </section>
    <section className="listview_section">
      <ListViewCard
        @openMap="emit('openMap')"
        @openHouseType="emit('openHouseType')"
        v-for="item in houseTypes"
        :item="item"
        :key="item"
      />
    </section>
  </article>
</template>

<script setup>
import { useGeneralStore } from '@/stores/general'
import ListViewCard from './base/ListViewCard.vue'

const emit = defineEmits(['openMap', 'openHouseType'])

const generalStore = useGeneralStore()

const houseTypes = generalStore.getHouseTypes
</script>

<style>
article {
  width: 80vw;
  margin: 0 auto;
}

.titleSection {
  margin-top: 0.5rem;
}

.listView_title {
  font-size: 28px;
  font-family: 'DM Sans', sans-serif;
  font-weight: bold;
  color: var(--clr-primary);
}

.listview_section {
  width: 100%;
}
</style>
