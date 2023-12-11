<template>
  <dialog :open="props.isFilterOverlayOpen" class="filterOverlay__wrapper">
    <!-- Heading -->
    <section class="FiltersHeader">
      <h1 class="FiltersHeader_heading">Filters dialog</h1>

      <section class="FiltersHeader_buttonsSection">
        <button class="FiltersHeader_buttonsSection_button" @click="initializeFilterObject()">
          Reset filters
        </button>
        <button class="FiltersHeader_buttonsSection_button_icon" @click="closeOverlay()">
          &#10005;
        </button>
      </section>
    </section>

    <!-- Filters -->
    <section v-for="(filter, i) in filterConfig" :key="filter.slug">
      <p class="filterHeading">
        {{ filter.label }}
      </p>

      <!-- ----- Filter opties per type ---- -->

      <!-- Checkbox type -->
      <section class="filterValues" v-if="filter.type.type === 'checkbox'">
        <section class="filterValue" v-for="value in filter.values" :key="value">
          <input
            class="invisibleInput"
            type="checkbox"
            v-model="appliedFilters[i][filter.slug]"
            :id="value"
            :name="filter.slug"
            :value="value"
          />
          <label class="radioCheckboxLabel" :for="value">{{ value }}</label>
        </section>
      </section>

      <!-- Range type -->
      <section class="filterValues" v-if="filter.type.type === 'range'">
        <!-- TODO: Misschien package voor gebruiken voor fancy slider met min en max? -->
        <section>
          <input
            v-model="appliedFilters[i][filter.slug]"
            type="range"
            :id="filter.slug"
            :name="filter.slug"
            :min="filter.values.min"
            :max="filter.values.max"
            :step="filter.values.stepSize"
          />
        </section>
      </section>

      <!-- Radio type -->
      <section class="filterValues" v-if="filter.type.type === 'radio'">
        <section class="filterValue" v-for="value in filter.values" :key="value">
          <input
            class="invisibleInput"
            v-model="appliedFilters[i][filter.slug]"
            type="radio"
            :id="value"
            :name="filter.slug"
            :value="value"
          />
          <label class="radioCheckboxLabel" :for="value">{{ value }}</label>
        </section>
      </section>

      <!-- Status type-->
      <section class="filterValues" v-if="filter.type.type === 'status'">
        <section class="filterValue" v-for="value in Object.keys(filter.values)" :key="value">
          <input
            class="invisibleInput"
            v-model="appliedFilters[i][filter.slug]"
            type="checkbox"
            :id="value"
            :name="value"
            :value="value"
          />
          <label class="radioCheckboxLabel" :for="value">{{ value }}</label>
        </section>
      </section>
    </section>

    <!-- TODO: defaults -->
  </dialog>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue'
import { useGeneralStore } from '@/stores/general'
const generalStore = useGeneralStore()

const props = defineProps(['isFilterOverlayOpen'])
const emit = defineEmits(['closeFilterOverlay'])
const filterConfig = generalStore.getFilters

// Filter event
let appliedFilters = ref([])

watch(
  appliedFilters,
  () => {
    generalStore.setAppliedFilters(appliedFilters.value)
  },
  { deep: true }
)

// Overlay
const closeOverlay = () => {
  // emit
  emit('closeFilterOverlay')
}

// To be able to bind the elements inputs to the filter object
const initializeFilterObject = () => {
  appliedFilters.value = []

  for (let i = 0; i < filterConfig.length; i++) {
    const filter = filterConfig[i]

    const multiple = ['checkbox', 'status']
    const single = ['radio', 'range']

    if (multiple.includes(filter.type.type)) {
      appliedFilters.value.push({
        [filter.slug]: []
      })
    } else if (single.includes(filter.type.type)) {
      appliedFilters.value.push({
        [filter.slug]: null
      })
    }
  }
}

initializeFilterObject()
</script>

<style scoped>
.filterOverlay__wrapper {
  padding: 1rem;
  background-color: var(--clr-white);
  color: var(--clr-primary);
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 2;
  overflow-y: auto;
  overflow-x: hidden;
}

.filterValues {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.invisibleInput {
  display: none;
}

.radioCheckboxLabel {
  display: flex;
  color: #283040;
  align-items: center;
  background: white;
  border: 2px solid #283040;
  text-align: center;
  border-radius: 0.2rem;
  padding: 0.2rem 0.5rem;
  font-size: 100%;
}

input[type='radio']:checked + .radioCheckboxLabel {
  background: #283040;
  color: white;
}

input[type='checkbox']:checked + .radioCheckboxLabel {
  background: #283040;
  color: white;
}
.filterHeading {
  font-weight: 500;
  font-size: 20px;
  margin-top: 1rem;
}

.FiltersHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.FiltersHeader_heading {
  font-weight: 700;
  font-size: 25px;
  margin-top: 1rem;
  margin: 0;
}

.FiltersHeader_buttonsSection {
  display: flex;
  width: 50%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.FiltersHeader_buttonsSection_button {
  height: 2rem;
  padding: 0.25rem;
  background: var(--clr-primary);
  color: var(--clr-white);
  border: none;
  border-radius: 0.5rem;
  font-size: 15px;
}

.FiltersHeader_buttonsSection_button_icon {
  height: 3rem;
  aspect-ratio: 1/1;
  background: var(--clr-primary);
  color: var(--clr-white);
  border: none;
  border-radius: 0.5rem;
  font-size: 25px;
}
</style>
