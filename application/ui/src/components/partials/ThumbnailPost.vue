<script lang="ts">
    export default {
        props: {
            author: String,
            authorPfp: String,
            title: String,
            image: String
        }
    }
</script>

<template>
    <div class="flex-container post-flex">
        <div class="post-container">
            <div class="thumbnail-container">
                <img class="thumbnail-container" :src=image alt="">
            </div>
            {{ title }}
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
</template>