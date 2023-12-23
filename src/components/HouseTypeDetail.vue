<template>
    <article class="houseTypeDetail">
        <section class="houseTypeDetail__header">
            <figure class="houseTypeDetail__header-image">
                <img src="@/assets/img/int_A10.jpg" alt="house"/>
            </figure>
            <div class="houseTypeDetail__header-content">
                <h1>Parkappartement</h1>
                <p>Nog 1 beschikbaar</p>
            </div>
        </section>
        
        <section class="houseTypeDetail__content">
            <section class="houseTypeDetail__scrollto">
                <a class="button" href="#description">Omschrijving</a>
                <a class="button" href="#features">Kenmerken</a>
            </section>

            <p class="houseTypeDetail__content-intro">
                Woon je het liefst in een appartement met veel licht en zicht? Dan is een Parkappartement wat voor jou.
            </p>

            <h2 id="description">Omschrijving</h2>

            <p>
                In deze appartementen wordt alle ruimte goed benut. Vanuit de woonkamer en het balkon heb je zicht op de groene parkzone aan de Brede Hilledijk of de Groene Vallei. Alle woningen hebben een balkon, er zijn er zelfs een paar met een 2e balkon of terras aan de binnentuin. De Parkappartementen hebben 1, 2 of 3 slaapkamers, zijn te vinden van de begane grond tot en met de vijfde verdieping en zijn er in 6 types. Door de grote raampartijen hebben de appartementen van De Kuil veel daglicht en kun je extra genieten van het uitzicht. 
            </p>

            <p>
                Er is nog maar 1 type beschikbaar!
            </p>

            <h2 id="features">Kenmerken</h2>

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
    </article>
</template>

<script setup>
    import { useGeneralStore } from '@/stores/general'
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
        height: 100%;
        padding: 0 1rem;
    }
    .houseTypeDetail__content h2 {
        margin: 2rem 0 1rem 0;
    }
    .houseTypeDetail__content p {
        margin: 0 0 1rem;
    }
    .houseTypeDetail__content ul {
        list-style-position: inside;
    }

    .houseTypeDetail__content-intro {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 1rem;
    }

    .houseTypeDetail__scrollto {
        position: sticky;
        top: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
        width: 100%;
    }

    .button {
        display: flex;
        justify-content: center;
        color: var(--clr-white);
        background-color: var(--clr-primary);
        text-align: center;
        border: 2px solid var(--clr-primary);
        padding: 0.5rem 1rem;
        border-radius: 5px;
        text-decoration: none;
    }
    .button--outline {
        background-color: transparent;
        color: var(--clr-primary);
    }

    .button--brown {
        background-color: var(--clr-secondary);
        border: 2px solid var(--clr-secondary);
    }
    .button--brown.button--outline {
        background-color: transparent;
        color: var(--clr-secondary);
    }

</style>
