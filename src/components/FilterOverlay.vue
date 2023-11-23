<template>
    <section>
        <h1>Filters</h1>
        <section v-for="filter in filters" :key="filter.slug">
            {{ filter.slug }}
            <section class="filterValues">

                <section class="filterValue" v-for="value in filter.values" :key="value">
                    {{ value }}
                </section>
            </section>
        </section>
    </section>
</template>

<script setup>

import { useGeneralStore } from '@/stores/general'
const generalStore= useGeneralStore()

const filters = generalStore.getFilters



</script>

<style scoped>
.filterValues {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    flex-wrap: wrap;
}

</style>