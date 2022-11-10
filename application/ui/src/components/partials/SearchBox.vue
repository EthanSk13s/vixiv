<script lang="ts">
import SearchThumbnail from './SearchThumbnail.vue';

export default {
    components: {
        SearchThumbnail
    }
}
</script>

<template>
    <div style="justify-content: center; display: flex">
        <input class="input-text" type="text" placeholder="Search.." name="search">
        <div class="search-thumbnails">
        </div>
    </div>
</template>