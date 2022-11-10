<script lang="ts">
export default {
    props: {
        title: String,
        image: String,
        postPath: String
    }
}
</script>

<template>
    <div>
        <a class="no-deco" :href="postPath">
            <div class="flex-container post-flex post-overlay">
                <div class="post-result-container">
                    <div class="post-result">
                        <img class="post-result" :src=image alt="">
                    </div>
                    <div class="post-result-title">
                        {{ title }}
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>