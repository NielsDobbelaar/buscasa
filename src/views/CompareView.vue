<template>
    <section>

        <section class="comparison">
            <h1>Compare tool ({{ comparingNumbers.length }})</h1>
            <!-- Table -->
            <table v-if="comparingNumbers.length > 0">
                <!-- Head -->
                <thead>
                    <tr>
                        <th>Apprt. Number</th>
                        <th v-for="nr in comparingNumbers" :key="nr">
                            {{ nr }} <p @click="removeFromComparison(nr)" class="removeFromComparison">remove</p>
                        </th>
                    </tr>
                </thead>
                <!-- Body -->
                <tbody>
                    <!-- For each key in data show all values -->
                    <tr v-for="(label, key) in Object.keys(housesToShow[0])" :key="key">
                        <td>{{ label }}</td>
                        <td v-for="house in housesToShow" :key="house.number">
                            {{ house[label] }}
                        </td>

                    </tr>
                </tbody>
            </table>
            <section class="error-msg" v-else>
                Select houses to compare for them to show up here.
            </section>
        </section>

    </section>
</template>

<script setup>

// Imports
import { ref, computed } from 'vue'
import { useHousesStore } from '@/stores/houses'

// Store
const housesStore = useHousesStore()
const houses = housesStore.getHouses
console.log('houses', houses);
// Show houses in store
const housesToShow = ref([])

// a computed ref
const comparingNumbers = computed(() => {
  return housesStore.getCompareNumbers
})

// housesToShow.value = houses.filter(house => comparingNumbers.includes(house.number))

// Gets the house data by id of the selected houses to compare
const getComparisonHouseData = () => {
    housesToShow.value = []

    for (let i = 0; i < houses.length; i++) {
        const houseInStore = houses[i];
        if (comparingNumbers.value.includes(houseInStore.number)) {
            housesToShow.value.push(houseInStore)
        }
    }
}

// Remove house from comparison
const removeFromComparison = (nr) => {
    housesStore.removeCompareNumber(nr)
    getComparisonHouseData()
}

getComparisonHouseData()

</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    margin-top: 1rem;
}

.removeFromComparison {
    color: red;
    font-size: 0.8rem;
    cursor: pointer;
    font-weight: lighter;
    text-decoration: underline;
}

.error-msg {
    text-align: center;
    margin-top: 4rem;
    font-size: 1rem;
}

.comparison {
    padding: 2rem;
    overflow-x: auto;
    max-width: 100vw;
    margin-bottom: 6rem;
    /* Add horizontal scroll for small screens */
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: grey;
}

/* Highlighting logic */
.highlight {
    font-weight: bold;
    color: #007bff;
    /* Highlight color */
}
</style>