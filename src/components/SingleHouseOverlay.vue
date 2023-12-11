<template>
  <dialog :open="true" v-if="isSingleHouseOverlayOpen" class="singleHouseWrapper">
    <section class="singleHouse__closeWrapper"></section>
    <section class="singleHouse__container">
      <section class="singleHouse__imgContainer">
        <img
          src="https://x.static.nbo.nl/media/ab/ab8fc32b4e93d6a09d588498f298db23/1024/foto.jpg"
          alt="house"
          class="singleHouse__img"
        />
        <button class="comparison__closeButton" @click="closeOverlay()">
          <Icon icon="mingcute:close-line" height="30" />
        </button>
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
            {{
              Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(house.price)
            }}
          </section>
        </section>
      </section>
      <section class="singleHouse__houseData">
        <section class="singleHouse__table" v-for="data in houseInfo" :key="data.property">
          <section class="singleHouse__tableRow">
            <section class="singleHouse__tableCell">
              {{ formatValue(data.property) }}
            </section>
            <section class="singleHouse__tableCell">
              {{ formatValue(data.value, data.property) }}
            </section>
          </section>
        </section>
      </section>
      <section class="singleHouse__actions">
        <section class="singleHouse__compareAction">
          <!-- toggle -->
          <label class="checkMarkContainer">
            Vergelijk
            <input type="checkbox" checked="checked" v-model="compareIsChecked" />
            <span class="checkmark"></span>
          </label>
        </section>
        <section class="singleHouse__houseActions">
          <button class="singleHouse__actionButton secondary">Info woningtype</button>
          <button class="singleHouse__actionButton primary">Inschrijven</button>
        </section>
      </section>
    </section>
  </dialog>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { watch, ref, computed } from 'vue'
import { useHousesStore } from '@/stores/houses'
import { useGeneralStore } from '@/stores/general'

const housesStore = useHousesStore()
const generalStore = useGeneralStore()

const houseId = computed(() => {
  return generalStore.getSingleHouseOverlayId
})

const isSingleHouseOverlayOpen = computed(() => {
  return generalStore.getIsSingleHouseOverlayOpen
})

// compare
const compareIsChecked = ref(false)
watch(
  () => compareIsChecked.value,
  (value) => {
    if (!houseId.value) return
    if (value === true) {
      housesStore.addCompareNumber(houseId.value)
    } else {
      housesStore.removeCompareNumber(houseId.value)
    }
  }
)

const squaredMeterFormatting = ref(['living_surface', 'plot_surface'])
const currencyFormatting = ref(['price', 'from_price', 'to_price', 'parking_value'])
// value formatting per row
const formatValue = (value, key) => {
  if (currencyFormatting.value.includes(key) && typeof value === 'number') {
    return Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value)
  } else if (squaredMeterFormatting.value.includes(key)) {
    return value + ' m²'
  }

  if (typeof value === 'string') {
    // first letter of string to uppercase remove _
    return value
      .replace(/_/g, ' ')
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
  } else {
    return value
  }
}

const house = computed(() => {
  if (!houseId.value) return null
  return housesStore.getHouseById(houseId.value)
})

const closeOverlay = () => {
  generalStore.setIsSingleHouseOverlayOpen(false)
}

// todo deze functie fixen -- op het moment sluit hij gelijk de dialog omdat je buiten de dialog moet clicken om de dialog te openen
// document.addEventListener('click', function (event) {
//   var isClickInside = document.querySelector('.singleHouse__container').contains(event.target)

//   if (!isClickInside) {
//       closeOverlay()
//   }
// })

setTimeout(() => {
  // set backdrop
  document.querySelector('.singleHouseWrapper').style.backgroundColor = 'rgba(0, 0, 0, 0.401)'
}, 250)

watch(
  () => isSingleHouseOverlayOpen,
  (value) => {
    if (value === false) {
      document.querySelector('.singleHouseWrapper').style.backgroundColor = 'transparent'
    }
  }
)

const houseInfo = computed(() => {
  if (!houseId.value) return
  let house = housesStore.getHouseById(houseId.value)

  let houseProperties = [
    'house_type',
    'living_surface',
    'bedrooms',
    'plot_surface',
    'room_count',
    'parking_count',
    'parking_value'
  ]

  let houseData = []

  houseProperties.forEach((property) => {
    let propertyData = {
      property: property,
      value: house[property]
    }

    houseData.push(propertyData)
  })

  return houseData
})
</script>

<style scoped>
.singleHouse__houseActions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}
.singleHouse__actionButton {
  flex-grow: 1;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 0.8rem 0.4rem;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
}
.secondary {
  background-color: var(--clr-white);
  color: var(--clr-primary);
  border: 2px solid var(--clr-primary);
}
.primary {
  background-color: var(--clr-primary);
  color: var(--clr-white);
}

.singleHouse__actions {
  padding: 1rem;
}
/* The checkMarkContainer */
.checkMarkContainer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkMarkContainer input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 2px;
  left: 0;
  height: 25px;
  border-radius: 6px;
  width: 25px;
  background-color: var(--clr-grey);
}

/* On mouse-over, add a grey background color */
.checkMarkContainer:hover input ~ .checkmark {
  background-color: var(--clr-grey);
}

/* When the checkbox is checked, add a blue background */
.checkMarkContainer input:checked ~ .checkmark {
  background-color: var(--clr-primary);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkMarkContainer input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkMarkContainer .checkmark:after {
  left: 10px;
  top: 7px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.singleHouse__compareAction {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.singleHouse__compareAction label {
  font-size: 1.1rem;
  font-weight: 500;
}

.singleHouse__actions {
  color: var(--clr-primary);
}

.singleHouse__tableRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 0.2rem;
}

.singleHouse__houseData {
  padding: 1rem;
  color: var(--clr-primary);
}

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
  position: absolute;
  top: 10px;
  right: 10px;

  border: none;
  background-color: var(--clr-primary);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 0.8rem 0.4rem;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: var(--clr-white);
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
  bottom: 0px;
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
  height: 200px;
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
  border: none;
  height: 65vh;
  min-height: 550px;
  width: 88vw;
  background-color: var(--clr-white);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.singleHouseWrapper {
  color: var(--clr-white);
  /* background-color: rgba(0, 0, 0, 0.301); */
  background-color: transparent;
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  transition: 0.2s all ease-in-out;
  left: 0;
  z-index: 2;
  overflow-y: auto;
  border: none;
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
