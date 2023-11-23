import { defineStore } from 'pinia'

// General app stuff
export const useGeneralStore = defineStore('general', {
    state: () => {
        return {
            language: 'nl',
            filters: [
                {
                    "order": 1,
                    "slug": "status",
                    "label": "Status",
                    "visible": 1,
                    "open": 1,
                    "values": {
                        "Te koop": "#74F570",
                        "In optie": "#FFE05B",
                        "Verkocht": "#F57070",
                        "Voorbereiden start verkoop": "#6699cc"
                    },
                    "default": {
                        "Te koop": "#74F570",
                        "In optie": "#FFE05B",
                        "Verkocht": "#F57070",
                        "Voorbereiden start verkoop": "#6699cc"
                    },
                    "extra": "{\"key\":\"\"}",
                    "type": {
                        "type": "status"
                    }
                },
                {
                    "order": 2,
                    "slug": "type",
                    "label": "Woningtype",
                    "visible": 1,
                    "open": 1,
                    "values": [
                        "Appartement",
                        "Dijkappartement",
                        "Dijkmaisonnette",
                        "Drive-in woning",
                        "Maisonnette",
                        "Parkappartement",
                        "Parkmaisonnette",
                        "Stadswoning",
                        "Terraswoning",
                        "Valleiwoning"
                    ],
                    "default": [
                        "Appartement",
                        "Dijkappartement",
                        "Dijkmaisonnette",
                        "Drive-in woning",
                        "Maisonnette",
                        "Parkappartement",
                        "Parkmaisonnette",
                        "Stadswoning",
                        "Terraswoning",
                        "Valleiwoning"
                    ],
                    "extra": "{\"key\":\"\"}",
                    "type": {
                        "type": "checkbox"
                    }
                },
                {
                    "order": 3,
                    "slug": "price",
                    "label": "Prijs",
                    "visible": 1,
                    "open": 1,
                    "values": {
                        "min": 250000,
                        "max": 1000000,
                        "steps": 3,
                        "stepSize": 250000
                    },
                    "default": {
                        "min": 250000,
                        "max": 1000000,
                        "steps": 3,
                        "stepSize": 250000
                    },
                    "extra": "{\"key\":\"\"}",
                    "type": {
                        "type": "range"
                    }
                },
                {
                    "order": 4,
                    "slug": "living_surface",
                    "label": "Woonoppervlakte",
                    "visible": 1,
                    "open": 1,
                    "values": {
                        "min": 50,
                        "max": 160,
                        "steps": 11,
                        "stepSize": 10
                    },
                    "default": {
                        "min": 50,
                        "max": 160,
                        "steps": 11,
                        "stepSize": 10
                    },
                    "extra": "{\"key\":\"\"}",
                    "type": {
                        "type": "range"
                    }
                },
                {
                    "order": 5,
                    "slug": "plot_surface",
                    "label": "Kaveloppervlakte",
                    "visible": 1,
                    "open": 1,
                    "values": {
                        "min": 0,
                        "max": 50,
                        "steps": 5,
                        "stepSize": 10
                    },
                    "default": {
                        "min": 0,
                        "max": 50,
                        "steps": 5,
                        "stepSize": 10
                    },
                    "extra": "{\"key\":\"\"}",
                    "type": {
                        "type": "range"
                    }
                },
                {
                    "order": 6,
                    "slug": "parking_count",
                    "label": "Aantal parkeerplaatsen",
                    "visible": 1,
                    "open": 1,
                    "values": [
                        "0 of meer",
                        "1 of meer",
                        "2 of meer"
                    ],
                    "default": "0 of meer",
                    "extra": "{\"key\":\"\"}",
                    "type": {
                        "type": "radio"
                    }
                }
            ],
            statusses: {
                "te-koop": {
                    "id": 25,
                    "project_id": 7,
                    "slug": "te-koop",
                    "name": "Te koop",
                    "color": "#74F570",
                    "created_at": "2022-06-06T12:19:24.000000Z",
                    "updated_at": "2022-06-06T12:19:24.000000Z",
                    "order": 0
                },
                "in-optie": {
                    "id": 27,
                    "project_id": 7,
                    "slug": "in-optie",
                    "name": "In optie",
                    "color": "#FFE05B",
                    "created_at": "2022-06-06T12:19:24.000000Z",
                    "updated_at": "2022-06-06T12:19:24.000000Z",
                    "order": 1
                },
                "verkocht": {
                    "id": 29,
                    "project_id": 7,
                    "slug": "verkocht",
                    "name": "Verkocht",
                    "color": "#F57070",
                    "created_at": "2022-06-06T12:19:24.000000Z",
                    "updated_at": "2022-06-06T12:19:24.000000Z",
                    "order": 2
                },
                "voorbereiden-start-verkoop": {
                    "id": 31,
                    "project_id": 7,
                    "slug": "voorbereiden-start-verkoop",
                    "name": "Voorbereiden start verkoop",
                    "color": "#6699cc",
                    "created_at": "2022-06-06T12:19:24.000000Z",
                    "updated_at": "2022-06-06T12:19:24.000000Z",
                    "order": 3
                },
                "gereserveerd": {
                    "id": 214,
                    "project_id": 7,
                    "slug": "gereserveerd",
                    "name": "Gereserveerd",
                    "color": "#FFE05B",
                    "created_at": "2023-08-29T11:43:09.000000Z",
                    "updated_at": "2023-08-29T11:43:09.000000Z",
                    "order": 2
                }
            },
        }
    },
    getters: {
        // Filters
        getFilters() {  
            return this.filters
        },
        getFilter(slug) {
            return this.filters.find(filter => filter.slug == slug)
        },
        // Statusses
        getStatusses() {
            return this.statusses
        },
        getStatus(status) {
            return this.statusses[status]
        },
        // Language
        getLanguage() {
            return this.language
        },
    },
    actions: {
        setLanguage(lang) {
            this.language = lang
        },
    }
})
