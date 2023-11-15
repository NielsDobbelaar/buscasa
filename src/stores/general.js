import { defineStore } from 'pinia'

// General app stuff
export const useGeneralStore = defineStore('general', {
    state: () => {
        return {
            var: [0, 0, 3, 4, 6],
            language: 'nl',
            filters: null,
        }
    },
    getters: {
        getFilters() {  
            return this.filters
        },
    },
    actions: {
        setFilters() {
            this.filters = 'bla'
        },
        setLanguage(lang) {
            this.language = lang
        },
    }
})
