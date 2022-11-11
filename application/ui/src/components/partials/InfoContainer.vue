<script lang="ts">
import MiniPost from './MiniPost.vue';

export default {
    props: {
        userName: String,
        profilePic: String,
        miniPosts: [] as any[]
    },

    components: {
        MiniPost
    }
}
</script>

<template>
    <div class="info-container">
        <section class="column-md profile-pic">
            <div>
                <img class="profile-pic" :src=profilePic alt="pfp">
            </div>
        </section>
        <div class="column-md center-text">
            <h2>{{ userName }}</h2>
        </div>
        <div class="center-text">
            <h2>Other Posts</h2>
        </div>
        <div class="column-md mini-post-container">
            <div class="mini-post-container">
                <MiniPost v-for="post in miniPosts"
                    :post-link="post.postPath"
                    :image-path="post.image"
                />
            </div>
        </div>
    </div>
</template>