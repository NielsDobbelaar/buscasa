import { defineStore } from 'pinia'

// General app stuff
export const useUserStore = defineStore('user', {
    state: () => {
        return {
            userstuff: 'bla',
        }
    },
})