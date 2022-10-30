<script lang="ts">
import SubmitButton from './partials/SubmitButton.vue';
import TextInput from './partials/TextInput.vue';

export default {
    components: {
        SubmitButton,
        TextInput
    }
}
</script>

<template>
    <section class="flex-container column">
        <div>
            <h2>Login</h2>
        </div>
        <form>
            <fieldset class="main-field">
                <div class="column-md">
                    <TextInput label-name="Username" place-holder="Username"/>
                    <div class="column-md">
                        <label class="input-label" for="password">Password</label>
                        <input type="password" class="input-text" placeholder="Passowrd" required>
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