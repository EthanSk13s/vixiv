<script lang="ts">
import Checkbox from './partials/Checkbox.vue';
import SubmitButton from './partials/SubmitButton.vue';
import TextInput from './partials/TextInput.vue';

export default {
    components: {
        Checkbox,
        SubmitButton,
        TextInput
    }
}
</script>

<template>
    <section class="flex-container column">
        <h2>Post an Image</h2>
        <form>
            <fieldset class="main-field">
                <TextInput label-name="imageTitle" place-holder="Title"/>
                <TextInput label-name="imageDesc" place-holder="Description"/>
                <div class="column-md">
                    <label class="input-label" for="image">Image(s)</label>
                    <input class="input-file" type="file" name="images" id="images" multiple required>
                </div>
                <br>
                <Checkbox name="aup" label-desc="Before posting, please accept the Acceptable Use Policy"/>
                <SubmitButton submit-text="Post Image"/>
            </fieldset>
        </form>
    </section>
</template>