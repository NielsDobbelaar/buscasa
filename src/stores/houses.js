import { defineStore } from 'pinia'
import houseData from '../assets/data/wonen-in-de-kuil.json'

// Storage for houses data
export const useHousesStore = defineStore('houses', {
  state: () => {
    return {
      houses: houseData
    }
  },
  getters: {
    getHouses() {
      return this.houses
    }
  }
})
