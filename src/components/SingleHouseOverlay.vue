<template>
    <dialog :open="props.isSingleHouseOverlayOpen" class="singleHouseWrapper">
        <section class="singleHouse__closeWrapper">
            <button class="comparison__closeButton" @click="closeOverlay()">
                <Icon icon="mingcute:close-line" height="30" />
            </button>
        </section>
        <section class="singleHouse__container">
            <section class="singleHouse__imgContainer">
                <img src="https://x.static.nbo.nl/media/ab/ab8fc32b4e93d6a09d588498f298db23/1024/foto.jpg" alt="house"
                    class="singleHouse__img">
                <section class="singleHouse__status">
                    <span class="comparison__housePropertyStatus red" v-if="house.status === 'verkocht'">
                    </span>
                    <span class="comparison__housePropertyStatus green" v-if="house.status === 'te-koop'">
                    </span>
                    <span class="comparison__housePropertyStatus orange" v-if="house.status === 'in-optie'">
                    </span>

                    {{ formatValue(house.status) }}
                </section>
                <section class="singleHouse__imgText">
                    <section class="singleHouse__imgMainInfo">
                        {{ house.number }}
                        -
                        <section class="singleHouse__imgTextTypePill">
                            {{ formatValue(house.type) }}
                        </section>
                    </section>
                    <section class="singleHouse__imgTextPrice">
                        {{ formatValue(house.price) }}
                    </section>
                </section>
                <section class="singleHouse__houseData">
                    <table>
                        <tr>
                            <td>Woonoppervlakte</td>
                            <td>{{ formatValue(house.price) }}</td>
                        </tr>
                      
                    </table>
                </section>
                <section class="singleHouse__actions">

                </section>
            </section>
        </section>
    </dialog>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { defineProps } from 'vue'
import { computed } from 'vue'
import { useHousesStore } from '@/stores/houses'

const housesStore = useHousesStore()
const emit = defineEmits(['closeSingleHouseOverlay'])

const formatValue = val => {
    // replace - with space, capitalize first letter
    if (typeof val === 'number') return val.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });

    if (typeof val === 'string') return val.replace(/-/g, ' ').replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

const props = defineProps({
    isSingleHouseOverlayOpen: Boolean,
    houseId: Number
})

const house = computed(() => {
    return housesStore.getHouseById(props.houseId)
})

const closeOverlay = () => {
    // emit
    emit('closeSingleHouseOverlay')
}

</script>

<style scoped>
.singleHouse__closeWrapper {
  /* center in screen */
  position: absolute;
    top: 8%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 5vh;

    width: 85vw;
    border-radius: 8px;

}
.comparison__closeButton {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--clr-primary);
    color: var(--clr-white);
    border: none;
    border-radius: 8px;
    padding: 0.3rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

}
.singleHouse__imgTextPrice {
    font-size: 1.1rem;
    font-weight: 500;
}

.singleHouse__imgTextTypePill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--clr-grey-dark);
    color: var(--clr-white);
    padding: 0.1rem 0.7rem;
    border-radius: 1000px;
    font-size: 0.95rem;
    font-weight: bold;
}

.singleHouse__status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    position: absolute;
    top: 15px;
    left: 15px;
    background-color: var(--clr-primary);
    color: var(--clr-white);
    padding: 0.3rem 0.7rem;
    border-radius: 8px;
    margin: 0;

}

.singleHouse__imgMainInfo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1.4rem;
    font-weight: 600;
}

.singleHouse__imgText {
    position: absolute;
    bottom: 31px;
    left: 0px;
    background-color: var(--clr-white);
    color: var(--clr-primary);
    padding: 0.7rem 1rem;
    border-radius: 0 8px 0 0;
    margin: 0;
    border: 1px solid var(--clr-white);


}

.singleHouse__img {
    width: 100%;
    object-fit: cover;
    border-radius: 8px 8px 0 0;

}

.singleHouse__imgContainer {
    position: relative;
}

.singleHouse__container {
    /* center in screen */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    height: 75vh;
    width: 85vw;
    background-color: var(--clr-white);
    border-radius: 8px;
}

.singleHouseWrapper {
    color: var(--clr-white);
    background-color: rgba(0, 0, 0, 0.301);
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 2;
    overflow-y: auto;
    overflow-x: hidden;
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
</style>