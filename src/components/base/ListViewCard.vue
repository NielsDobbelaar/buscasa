<template>
  <article className="cardWrapper">
    <section class="img_section">
      <img
        src="https://x.static.nbo.nl/media/ab/ab8fc32b4e93d6a09d588498f298db23/1024/foto.jpg"
        alt="house"
        class="listViewCard_img"
      />
      <section class="img_overlay">
        <h2 class="overlay_title">{{ item }}</h2>
        <h3 class="overlay_subTitle">nog 2 beschikbaar</h3>
      </section>
    </section>
    <!-- todo change class name -->
    <section class="info_section">
      <section className="bubbleSection">
        <p class="fact_bubble">Blok A</p>
        <p class="fact_bubble">61 tot 81m2</p>
        <p class="fact_bubble">Appartement</p>
      </section>
      <section className="buttonSection">
        <button class="button outlineButton">Meer info</button>
        <button class="button solidButton" @click="emit('lijstMapSwitch')">Bekijk aanbod</button>
      </section>
    </section>
  </article>
</template>

<script setup>
const { item } = defineProps(['item'])
const emit = defineEmits(['lijstMapSwitch'])
</script>

<style scoped>
.cardWrapper {
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-top: 1px solid var(--clr-grey);
}

.cardWrapper:nth-child(1) {
  padding-top: 0;
  border-top: 0;
}

.listViewCard_img {
  width: 100%;
  height: 130px;
  object-fit: cover;
}

.img_section {
  position: relative;
  width: 100%;
  height: 130px;
}

.img_overlay {
  position: absolute;
  background: white;
  border-top-right-radius: 0.25rem;
  bottom: 0;
  left: 0;
  padding: 0.25rem 0.5rem;
}

.overlay_title {
  margin-bottom: 0.2rem;
  font-size: 20px;
  font-family: 'DM Sans', sans-serif;
  font-weight: bold;
  color: var(--clr-primary);
}

.overlay_subTitle {
  margin: 0;
  font-size: 16px;
  font-family: 'DM Sans', sans-serif;
  color: var(--clr-primary);
}

.info_section {
  width: 100%;
  height: 40%;
}

.bubbleSection {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
}

.buttonSection {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  justify-content: space-evenly;
}

.fact_bubble {
  display: block;
  margin: 0;
  padding: 0.25rem 0.5rem;
  border-radius: 25rem;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  color: var(--clr-white);
  background: var(--clr-primary);
  margin-left: 0.5rem;
}

.button {
  width: 45%;
  text-align: center;
  border: 2px solid var(--clr-primary);
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

.button_text {
  padding: 0;
  margin: 0;
  margin-left: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
}

.solidButton {
  background: var(--clr-primary);
  color: var(--clr-white);
}

.outlineButton {
  color: var(--clr-primary);
}
</style>
