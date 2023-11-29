<template>
  <dialog :open="props.isFilterOverlayOpen" class="filterOverlay__wrapper">
    <!-- Heading -->
    <section>
      <h1>Filters dialog</h1>
      <button @click="closeOverlay()">Close</button>
      <button @click="initializeFilterObject()">Reset filters</button>
    </section>

    <!-- Filters -->
    <section v-for="(filter, i) in filterConfig" :key="filter.slug">
      <p>
        {{ filter.label }}
      </p>

      <!-- ----- Filter opties per type ---- -->

      <!-- Checkbox type -->
      <section class="filterValues" v-if="filter.type.type === 'checkbox'">
        <section class="filterValue" v-for="value in filter.values" :key="value">
          <input
            type="checkbox"
            v-model="appliedFilters[i][filter.slug]"
            :id="value"
            :name="value"
            :value="value"
          />
          <label :for="value">{{ value }}</label>
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
            v-model="appliedFilters[i][filter.slug]"
            type="radio"
            :id="value"
            :name="filter.slug"
            :value="value"
          />
          <label :for="value">{{ value }}</label>
        </section>
      </section>

      <!-- Status type-->
      <section class="filterValues" v-if="filter.type.type === 'status'">
        <section class="filterValue" v-for="value in Object.keys(filter.values)" :key="value">
          <input
            v-model="appliedFilters[i][filter.slug]"
            type="checkbox"
            :id="value"
            :name="value"
            :value="value"
          />
          <label :for="value">{{ value }}</label>
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
  border: 1px solid red;
  padding: 1rem;
  margin: 1rem;
}

.filterValues {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
