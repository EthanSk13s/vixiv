<script setup lang="ts">
import Index from "../components/Index.vue"
</script>

<template>
    <main>
        <Index />
    </main>
</template>

<script lang="ts">
import { fetchPosts } from "../assets/js/index.js"

export default {
    name: "posts",
    data: () => ({
        error: "",
        messages: []
    }),

    mounted() {
        fetchPosts();
    },
    methods: {}
}
</script>