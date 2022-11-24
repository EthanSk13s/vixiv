<script lang="ts">

export default {
    props: {
        type: String,
        message: String,
    },
    updated() {
        let toasty = this.$refs.toasty as HTMLElement;
        let type = this.type as string;

        if (type === 'success' || type === 'warning' ||
            type === 'error' || type === 'info') {
            toasty.classList.add(type);
        }

        toasty.classList.remove('hidden');
        setTimeout(() => {
            toasty.classList.add('hidden');

            setTimeout(() => {
                toasty.classList.remove(type);
            }, 250)
        }, 3000)

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

.toasty.success {
    background-color: #198754
}

.toasty.warning {
    background-color: #fd7e14
}

.toasty.error {
    background-color: #dc3545
}

.toasty.info {
    background-color: blue;
}
</style>