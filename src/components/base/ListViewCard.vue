<template>
  <article className="cardWrapper">
    <section className="cardSection">
      <h2>{{ item.number }}:</h2>
      <p>{{ item.type }}</p>
    </section>
    <section className="cardSection">
      <button @click="navigateToPlot(item.id)">detail pagina</button>
    </section>
  </article>
</template>

<script setup>
import router from '@/router/index'
const { item } = defineProps(['item'])

const navigateToPlot = (plotID) => {
  router.push('/woningzoeker/' + plotID)
}
</script>

<style>
.cardWrapper {
  width: 80%;
  height: auto;
  margin: 0 auto;
  border: 1px solid black;
  padding-bottom: 5px;
  display: flex;
  flex-direction: row;
}

.cardSection {
  width: 50%;
  height: auto;
}
</style>
