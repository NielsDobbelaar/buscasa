import { defineStore } from 'pinia'
import houseData from '@/assets/data/wonen-in-de-kuil.json'

// Storage for houses data
export const useHousesStore = defineStore('houses', {
  state: () => {
    return {
      houses: houseData,
      comparingNumbers: [3977, 3161, 3181, 3183],
    }
  },
  getters: {
    getHouses() {
      return this.houses
    },
    getCompareNumbers() {
      return this.comparingNumbers
    },
  },
  actions: {
    addCompareNumber(number) {
      this.comparingNumbers.push(number)
    },
    removeCompareNumber(number) {
      console.log(number, this.comparingNumbers);
      this.comparingNumbers = this.comparingNumbers.filter(
        (item) => item !== number
        )
        console.log(number, this.comparingNumbers);
    },
  },
})
