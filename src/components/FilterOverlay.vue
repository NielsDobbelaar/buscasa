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

    <span class="matchAmount" :class="{ errorMatches: filteredData.length === 0 }">
      <span>
        {{ filteredData.length }} matches
      </span>
      <Icon v-if="filteredData.length === 0" icon="ic:error-outline" height="20" />
    </span>

    <!-- Filters -->
    <section v-for="(filter, i) in filterConfig" :key="filter.slug">
      <p class="filterHeading">
        {{ filter.label }}
      </p>

      <!-- ----- Filter opties per type ---- -->

      <!-- Checkbox type -->
      <section class="filterValues" v-if="filter.type.type === 'checkbox'">
        <section class="filterValue" v-for="value in filter.values" :key="value">
          <input class="invisibleInput" type="checkbox" v-model="appliedFilters[i][filter.slug]" :id="value"
            :name="filter.slug" :value="value" />
          <label class="radioCheckboxLabel" :for="value">{{ value }}</label>
        </section>
      </section>

      <!-- Range type -->
      <section class="filterValues" v-if="filter.type.type === 'range'">
        <!-- TODO: Misschien package voor gebruiken voor fancy slider met min en max? -->
        <section class="dropdownGroup">
          <section class="dropdownGroupItem">

            <label :for="filter.slug + 'max'">Minimum</label>
            <select :name="filter.slug + 'min'" :id="filter.slug + 'min'" v-model="appliedFilters[i][filter.slug]['min']">
              <option v-for="(option, index) in dropdownRangeOptions(filter)" :value="option" :key="index">
                {{ option }}
              </option>
            </select>
          </section>
          <section class="dropdownGroupItem">
            <label :for="filter.slug + 'max'">Maximum</label>

            <select :name="filter.slug + 'max'" :id="filter.slug + 'max'" v-model="appliedFilters[i][filter.slug]['max']">
              <option v-for="(option, index) in dropdownRangeOptions(filter)" :value="option" :key="index">
                {{ option }}
              </option>
            </select>
          </section>
        </section>
      </section>

      <!-- Radio type -->
      <section class="filterValues" v-if="filter.type.type === 'radio'">
        <section class="filterValue" v-for="value in filter.values" :key="value">
          <input class="invisibleInput" v-model="appliedFilters[i][filter.slug]" type="radio" :id="value"
            :name="filter.slug" :value="value" />
          <label class="radioCheckboxLabel" :for="value">{{ value }}</label>
        </section>
      </section>

      <!-- Status type-->
      <section class="filterValues" v-if="filter.type.type === 'status'">
        <section class="filterValue" v-for="value in Object.keys(filter.values)" :key="value">
          <input class="invisibleInput" v-model="appliedFilters[i][filter.slug]" type="radio" :id="value" :name="value"
            :value="value" />
          <label class="radioCheckboxLabel" :for="value">{{ value }}</label>
        </section>
      </section>
    </section>

    <!-- TODO: defaults -->
  </dialog>
</template>

<script setup>
import { defineProps, ref, watch, computed } from 'vue'
import { useGeneralStore } from '@/stores/general'
import checkFilter from '@/utils/checkFilter'
import { Icon } from '@iconify/vue'
const generalStore = useGeneralStore()


const props = defineProps(['isFilterOverlayOpen', 'data'])
const emit = defineEmits(['closeFilterOverlay'])
const filterConfig = generalStore.getFilters

// Filter event
console.log('appliedfilters');
let appliedFilters = ref(generalStore.getAppliedFilters)

const filteredData = computed(() => {
  const filteredPlots = props.data.plots.filter((plot) => {
    return checkFilter(props.data, appliedFilters, filterConfig, plot.id)
  })
  return filteredPlots
})

watch(
  appliedFilters,
  () => {
    console.log('filt', appliedFilters.value);
    generalStore.setAppliedFilters(appliedFilters.value)
  },
  { deep: true }
)

// dropdown range options
const dropdownRangeOptions = (filter) => {
  const options = []
  for (let i = filter.values.min; i <= filter.values.max; i += filter.values.stepSize) {
    options.push(i)
  }
  return options
}

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
    const single = ['radio']
    const range = ['range']

    if (multiple.includes(filter.type.type)) {
      appliedFilters.value.push({
        [filter.slug]: []
      })
    } else if (single.includes(filter.type.type)) {
      appliedFilters.value.push({
        [filter.slug]: null
      })
    } else if (range.includes(filter.type.type)) {
      appliedFilters.value.push({
        [filter.slug]: {
          min: filter.default.min,
          max: filter.default.max
        }
      })
    }
  }
}

if (generalStore.amountOfAppliedFilters === 0) {
  initializeFilterObject()
}

initializeFilterObject()
</script>

<style scoped>
.dropdownGroup {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
}
.dropdownGroupItem {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
select {
  padding: 0.5rem;
  border-radius: 8px;
  background-color: var(--clr-white);
  font-size: 1rem;
  border: 2px solid var(--clr-primary);
  transition: 0.15s all;
}

select:hover {
  cursor: pointer;
  border-color: var(--clr-dark-grey);
}

.matchAmount {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.errorMatches {
  color: red;

}

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

input[type='radio']:checked+.radioCheckboxLabel {
  background: #283040;
  color: white;
}

input[type='checkbox']:checked+.radioCheckboxLabel {
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
