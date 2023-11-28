<template>
    <section class="houseMap__wrapper">
        Kaart component
        {{ appliedFilters }}
    </section>
</template>

<script setup>
import { computed} from 'vue'
import { useGeneralStore } from '@/stores/general'
const generalStore = useGeneralStore()

const appliedFilters = computed(() => {
    return generalStore.getAppliedFilters
})
</script>

<style scoped>
.houseMap__wrapper {
    border: 1px solid red;
    padding: 1rem;
    margin: 1rem;
}
</style>