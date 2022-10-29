<script lang="ts">
    export default {
        props: {
            submitText: String
        }
    }
</script>

<template>
    <div class="column-md">
        <input class="post-button" type="submit" :value=submitText>
    </div>
</template>