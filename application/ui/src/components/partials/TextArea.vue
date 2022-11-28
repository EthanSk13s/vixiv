<script lang="ts">
export default {
    props: {
        placeholder: String,
        id: String,
        disabled: Boolean,
    },
    methods: {
        OnInput(e: Event) {
            let target = e.currentTarget! as HTMLInputElement;
            target.style.height = '0';
            target.style.height = (target.scrollHeight) + "px";
        }
    },
    mounted() {
        const tx = this.$refs.textInput as HTMLInputElement;
        tx.setAttribute("style", `height: ${tx.scrollHeight}px; overflow-y:hidden;`)
        tx.addEventListener('input', this.OnInput, false);
    }
}
</script>

<template>
    <div class="comment-input-container">
        <textarea v-if="disabled === false" ref="textInput" class="comment-input" name="" :id=id rows="1" maxlength="140" :placeholder="placeholder"></textarea>
        <textarea v-else ref="textInput" class="comment-input" name="" :id=id rows="1" maxlength="140" :placeholder="placeholder" disabled></textarea>
    </div>
</template>