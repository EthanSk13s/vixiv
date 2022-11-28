<script lang="ts">
import SubmitButton from './partials/SubmitButton.vue';
import TextInput from './partials/TextInput.vue';

import { userStore } from '@/stores/user';
import { toastStore } from '@/stores/toast';

export default {
    setup() {
        const user = userStore();
        const toast = toastStore();

        return {
            user,
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
        TextInput
    }, methods: {
        checkLogin(event: Event) {
            event.preventDefault();
            let form = this.$refs.form as HTMLFormElement;
            let data = new FormData(form);
            this.username = data.get("username")?.toString()!;
            this.password = data.get("password")?.toString()!;

            this.$http.post("/api/login", this.$data)
                .then((response) => {
                    let data = response.data;
                    if (data.valid) {
                        this.user.$patch({name: this.username});
                        this.user.$patch({userId: data.userId});

                        if (data.hasProfile) {
                            this.user.$patch({profilePic: `/public/storage/profiles/${data.userId}.png`});
                        } else {
                            this.user.$patch({profilePic: '/public/storage/profiles/default.png'});
                        }

                        localStorage.setItem('user', this.user.name);
                        localStorage.setItem('id', String(this.user.userId));
                        localStorage.setItem('profilePic', this.user.profilePic);

                        this.toast.$patch({type: 'success'});
                        this.toast.$patch({message: 'Successfully Logged In'});

                        this.$router.push({'name': 'home'});
                    } else {
                        this.toast.$patch({type: 'error'});
                        this.toast.$patch({message: 'Invalid Login Credentials'});
                    }
                })
        }
    }
}
</script>

<template>
    <section class="flex-container column">
        <div>
            <h2>Login</h2>
        </div>
        <form ref="form" @submit="checkLogin" method="POST">
            <fieldset class="main-field">
                <div class="column-md">
                    <TextInput label-name="username" place-holder="Username" v-model="username"/>
                    <div class="column-md">
                        <label class="input-label" for="password">Password</label>
                        <input type="password" class="input-text" placeholder="Password" name="password" v-model="password" required>
                    </div>
                </div>
                <div class="column-md">
                    <section>
                        Forgot your password? Too bad. (for now :))
                    </section>
                </div>
                <SubmitButton submit-text="Login"/>
            </fieldset>
        </form>
    </section>
</template>