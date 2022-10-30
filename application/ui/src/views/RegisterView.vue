<script lang="ts">
import RegisterForm from '@/components/RegisterForm.vue';
import { setEvents } from '@/assets/js/registration';

export default {
    components: {
        RegisterForm
    },
    mounted() {
        setEvents();
    }
}
</script>

<template>
    <main>
        <RegisterForm />
    </main>
</template>