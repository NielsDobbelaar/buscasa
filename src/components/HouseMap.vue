<template>
  <section className="woningZoekerSection">
    <div className="wrapper">
      <div className="scrollWrapper" id="scroll">
        <div
          className="backgroundIMG"
          :style="{
            width: mapWidth,
            backgroundImage: backgroundURL
          }"
        >
          <svg v-if="map !== 0" viewBox="0 0 1920 780" id="floormap">
            <polygon
              class="trace"
              v-for="poly in filteredHotspotsOnCurrentMap"
              @click="polyClicked(poly.entity_id)"
              :key="poly.svg"
              :points="poly.svg"
              :fill="getPolygonColor(poly.entity_id)"
            />
          </svg>
          <svg v-if="map === 0" viewBox="0 0 1920 780" id="floormap">
            <polygon
              class="trace"
              v-for="poly in filteredSections"
              @click="polyClicked(poly.layer_pointer)"
              :key="poly.svg"
              :points="poly.svg"
              :fill="getPolygonColor(poly.layer_pointer)"
            />
          </svg>
        </div>
      </div>
      <section className="zoomButtonsSection">
        <button
          :disabled="zoom <= 1700"
          className="zoomButtonsSectionButton"
          @click="zoomInOut(false)"
        >
          -
        </button>
        <button
          :disabled="zoom >= 2300"
          className="zoomButtonsSectionButton"
          @click="zoomInOut(true)"
        >
          +
        </button>
      </section>
      <section className="changeMapButtonsSection">
        <button className="zoomButtonsSectionButton" @click="previousMap()">&lt;</button>
      </section>
    </div>
    <!-- todo Later kijken naar implementatie legenda -->
    <!-- <section className="legendSection">
        <div v-for="status in data.statuses" :key="status.id" className="legend">
          <div className="legendCircle" :style="{ backgroundColor: status.color }"></div>
          - {{ status.name }}
        </div>
      </section> -->
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import initMap from '@/assets/data/initMap.json'
import { useGeneralStore } from '@/stores/general'
import checkFilter from '@/utils/checkFilter'

const generalStore = useGeneralStore()

const { data } = defineProps(['data'])
const emit = defineEmits(['closeMapView'])

const appliedFilters = computed(() => {
  return generalStore.getAppliedFilters
})

const filters = generalStore.getFilters

const opacity = '5b'
const zoom = ref(1700)
const map = ref(0)

const layer_id = computed(() => {
  return data.layers[map.value].id
})

//  Filters out sections on the main map that dont have plots because of filters
const filteredSections = computed(() => {
  const sections = initMap
  console.log('section', sections)

  const filteredSections = sections.filter((section) => {
    const hotspotsInSection = data.hotspots.filter((item) => {
      return item.layer_id === data.layers[section.layer_pointer].id
    })

    const filteredHotsports = hotspotsInSection.filter((hotspot) => {
      return checkFilter(data, appliedFilters, filters, hotspot.entity_id)
    })

    return filteredHotsports.length > 0
  })

  return filteredSections
})

// removes hotspots/plots from map based on active filters
const filteredHotspotsOnCurrentMap = computed(() => {
  const hotspotsOnCurrentMap = data.hotspots.filter((item) => {
    return item.layer_id === layer_id.value
  })

  const filteredHotsports = hotspotsOnCurrentMap.filter((hotspot) => {
    return checkFilter(data, appliedFilters, filters, hotspot.entity_id)
  })

  return filteredHotsports
})

const mapWidth = computed(() => {
  return zoom.value + 'px'
})

const backgroundURL = computed(() => {
  return 'url(' + data.layers[map.value].background.url + ')'
})

onMounted(() => {
  resetMap()
})

// calculates color of section on the main map based on the status of not filtered out plots in section
const findPlotsAvailable = (section) => {
  const hotspots = data.hotspots.filter((hotspot) => {
    return hotspot.layer_id === data.layers[section].id
  })

  const filteredHotsports = hotspots.filter((hotspot) => {
    return checkFilter(data, appliedFilters, filters, hotspot.entity_id)
  })

  const plots = filteredHotsports.map((hotspot) => {
    return data.plots[data.plots.map((e) => e.id).indexOf(hotspot.entity_id)]
  })

  const available =
    plots.filter((plot) => {
      return plot.status === 'te-koop'
    }).length > 0

  const inOptie =
    plots.filter((plot) => {
      return plot.status === 'in-optie'
    }).length > 0

  const gereserveerd =
    plots.filter((plot) => {
      return plot.status === 'gereserveerd'
    }).length > 0

  const voorbereiden =
    plots.filter((plot) => {
      return plot.status === 'voorbereiden-start-verkoop'
    }).length > 0

  if (available) return data.statuses['te-koop'].color
  if (inOptie || gereserveerd) return data.statuses['in-optie'].color
  if (voorbereiden) return data.statuses['voorbereiden-start-verkoop'].color
  return data.statuses.verkocht.color
}

const getPolygonColor = (plotID) => {
  if (map.value === 0) {
    return findPlotsAvailable(plotID) + opacity
  }
  const status = data.plots[data.plots.map((e) => e.id).indexOf(plotID)].status
  return data.statuses[status].color + opacity
}

const resetMap = () => {
  const scrollDiv = document.getElementById('scroll')
  if (scrollDiv) {
    scrollDiv.scrollLeft = 630
    zoom.value = 1700
  }
}

const polyClicked = (plotID) => {
  if (map.value === 0) {
    map.value = plotID
    return
  }

  generalStore.setSingleHouseOverlayId(plotID)
  generalStore.setIsSingleHouseOverlayOpen(true)
}

const previousMap = () => {
  if (map.value !== 0) {
    map.value = 0
    resetMap()
  } else {
    emit('closeMapView')
  }
}

const zoomInOut = (increment) => {
  if (increment && zoom.value !== 2300) {
    zoom.value = zoom.value + 100
    return
  }

  if (!increment && zoom.value !== 1700) {
    zoom.value = zoom.value - 100
  }
}
</script>

<style scoped>
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.titleSection {
  text-align: left;
}

.titleSection_Version {
  margin-top: 0;
}

.ResultatenSection_Title {
  margin-bottom: 3px;
}

.ResultatenSection_Resultaten {
  margin: 0;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.scrollWrapper {
  width: 100%;
  height: 100%;
  overflow: scroll;
  margin-right: 0px;
  margin-bottom: 0px;
}

.woningZoekerSection {
  position: relative;
  height: 100%;
}

.backgroundIMG {
  position: relative;
  font-size: 0;
  aspect-ratio: 1920/780;
  line-height: 0;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: cover;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  overflow: hidden;
}

.zoomButtonsSection {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 0;
  width: 110px;
  display: flex;
  flex-direction: row;
  justify-content: right;
}

.zoomButtonsSectionButton {
  display: block;
  font-size: 130%;
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
  margin-left: 5px;
  color: white;
  text-align: center;
  background-color: var(--clr-primary);
  border: 0;
}

.zoomButtonsSectionButton:disabled {
  background-color: var(--clr-grey);
}

.changeMapButtonsSection {
  position: absolute;
  padding: 0 10px;
  top: 20px;
  left: 0px;
  z-index: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.legendSection {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.legend {
  margin-top: 10px;
  height: 20px;
  border: 1px black;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
}

.legendCircle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 10px;
}

.legendSold {
  background-color: #ff0000;
}

.legendOptie {
  background-color: #ff7b00;
}

.legendTeKoop {
  background-color: #00ff2a;
}

.trace {
  stroke: white;
  stroke-width: 2.5px;
}

.transparent {
  fill: transparent;
}
</style>
