<script lang="ts">
    export default {
        props: {
            labelName: String,
            placeHolder: String,
            required: Boolean,
        }
    }
</script>

<template>
    <div class="column-md">
        <label class="input-label" :for=labelName>{{ placeHolder }}</label>
        <input class="input-text" :id=labelName type="text" :name=labelName v-bind:placeholder=placeHolder :required="required">
    </div>
</template>