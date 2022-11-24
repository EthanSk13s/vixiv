import { defineStore } from 'pinia';

export const toastStore = defineStore('toast', {
    state: () => {
        return {
            type: '',
            message: ''
        }
    }
})