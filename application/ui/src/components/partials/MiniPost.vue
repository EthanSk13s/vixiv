<script lang="ts">
    export default {
        props: {
            postLink: String
        }
    }
</script>

<template>
    <div class="mini-post">
        <img class="mini-post" :src=postLink>
    </div>
</template>