<template>
    <footer class="footer">
        <section class="footerContentwrapper">
            <button class="button solidButton">
                <Icon class="menuButton" icon="material-symbols:help-outline" height="40" />Keuzehulp
            </button>
            <button class="button solidButton" @click="emit('lijstMapSwitch')">
                <Icon class="menuButton" icon="mdi:home-city-outline" height="40" />Woningaanbod
            </button>
        </section>
    </footer>
</template>
  
<script setup>
import { Icon } from '@iconify/vue'

const emit = defineEmits(['lijstMapSwitch'])

// const props = defineProps(['isMapOpen'])
</script>
  
<style scoped>
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
    height: 8vh;
    box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.75);
}

.footerContentwrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.footerContent__logo {
    font-size: 1.75rem;
    font-family: 'DM Serif Display', serif;
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

.solidButton {
    background: var(--clr-secondary);
    color: var(--clr-white);
}

.outlineButton {
    color: var(--clr-secondary);
}
</style>