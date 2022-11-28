<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { userStore } from './stores/user';
import { toastStore } from './stores/toast';
import { storeToRefs } from 'pinia';

import SearchBox from "./components/partials/SearchBox.vue";
import ToastMessage from "./components/ToastMessage.vue";

const user = userStore();
const toast = toastStore();

const { name } = storeToRefs(user);
const { type, message } = storeToRefs(toast);

if (localStorage.getItem('user')) {
    user.$patch({ name: localStorage.getItem('user')! })
    user.$patch({ userId: Number(localStorage.getItem('id')!) })
    user.$patch({ profilePic: localStorage.getItem('profilePic')! })
}
</script>

<template>
    <header>
        <nav>
            <RouterLink to="" class="nav-content nav-link nav-title"><b>Some Image Viewer</b></RouterLink>
            <RouterLink to="/" class="nav-link align-right" href="/">Home</RouterLink>
            <div class="search-container">
                <SearchBox id="postSearch" :content="searchResults" />
            </div>
            <RouterLink v-if="name" to="/post_image" class="nav-link">Post an Image</RouterLink>
            <RouterLink v-if="name" to="/profile/" class="nav-link">{{ name }}</RouterLink>
            <RouterLink v-else to="/login" class="nav-link">Login</RouterLink>
            <RouterLink v-if="name" @click="logout()" to="/" class="nav-link">Logout</RouterLink>
            <RouterLink v-else to="/register" class="nav-link">Register</RouterLink>
        </nav>
    </header>
    <ToastMessage ref="toasty" :message='message' :type='type'/>
    <RouterView />
    <footer class="flex-container column">
        Some statisitics for this site or something
    </footer>
</template>

<script lang="ts">
export default {
    data() {
        return {
            searchResults: [] as { title: string; image: string, postPath: string }[]
        }
    },
    methods: {
        logout() {
            this.$http.get("/logout")
                .then((response) => {
                    if (response.status == 200) {
                        const user = userStore();
                        user.$reset();

                        localStorage.clear();
                    }
                })
        },
        getSearchResults(e: Event) {
            let target: HTMLInputElement = e.currentTarget! as HTMLInputElement
            let title = target.value;

            if (title.length > 0) {
                this.$http.get(`/api/image/posts/`, { params: { limit: 4, search: title } })
                    .then((response) => {
                        if (response.data.length > 0) {
                            let newResults = [] as [] as { title: string; image: string, postPath: string }[]
                            response.data.forEach((data: any) => {
                                let result = {
                                    title: data.title,
                                    image: `/public/storage/images/${data.postId}.png`,
                                    postPath: `/post/${data.postId}`
                                }

                                newResults.push(result);
                            })

                            this.searchResults = newResults;
                        } else {
                            this.searchResults = [];
                        }
                    })
            } else {
                this.searchResults = [];
            }
        }
    },
    beforeMount() {
        this.$http.get('/session')
            .then((response) => {
                if (response.status != 200) {
                    const user = userStore();
                    user.$reset();

                    localStorage.clear();
                }
            })

    },
    mounted() {
        let searchBar = document.getElementById("postSearch");
        searchBar?.addEventListener('input', this.getSearchResults);
    }
}
</script>