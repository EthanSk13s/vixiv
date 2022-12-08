<script lang="ts">
import SubmitButton from './partials/SubmitButton.vue';
import TextInput from './partials/TextInput.vue';
import Checkbox from './partials/Checkbox.vue';

import { toastStore } from '@/stores/toast';

export default {
    setup() {
        const toast = toastStore();

        return {
            toast
        }
    },
    data() {
        return {
            username: "",
            password: ""
        }
    },
    components: {
        SubmitButton,
        TextInput,
        Checkbox
    },
    methods: {
        tryRegister(event: Event) {
            event.preventDefault();
            let form = this.$refs.registerForm as HTMLFormElement;
            let data = new FormData(form);

            // Create JSON data
            let json = {
                user: data.get('user'),
                email: data.get('email'),
                password: data.get('password')
            }

            this.$http.post("/api/register", json)
                .then((response) => {
                    if (response.status == 200) {
                        this.toast.$patch({ type: 'success' });
                        this.toast.$patch({ message: 'Successfully Registered' });

                        this.$router.push({ 'name': 'login' });
                    }
                })
                .catch((error) => {
                    this.toast.$patch({ type: 'error' });
                    this.toast.$patch({ message: 'Failed to Register. There may be a duplicate' });
                })
        }
    }
}
</script>

<template>
    <section class="flex-container column">
        <h2>Registration</h2>
        <form ref="registerForm" id="main-form" @submit="tryRegister" method="POST">
            <fieldset class="main-field">
                <TextInput label-name="user" place-holder="Username" :required="true"/>
                <div class="column-md">
                    <label class="input-label" for="email">Email</label>
                    <input class="input-text" type="email" name="email" placeholder="E-mail" required>
                </div>
                <div class="column-md">
                    <label class="input-label" for="password">Password</label>
                    <input class="input-text" type="password" name="password" placeholder="Password" required>
                </div>
                <div class="column-md">
                    <label class="input-label" for="confirmPass">Confirm Password</label>
                    <input id="confirmPass" class="input-text" type="password" placeholder="Confirm Password" required>
                </div>
                <Checkbox name="over13" label-desc="Are you over the age of 13" />
                <div class="column-md">
                    <input class="checkmark" type="checkbox" name="tosAndPrivacy" required>
                    <label for="tosAndPrivacy">Do you accept our <a href="">Terms of Service</a> and <a
                            href="">PrivacyPolicy</a></label>
                </div>
                <div class="column-md">
                    <input class="post-button" type="submit" value="Register">
                </div>
            </fieldset>
        </form>
    </section>
</template>