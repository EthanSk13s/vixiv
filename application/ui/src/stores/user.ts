import { defineStore } from 'pinia';

export const userStore = defineStore('user', {
    state: () => {
        return {
            name: '',
            // TODO: should add a column for this in the DB
            profilePic: 'https://theater.miriondb.com/icons/017kth0343_0.png'
        }
    }
})