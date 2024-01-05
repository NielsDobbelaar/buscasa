<template>
  <footer class="footer">
    <section v-if="props.currentView == 'list'" class="footerContent__wrapper">
      <button class="button button--brown footer__button" @click="emit('openKeuzeHulp')">
        <Icon class="button__icon" icon="material-symbols:help-outline" />
        <p class="button_text">Keuzehulp</p>
      </button>
      <button class="button button--brown footer__button" @click="emit('openMap')">
        <Icon class="button__icon" icon="mdi:home-city-outline" />
        <p class="button_text">Woningaanbod</p>
      </button>
    </section>

    <section v-if="props.currentView == 'map'" class="footerContent__wrapper">
      <button class="button button--brown button--outline button--icon footer__button" @click="emit('openKeuzeHulp')">
        <Icon class="button__icon" icon="material-symbols:help-outline" />
      </button>
      <button class="button button--brown button--outline footer__button" @click="emit('openVergelijkingsTool')">
        <Icon class="button__icon" icon="iconamoon:compare" />
        <p class="button_text">Vergelijk</p>
      </button>
      <button class="button button--brown footer__button" @click="emit('openFilterTool')">
        <Icon class="button__icon" icon="iconoir:filter" />
        <p class="button_text">Filters</p>
      </button>
    </section>

    <section v-if="props.currentView == 'housetype'" class="footerContent__wrapper">
      <button class="button button--outline button--brown footer__button" @click="emit('openKeuzeHulp')">
        <Icon class="button__icon" icon="material-symbols:download" />
        <p class="button_text">Downloads</p>
      </button>
      <button class="button button--brown footer__button" @click="emit('openMap')">
        <Icon class="button__icon" icon="mdi:home-city-outline" />
        <p class="button_text">Woningaanbod</p>
      </button>
    </section>
  </footer>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const emit = defineEmits(['openMap', 'openVergelijkingsTool', 'openFilterTool'])

const props = defineProps(['currentView'])
</script>

<style scoped>
.closeButton {
  cursor: pointer;
  margin-top: 3rem;
  color: var(--clr-white);
}

footer {
  background-color: var(--clr-white);
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 8vh;
  box-shadow: 0px -5px 15px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.footerContent__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0 1rem;
}

.footerContent__logo {
  font-size: 1.75rem;
  font-family: 'DM Serif Display', serif;
}


.footer__button {
  padding: 0.75rem 1rem;
  height: 50px;
  width: 100%;
}
.footer__button.button--icon {
  width: auto;
}

.button_text {
  padding: 0;
  margin: 0;
  margin-left: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
}
</style>
