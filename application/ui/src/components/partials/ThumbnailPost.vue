<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
    props: {
        author: String,
        authorPfp: String,
        title: String,
        image: String,
        postPath: String
    }
}
</script>

<template>
    <RouterLink class="no-deco" :to="postPath!">
        <div class="flex-container post-flex">
            <div class="post-container">
                <div class="thumbnail-container">
                    <img class="thumbnail-container" :src=image alt="">
                </div>
                <div class="title">
                    {{ title }}
                </div>
                <div class="author-container">
                    <div class="author-pfp">
                        <img :src=authorPfp alt="" class="author-pfp">
                    </div>
                    <div>
                        {{ author }}
                    </div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>