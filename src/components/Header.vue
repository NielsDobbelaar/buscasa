<template>
  <header class="header">
    <section class="headerContent__wrapper">
      <section class="headerItem headerContent__menu">
        <Icon class="menuButton" icon="jam:menu" height="40" @click="toggleNav()" />
      </section>
      <section class="headerItem headerContent__logo">
        <p>BUSCASA</p>
      </section>
    </section>

    <nav class="nav" v-if="isNavOpen">
      <ul class="nav__list">
        <li class="nav__item">
          <router-link to="/woningzoeker">Home</router-link>
        </li>
        <li class="nav__item">
          <router-link to="/houses">Houses</router-link>
        </li>
        <li class="nav__item">
          <router-link to="/about">About</router-link>
        </li>
        <Icon class="closeButton" icon="jam:close" height="40" @click="toggleNav()" />
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const isNavOpen = ref(false)

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}
</script>

<style scoped>
.closeButton {
  cursor: pointer;
  margin-top: 3rem;
  color: var(--clr-white);
}
.menuButton {
  cursor: pointer;
}
.headerItem {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

header {
  background-color: var(--clr-primary);
  padding: 1rem;
  position: relative;
  z-index: 1;
}

.headerContent__wrapper {
  color: var(--clr-white);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.headerContent__logo {
  font-size: 1.75rem;
  font-family: 'DM Serif Display', serif;
}

.nav {
  background-color: var(--clr-primary);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

.nav__list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.nav__item {
  margin: 1rem 0;
}
li {
  list-style: none;
}
.nav__item a {
  color: var(--clr-white);
  font-size: 1.5rem;
  text-decoration: none;
}

.nav__item a:hover {
  color: var(--clr-secondary);
}
</style>
