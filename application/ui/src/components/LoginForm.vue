<script lang="ts">
import SubmitButton from './partials/SubmitButton.vue';
import TextInput from './partials/TextInput.vue';

export default {
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

            fetch("/login/check", {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(this.$data)})
                .then((response) => response.json())
                .then((data) => {
                    if (data.valid) {
                        this.$router.push({'name': 'home'});
                    }
                });
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