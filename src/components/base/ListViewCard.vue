<template>
  <article className="cardWrapper">
    <section className="cardSection">
      <h2>{{ item }}:</h2>
    </section>
    <section className="cardSection">
      <button>detail pagina</button>
    </section>
  </article>
</template>

<script setup>
import { useGeneralStore } from '@/stores/general'
const { item } = defineProps(['item'])

const generalStore = useGeneralStore()
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
