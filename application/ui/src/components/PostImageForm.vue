<script lang="ts">
import Checkbox from './partials/Checkbox.vue';
import SubmitButton from './partials/SubmitButton.vue';
import TextInput from './partials/TextInput.vue';

export default {
    components: {
        Checkbox,
        SubmitButton,
        TextInput
    },
    methods: {
        displayImage(files: FileList) {
            for (let i = 0; i < files.length; i++) {
                const file: File = files[i];
                if (file.type.startsWith('image/')) {
                    const currentImg: HTMLImageElement = document.getElementById('preview') as HTMLImageElement;
                    if (currentImg) {
                        const reader = new FileReader();
                        reader.onload = (e) => { currentImg.src = e.target?.result as string; };
                        reader.readAsDataURL(file);
                    } else {
                        const img: HTMLImageElement = document.createElement('img');
                        const thumbnail = document.getElementById('file-upload');
                        img.setAttribute('id', 'preview');
                        img.classList.add('preview-img');

                        thumbnail?.after(img);

                        const reader = new FileReader();
                        reader.onload = (e) => { img.src = e.target?.result as string; };
                        reader.readAsDataURL(file);
                    }
                }
            }

        },
        addFileListener() {
            let fileUpload = document.getElementById('file-upload');

            fileUpload?.addEventListener('input', this.inputFile);
        },
        inputFile(e: Event) {
            e.stopPropagation();
            e.preventDefault();

            const dt = e.currentTarget as HTMLInputElement;
            const files = dt.files;

            this.displayImage(files!);
        }
    },
    mounted() {
        this.addFileListener()
    }
}
</script>

<template>
    <section class="flex-container column">
        <h2>Post an Image</h2>
        <form>
            <fieldset class="main-field">
                <div class="flex-container column">
                    <label for="file-upload" class="post-button">
                        Select image
                    </label>
                    <input id="file-upload" type="file" accept="image/*" required />
                </div>
                <TextInput label-name="imageTitle" place-holder="Title" />
                <TextInput label-name="imageDesc" place-holder="Description" />
                <Checkbox name="aup" label-desc="Before posting, please accept the Acceptable Use Policy" />
                <SubmitButton submit-text="Post Image" />
            </fieldset>
        </form>
    </section>
</template>