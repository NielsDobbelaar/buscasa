<template>
    <dialog :open="true" class="keuzeHulpDialog">
        <section>
            <section class="keuzeHulp__wrapper">
                <section class="keuzeHulp__header">
                    <section class="keuzeHulp__backButton" @click="closeOverlay()">
                        <Icon icon="lucide:arrow-left" height="25" />
                    </section>
                    <h1>Keuzehulp</h1>
                </section>
                <section class="keuzeHulp__description">
                    Ontdek welke woning het beste aansluit bij uw wensen.
                </section>
                <section class="keuzeHulp__steps">
                    <section class="keuzeHulp__step" :class="{ coloredIn: step.step <= currentStep }" v-for="step in steps"
                        :key="step.step">
                    </section>
                </section>
                <section class="keuzeHulp__content">
                    <h2>{{ steps[currentStep - 1].title }}</h2>

                    <!-- Checkbox type -->
                    <section class="filterValues" v-if="filter.type.type === 'checkbox'">
                        <section class="filterValue" v-for="value in filter.values" :key="value">
                            <input class="invisibleInput" type="checkbox"
                                v-model="appliedFilters[currentStep - 1][filter.slug]" :id="value + 'keuzehulp'" :name="filter.slug + 'keuzehulp'"
                                :value="value" />
                            <label class="radioCheckboxLabel" :for="value + 'keuzehulp'">{{ value }}</label>
                        </section>
                    </section>

                    <!-- Range type -->
                    <section class="filterValues" v-if="filter.type.type === 'range'">
                        <!-- TODO: Misschien package voor gebruiken voor fancy slider met min en max? -->
                        <section>
                            <input v-model="appliedFilters[currentStep - 1][filter.slug]" type="range" :id="filter.slug  + 'keuzehulp'"
                                :name="filter.slug + 'keuzehulp'" :min="filter.values.min" :max="filter.values.max"
                                :step="filter.values.stepSize" />
                        </section>
                    </section>

                    <!-- Radio type -->
                    <section class="filterValues" v-if="filter.type.type === 'radio'">
                        <section class="filterValue" v-for="value in filter.values" :key="value">
                            <input class="invisibleInput" v-model="appliedFilters[currentStep - 1][filter.slug]"
                                type="radio" :id="value + 'keuzehulp'" :name="filter.slug + 'keuzehulp'" :value="value" />
                            <label class="radioCheckboxLabel" :for="value + 'keuzehulp'">{{ value }}</label>
                        </section>
                    </section>

                    <!-- Status type-->
                    <section class="filterValues" v-if="filter.type.type === 'status'">
                        <section class="filterValue" v-for="value in Object.keys(filter.values)" :key="value">
                            <input class="invisibleInput" v-model="appliedFilters[currentStep - 1][filter.slug]"
                                type="radio" :id="value + 'keuzehulp'" :name="value + 'keuzehulp'" :value="value" />
                            <label class="radioCheckboxLabel" :for="value + 'keuzehulp'">{{ value }}</label>
                        </section>
                    </section>
                </section>
            </section>
            <footer class="footer">
                <section class="footerContentwrapper">
                    <button class="button outlineButton" @click="back()">
                        <Icon icon="mingcute:back-2-line" height="20" />
                        Terug
                    </button>
                    <button class="button solidButton" @click="next()">
                        <span v-if="currentStep === steps.length">
                            Toon aanbod
                        </span>
                        <span v-else>
                            Volgende stap
                        </span>
                        <Icon icon="formkit:arrowright" height="15" />
                    </button>
                </section>
            </footer>
        </section>
    </dialog>
</template>

<script setup>
import { watch } from 'vue'
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useGeneralStore } from '@/stores/general'
const generalStore = useGeneralStore()

const filterConfig = generalStore.getFilters

const filter = computed(() => {
    return filterConfig.find((filter) => filter.slug === steps.value[currentStep.value - 1].type)
})

let appliedFilters = ref([])

watch(
    appliedFilters,
    () => {
        generalStore.setAppliedFilters(appliedFilters.value)
    },
    { deep: true }
)

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

const emit = defineEmits(['closeKeuzeHulpOverlay'])
const closeOverlay = () => {
    // emit
    emit('closeKeuzeHulpOverlay')
}

initializeFilterObject()

const currentStep = ref(1)

const steps = ref([
    {
        step: 1,
        title: 'Wat voor status wilt u op zoeken?',
        type: 'status',
    },
    {
        step: 2,
        title: 'Naar wat voor soort woning gaat uw voorkeur uit?',
        type: 'type',
    },
    {
        step: 3,
        title: 'Wat is uw budget?',
        type: 'price',
    },
    {
        step: 4,
        title: 'Hoeveel woonoppervlak wilt u het liefst hebben?',
        type: 'living_surface',
    },

    {
        step: 5,
        title: 'Hoeveel kaveloppervlakte wilt u het liefst hebben?',
        type: 'plot_surface',
    },
    {
        step: 6,
        title: 'Hoeveel parkeerplaatsen wilt u bij uw woning krijgen?',
        type: 'parking_count'
    },
])

const back = () => {
    if (currentStep.value > 1) {
        currentStep.value--
    }
}
const next = () => {
    if (currentStep.value <= steps.value.length) {
        currentStep.value++
    }
    if (currentStep.value === steps.value.length + 1) {
        closeOverlay()
    }

}

</script>

<style scoped>
.keuzeHulpDialog {
    background-color: var(--clr-white);
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 2;
    overflow-y: auto;
    overflow-x: hidden;
}

.keuzeHulp__description {
    font-size: 1.2rem;

}

.keuzeHulp__backButton {
    padding: 0.5rem;
    background-color: var(--clr-primary);
    display: flex;
    color: var(--clr-white);
    justify-content: center;
    border-radius: 8px;
    align-items: center;

}

.keuzeHulp__content {
    font-weight: bold;
    font-size: 1.5rem;
}

.keuzeHulp__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

h1 {
    color: var(--clr-primary);
    font-family: 'DM Sans', sans-serif;
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 0;
}

h2 {
    color: var(--clr-primary);
    font-family: 'DM Sans', sans-serif;
    font-size: 1.25rem;
    font-weight: bold;
}

.keuzeHulp__wrapper {
    padding: 1rem;
}

.keuzeHulp__step {
    width: 100%;
    height: 0.75rem;
    background-color: #E5E5E5;

}

.keuzeHulp__steps {
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 2rem;
    gap: 0.5rem;
}

.coloredIn {
    background-color: var(--clr-primary);
}




.closeButton {
    cursor: pointer;
    margin-top: 3rem;
    color: var(--clr-white);
}

.menuButton {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
}

footer {
    background-color: var(--clr-white);
    padding: 1rem;
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 100vw;
    box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.25);
}

.footerContentwrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
}

.footerContent__logo {
    font-size: 1.75rem;
    font-family: 'DM Serif Display', serif;
}

.button {
    gap: 0.5rem;
    width: 100%;
    font-size: 1rem;
    border: 2px solid var(--clr-secondary);
    padding: 0.75rem 1rem;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.solidButton {
    background: var(--clr-secondary);
    color: var(--clr-white);
}

.outlineButton {
    color: var(--clr-secondary);
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
}</style>