<script lang="ts">
import SearchThumbnail from './SearchThumbnail.vue';

export default {
    props: {
        id: String,
        content: [] as any[]
    },
    components: {
        SearchThumbnail
    }
}
</script>

<template>
    <div style="justify-content: center; display: flex">
        <input :id=id class="input-text" type="text" placeholder="Search.." name="search">
        <div ref="results" class="search-thumbnails" v-if="content.length > 0">
            <SearchThumbnail v-for="result in content" 
                :title="result.title"
                :image="result.image"
                :postPath="result.postPath"
            />
        </div>
    </div>
</template>