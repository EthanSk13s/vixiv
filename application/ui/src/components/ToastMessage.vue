<script lang="ts">

export default {
    props: {
        type: String,
        message: String,
    },
    updated() {
        console.log('test')
        let toasty = this.$refs.toasty as HTMLElement;

        toasty.classList.remove('hidden');
        setTimeout(() => {
            toasty.classList.add('hidden');
        }, 5000)
    }
}
</script>

<template>
    <div class="flex-container">
        <div ref="toasty" class="toasty hidden">
            {{ message }}
        </div>
    </div>

</template>

<style>
.toasty {
    border-radius: 0.5em;
    padding: .5em;
    background-color: blue;
    position: absolute;
    display: flex;
    z-index: 98;
    overflow-x: auto;
    justify-content: center;
    margin-top: 1.9em;
    top: 0;
    transition: top 0.25s ease-in-out;
}

.toasty.hidden {
    top: -100px;
}
</style>