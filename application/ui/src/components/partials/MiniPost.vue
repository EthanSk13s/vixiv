<script lang="ts">
export default {
    props: {
        postLink: String,
        imagePath: String
    }
}
</script>

<template>
    <a :href=postLink>
        <div class="mini-post">
            <img class="mini-post" :src=imagePath>
        </div>
    </a>
</template>