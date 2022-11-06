<script lang="ts">
export default {
    props: {
        placeholder: String
    },
    methods: {
        OnInput(e: Event) {
            let target = e.currentTarget! as HTMLInputElement;
            console.log('yo');
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
        <textarea ref="textInput" class="comment-input" name="" id="" rows="1" maxlength="140" :placeholder="placeholder"></textarea>
    </div>
</template>