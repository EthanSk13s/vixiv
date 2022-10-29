<script lang="ts">
    export default {
        props: {
            SubmitText: String
        }
    }
</script>

<template>
    <div class="column-md">
        <input class="post-button" type="submit" v-bind:value=SubmitText>
    </div>
</template>