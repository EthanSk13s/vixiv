<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { userStore } from './stores/user';
import { storeToRefs } from 'pinia';


const user = userStore();

const { name } = storeToRefs(user);

if (localStorage.getItem('user')) {
    user.$patch({name: localStorage.getItem('user')!})
}
</script>

<template>
    <header>
        <nav>
            <RouterLink to="" class="nav-content nav-link nav-title"><b>Some Image Viewer</b></RouterLink>
            <RouterLink to="/" class="nav-link" href="/">Home</RouterLink>
            <RouterLink to="/viewpost" class="nav-link">View an Image</RouterLink>
            <RouterLink to="/post_image" class="nav-link">Post an Image</RouterLink>
            <RouterLink v-if="name" to="/login" class="nav-link">{{ name }}</RouterLink>
            <RouterLink v-else to="/login" class="nav-link">Login</RouterLink>
            <RouterLink v-if="name" @click="logout()" to="/" class="nav-link">Logout</RouterLink>
            <RouterLink v-else to="/register" class="nav-link">Register</RouterLink>
        </nav>
    </header>

    <RouterView />
    <footer class="flex-container column">
        Some statisitics for this site or something
    </footer>
</template>

<script lang="ts">
export default {
    beforeMount() {
        this.checkSession()
    },
    methods: {
        checkSession() {
            console.log(this.$cookies.keys());
            this.$http.get("/test")
                .then((response) => {
                    console.log(response.data);
                })
        },
        logout() {
            this.$http.get("/logout")
                .then((response) => {
                    if (response.status == 200) {
                        const user = userStore();
                        user.$reset();

                        localStorage.clear();
                    }
                })
        }
    }
}
</script>