<template>
  <footer class="footer">
    <section v-if="!props.isMapOpen" class="footerContent__wrapper">
      <button class="button solidButton">
        <Icon class="menuButton" icon="material-symbols:help-outline" />Keuzehulp
      </button>
      <button class="button solidButton" @click="emit('lijstMapSwitch')">
        <Icon class="menuButton" icon="mdi:home-city-outline" />Woningaanbod
      </button>
    </section>

    <section v-if="props.isMapOpen" class="footerContent__wrapper">
      <button class="iconOnlyButton outlineButton">
        <Icon width="1.5rem" height="1.5rem" icon="material-symbols:help-outline" />
      </button>
      <button class="button outlineButton" @click="emit('openVergelijkingsTool')">
        <Icon width="1rem" height="1rem" icon="iconamoon:compare" />
        <p class="button_text">Vergelijk</p>
      </button>
      <button class="button solidButton" @click="emit('openFilterTool')">
        <Icon width="1rem" height="1rem" class="menuButton" icon="iconoir:filter" />
        <p class="button_text">Filters</p>
      </button>
    </section>
  </footer>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const emit = defineEmits(['lijstMapSwitch', 'openVergelijkingsTool', 'openFilterTool'])

const props = defineProps(['isMapOpen'])
</script>

<style scoped>
.closeButton {
  cursor: pointer;
  margin-top: 3rem;
  color: var(--clr-white);
}

footer {
  background-color: var(--clr-white);
  padding: 1rem;
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 100vw;
  height: 8vh;
  box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.75);
}

.footerContent__wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.footerContent__logo {
  font-size: 1.75rem;
  font-family: 'DM Serif Display', serif;
}

.iconOnlyButton {
  font-size: 1rem;
  border: 2px solid var(--clr-secondary);
  font-weight: bold;
  padding: 0.3rem 0.3rem;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.button {
  font-size: 1rem;
  border: 2px solid var(--clr-secondary);
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.button_text {
  padding: 0;
  margin: 0;
  margin-left: 0.5rem;
}

.solidButton {
  background: var(--clr-secondary);
  color: var(--clr-white);
}

.outlineButton {
  color: var(--clr-secondary);
}
</style>
