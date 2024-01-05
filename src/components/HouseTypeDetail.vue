<template>
    <article class="houseTypeDetail">
        <section class="houseTypeDetail__header">
            <figure class="houseTypeDetail__header-image">
                <!-- to do: image based on housetype-->
                <img src="@/assets/img/int_A10.jpg" alt="house"/>
            </figure>
            <!-- to do: dynamic content -->
            <div class="houseTypeDetail__header-content">
                <h1>Parkappartement</h1>
                <p>Nog 1 beschikbaar</p>
            </div>
        </section>
        
        <section class="houseTypeDetail__content">
            <p class="houseTypeDetail__content-intro">
                Woon je het liefst in een appartement met veel licht en zicht? Dan is een Parkappartement wat voor jou.
            </p>

            <div class="houseTypeDetail__tabs-container">
                <ul class="houseTypeDetail__tabs">
                    <li class="houseTypeDetail__tab"><button id="description" class="button houseTypeDetail__tab-button houseTypeDetail__tab-button--left" :class="{ 'button--outline': tabOpened != 'description'}"  @click="() => { tabOpened = 'description' }">Omschrijving</button></li>
                    <li class="houseTypeDetail__tab"><button id="features" class="button houseTypeDetail__tab-button houseTypeDetail__tab-button--right" :class="{ 'button--outline': tabOpened != 'features'}" @click="() => { tabOpened = 'features' }">Kenmerken</button></li>
                </ul>
            </div>

            <div class="houseTypeDetail__tabs-panels">
                <section v-if="tabOpened == 'description'" id="description" class="houseTypeDetail__tabs-panel">
                    <h2>Omschrijving</h2>

                    <p>
                        In deze appartementen wordt alle ruimte goed benut. Vanuit de woonkamer en het balkon heb je zicht op de groene parkzone aan de Brede Hilledijk of de Groene Vallei. Alle woningen hebben een balkon, er zijn er zelfs een paar met een 2e balkon of terras aan de binnentuin. De Parkappartementen hebben 1, 2 of 3 slaapkamers, zijn te vinden van de begane grond tot en met de vijfde verdieping en zijn er in 6 types. Door de grote raampartijen hebben de appartementen van De Kuil veel daglicht en kun je extra genieten van het uitzicht. 
                        <br>
                        Er is nog maar 1 type beschikbaar!
                    </p>
                </section>

                <section v-if="tabOpened == 'features'" id="features" class="houseTypeDetail__tabs-panel">
                    <h2>Kenmerken</h2>

                    <ul>
                        <li>Vanaf € 373.145,- v.o.n.</li>
                        <li>Zes verschillende woningtypes</li>
                        <li>Woonoppervlakte: ca. 61 tot 81m2</li>
                        <li>Buitenruimte: ca. 4 tot 5m2, balkon met zicht op de parkzone (W)</li>
                        <li>Slaapkamers: 1 of 2</li>
                        <li>Inclusief sanitair en tegelwerk</li>
                        <li>Gasloos, geheel voorzien van vloerverwarming, vloerkoeling en zonnepanelen (gemeenschappelijk)</li>
                        <li>Bijzondere houten gevel aan de binnenzijde</li>
                        <li>Zicht op de nieuwe groene parkzone die overloopt in de eveneens groene entree naar de groene vallei.</li>
                    </ul>
                </section>
            </div>

        </section>

    </article>
</template>

<script setup>
    import { useGeneralStore } from '@/stores/general'
    import { ref } from 'vue'

    const tabOpened = ref('description');

</script>

<style scoped>
    .houseTypeDetail {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        position: relative;
    }

    .houseTypeDetail__header {
        position: relative;
        width: 100%;
    }

    .houseTypeDetail__header-image {
        height: 200px;
        overflow: hidden;
        position: relative;
        width: 100%;
    }
    .houseTypeDetail__header-image img {
        height: 100%;
        left: 0;
        object-fit: cover;
        position: absolute;
        top: 0;
        width: 100%;
    }

    .houseTypeDetail__header-content {
        border-radius: 0 10px 0 0;
        padding: 1rem;
        position: absolute;
        bottom: 0;
        background-color: var(--clr-white);
    }
    .houseTypeDetail__header-content h1 {
        margin: 0;
    }

    .houseTypeDetail__content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        height: 100%;
        padding: 0 1rem;
    }

    .houseTypeDetail__content-intro {
        font-size: 18px;
        font-weight: 600;
    }

    .houseTypeDetail__tabs-container {
        width: 100%;
    }
    .houseTypeDetail__tabs {
        border-radius: 5px;
        display: flex;
        list-style: none;
        overflow: hidden;
    }

    .houseTypeDetail__tabs-panels {
        padding: 0 0.5rem;
    }
    .houseTypeDetail__tab {
        flex-basis: 50%;
    }
    .houseTypeDetail__tab-button {
        padding: 0.75rem 1rem;
        width: 100%;
    }
    .houseTypeDetail__tab-button--left {
        border-radius: 5px 0 0 5px;
    }
    .houseTypeDetail__tab-button--right {
        border-radius: 0 5px 5px 0;
    }
</style>
