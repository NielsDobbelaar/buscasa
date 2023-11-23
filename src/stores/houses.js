import { defineStore } from 'pinia'

// Storage for houses data
export const useHousesStore = defineStore('houses', {
  state: () => {
    return {
      houses: [
        {
          id: 1,
          name: 'Huis 1',
        }, {
          id: 2,
          name: 'Huis 2',
        }
      ],
      comparingIds: [1],
    }
  },
  getters: {
    getHouses() {
      return this.houses
    },
    getComparingIds() {
      return this.comparingIds
    },
  },
})
