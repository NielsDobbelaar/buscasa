<template>
  <section>
    <!-- Icon voorbeeldje -->
    <Icon icon="mdi-light:home" height="40"/>

    <h1>
      specifieke woning met id: {{ id }}
    </h1>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { Icon } from '@iconify/vue';

const route = useRoute()

const id = ref(route.params.woningId)
</script>


<style scoped>

</style>
