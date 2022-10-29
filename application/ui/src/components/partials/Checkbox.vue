<script lang="ts">
    export default {
        props: {
            name: String,
            labelDesc: String
        }
    }
</script>

<template>
    <div class="column-md">
        <input type="checkbox" :name=name v-bind:id=name required>
        <label :for=name>{{ labelDesc }}</label>
    </div>
</template>