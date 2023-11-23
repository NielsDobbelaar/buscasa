<template>
    <section>
        
        <section>
            <h1>Compare view</h1>
            <section v-for="(house, i) in housesToShow" :key="i">
                {{ house.name }}
            </section>
        </section>

    </section>
</template>

<script setup>

// Imports
import { ref } from 'vue'
import { useHousesStore } from '@/stores/houses'

// Store
const housesStore = useHousesStore()
const houses = housesStore.getHouses
const comparingIds = housesStore.getComparingIds

// Show houses in store
const housesToShow = ref([])
housesToShow.value = houses.filter(house => comparingIds.includes(house.id))

</script>

<style scoped>



</style>