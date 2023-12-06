<template>
    <dialog :open="props.isCompareOverlayOpen" class="compareWrapper">
        <section class="comparison__container">
            <!-- Heading -->
            <section class="comparison__header">
                <h1 class="comparison__headerTitle">Vergelijk - {{ housesToShow.length }}</h1>
                <button class="comparison__closeButton" @click="closeOverlay()">
                    <Icon icon="mingcute:close-line" height="30" @click="toggleNav()" />
                </button>
            </section>

            <section class="comparison">
                <section class="comparison__house" v-for="house in housesToShow" :key="house.number">
                    <section class="comparison__houseCard">
                        <section class="comparison__houseCardImgWrapper">
                            <img class="comparison__houseCardImg"
                                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="house image" />
                            <p class="comparison__houseCardNumber">
                                {{ house.number }}
                            </p>
                        </section>
                        <section class="comparison__houseCardActions">
                            <button class="comparison__houseCardMoreInfo">
                                Meer info
                            </button>
                            <button class="comparison__houseCardRemoveHouse">
                                <Icon icon="mingcute:close-line" height="30" @click="removeFromComparison(house.id)" />
                            </button>
                        </section>
                    </section>
                    <section class="comparison__houseProperty" v-for="(key, index) in Object.keys(house)" :key="index">
                        <section v-if="allowedProperties.includes(key)">
                            <p class="comparison__housePropertyKey">
                                <!-- replace _ with space and every word to capital -->
                                {{ propertyKey(key) }}
                            </p>
                            <p class="comparison__housePropertyValue">
                                <span v-if="key === 'status'">
                                    <span class="comparison__housePropertyStatus red" v-if="house[key] === 'verkocht'">
                                    </span>
                                    <span class="comparison__housePropertyStatus green" v-if="house[key] === 'te-koop'">
                                    </span>
                                    <span class="comparison__housePropertyStatus orange" v-if="house[key] === 'in-optie'">
                                    </span>
                                </span>
                                {{ formatValue(house[key] || '-', key) }}
                            </p>
                        </section>
                    </section>
                   
                </section>
                <section >
                        <p class="comparison__noHouses" v-if="housesToShow.length === 0">
                            Select houses to compare for them to show up here.
                        </p>
                    </section>
            </section>
        </section>
    </dialog>
</template>

<script setup>

// Imports
import { Icon } from '@iconify/vue';
import { ref, computed, defineProps } from 'vue'
import { useHousesStore } from '@/stores/houses'

// Store
const housesStore = useHousesStore()
const houses = housesStore.getHouses

// Props & emits
const emit = defineEmits(['closeFilterOverlay'])
const props = defineProps(['isCompareOverlayOpen'])

// Show houses in store
const housesToShow = ref([])
const allowedProperties = ref(['bedrooms', 'description', 'from_price', 'to_price', 'status', 'energy_class', 'house_type', 'living_surface', 'parking_count', 'parking_description', 'parking_value', 'plot_surface', 'price', 'room_count', 'street', 'type', 'volume_unit', 'volume_external'])
const squaredMeterFormatting = ref(['living_surface', 'plot_surface']);
const currencyFormatting = ref(['price', 'from_price', 'to_price', 'parking_value']);

// key
const propertyKey = (key) => {
    // all _ to spaces and all words to first letter capitalized
    return key.replace(/_/g, ' ').replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

// value formatting per row
const formatValue = (value, key) => {

    if(currencyFormatting.value.includes(key) && typeof value === 'number') {
        return Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value)
    } else if(squaredMeterFormatting.value.includes(key)) {
        return value + ' m²'
    }

    if(typeof value === 'string') {

        // first letter of string to uppercase
        return value.charAt(0).toUpperCase() + value.slice(1);
    } else {
        return value
    }
}

// a computed ref
const comparingNumbers = computed(() => {
    return housesStore.getCompareNumbers
})

// Gets the house data by id of the selected houses to compare
const getComparisonHouseData = () => {
    housesToShow.value = []

    for (let i = 0; i < houses.plots.length; i++) {
        const houseInStore = houses.plots[i];
        if (comparingNumbers.value.includes(houseInStore.id)) {
            housesToShow.value.push(houseInStore)

            // set the status key to be the first in the object
            const status = houseInStore.status
            delete houseInStore.status

            housesToShow.value[housesToShow.value.length - 1] = {
                status: status,
                ...houseInStore
            }
        }
    }
}

// close
// Overlay
const closeOverlay = () => {
    // emit
    emit('closeCompareOverlay')
}

// Remove house from comparison
const removeFromComparison = (nr) => {
    housesStore.removeCompareNumber(nr)
    getComparisonHouseData()
}

getComparisonHouseData()

</script>

<style scoped>
.comparison__noHouses {
    text-align: center;
    font-size: 1rem;
    margin-top: 2rem;

}
.comparison__housePropertyStatus {
    height: 0.75rem;
  width: 0.75rem;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.25rem;
}
.red {
    background-color: red;
}
.green {
    background-color: green;
}
.orange {
    background-color: orange;
}

.comparison__houseCard {
    margin-bottom: 1.5rem;
}

.comparison__houseCardMoreInfo {
    background-color: var(--clr-white);
    color: var(--clr-primary);
    padding: 0.75rem;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    flex-grow: 1;
    font-weight: 600;
    font-family: "DM Sans", sans-serif;
    font-size: 1rem;
}

.comparison__houseCardRemoveHouse {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--clr-primary);
    color: var(--clr-white);
    padding: 0.25rem;
    border-radius: 0.25rem;
    display: flex;

    align-items: center;
    justify-content: center;
    border: 2px solid var(--clr-white);
    cursor: pointer;


}

.comparison__houseCardActions {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
}

.comparison__houseCardActions button {
    height: 2.75rem;
}

.comparison__houseCardImgWrapper {
    position: relative;
    width: 100%;
    height: 100%;

}

.comparison__houseCardNumber {
    position: absolute;
    bottom: 5px;
    left: -1px;
    background-color: var(--clr-primary);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: 0 0.5rem 0 0;
    margin: 0;
    border: 1px solid var(--clr-primary);
    font-size: 1.5rem;
    font-weight: 600;

}

.comparison__houseCardImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;

}

.comparison__housePropertyValue {
    margin-bottom: 0.3rem;
}

.comparison__house {
    overflow-wrap: break-word;
    min-width: 50vw;
}

.comparison__housePropertyKey {
    font-weight: bold;
    margin: 0;
    font-size: 0.8rem;
    color: var(--clr-grey);
}

.comparison__closeButton {
    background-color: var(--clr-white);
    color: var(--clr-primary);
    padding: 0.5rem;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
}


.comparison__headerTitle {
    font-size: 1.75rem;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
}

.comparison__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2rem 0rem 2rem;

}

.compareWrapper {
    color: var(--clr-white);
    background-color: var(--clr-primary);
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 2;
    overflow-y: auto;
    overflow-x: hidden;
}

h1 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    margin-top: 1rem;
}


.comparison {
    padding: 2rem;
    overflow-x: auto;
    max-width: 100vw;
    margin-bottom: 6rem;
    display: flex;
    gap: 1.25rem;
    /* Add horizontal scroll for small screens */
}
</style>