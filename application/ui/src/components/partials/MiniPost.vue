<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
    props: {
        postLink: String,
        imagePath: String
    }
}
</script>

<template>
    <RouterLink :to=postLink!>
        <div class="mini-post">
            <img class="mini-post" :src=imagePath>
        </div>
    </RouterLink>
</template>