import { defineStore } from 'pinia'

// Storage for houses data
export const useHousesStore = defineStore('houses', {
  state: () => {
    return {
      houses: [1,2,3,4,5,7,7],
    }
  },
  getters: {
    getHouses() {
      return this.houses
    },
  },
})
