<script lang="ts">
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

import InfoContainer from './partials/InfoContainer.vue';
import TextInput from './partials/TextInput.vue';
import SubmitButton from './partials/SubmitButton.vue';

import { toastStore } from '@/stores/toast';
import { userStore } from '@/stores/user';

import { CONFIG } from '../../../config';

export default {
    data() {
        return {
            username: '',
            hasProfile: false,
            formData: new FormData()
        }
    },
    setup() {
        const toast = toastStore();
        const user = userStore();

        return {
            toast,
            user
        }
    },
    components: {
        InfoContainer,
        TextInput,
        SubmitButton
    },
    methods: {
        changePfp(files: FileList) {
            for (let i = 0; i < files.length; i++) {
                const file: File = files[i];
                if (file.type.startsWith('image/')) {
                    const currentImg: HTMLImageElement = document.getElementById('preview') as HTMLImageElement;
                    if (currentImg) {
                        const reader = new FileReader();
                        reader.onload = (e) => { currentImg.src = e.target?.result as string; };
                        reader.readAsDataURL(file);
                    } else {
                        const main = document.getElementsByTagName('main')[0];
                        const overlay = document.createElement('div');
                        overlay.setAttribute('id', 'overlay');

                        overlay.classList.add('overlay');

                        const popUp = document.createElement('div');
                        popUp.classList.add('pop-up-preview-img');

                        const divImg = document.createElement('div');
                        const img: HTMLImageElement = document.createElement('img');

                        img.setAttribute('id', 'preview');
                        img.classList.add('center');

                        const reader = new FileReader();
                        var button = this.createButton('Crop Icon');

                        reader.onload = (e) => {
                            img.src = e.target?.result as string;

                            let cropper: Cropper = this.createCropper(img)

                            let croppedCanvas;
                            let roundedCanvas;
                            button.onclick = () => {
                                let form = this.$refs.updateForm as HTMLFormElement;
                                let data = new FormData(form);

                                croppedCanvas = cropper.getCroppedCanvas();

                                roundedCanvas = this.getCanvas(croppedCanvas);

                                popUp.parentNode?.removeChild(popUp);
                                overlay.parentNode?.removeChild(overlay);

                                let pfpImg = document.getElementById('pfp') as HTMLImageElement;
                                pfpImg!.src = roundedCanvas.toDataURL();

                                roundedCanvas.toBlob((blob) => {
                                    if (this.$data.formData.get('avatar-crop')) {
                                        this.$data.formData.set('avatar-crop', blob!, 'avatar.png')
                                    } else {
                                        this.$data.formData.append('avatar-crop', blob!, 'avatar.png')
                                    }
                                });
                            }
                        };
                        reader.readAsDataURL(file);

                        divImg.appendChild(img);
                        divImg.appendChild(button);
                        popUp.appendChild(divImg);

                        main.before(overlay);
                        overlay.before(popUp);
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

            this.changePfp(files!);
        },
        createCropper(image: HTMLImageElement) {
            let cropper = new Cropper(image, {
                aspectRatio: 1,
                viewMode: 1,
                minContainerHeight: 400,
                minContainerWidth: 400
            })

            return cropper
        },
        getCanvas(sourceCanvas: CanvasImageSource) {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');

            let width = Number(sourceCanvas.width);
            let height = Number(sourceCanvas.height);

            canvas.width = width;
            canvas.height = height;

            ctx!.imageSmoothingEnabled = true;
            ctx!.drawImage(sourceCanvas, 0, 0, width, height);
            ctx!.globalCompositeOperation = 'destination-in';

            ctx!.beginPath();
            ctx!.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
            ctx!.fill();

            return canvas;
        },
        createButton(value: string) {
            let buttonContainer = document.createElement('div');
            buttonContainer.classList.add('column-md');

            let button = document.createElement('button');
            button.classList.add('post-button');
            button.innerHTML = value;

            buttonContainer.appendChild(button);

            return buttonContainer;
        },
        fetchData(id: string) {
            this.$http.get(`/api/users/profile/${id}`)
                .then((response) => {
                    this.$data.username = response.data.username;
                    let pfp = document.getElementById('pfp') as HTMLImageElement;

                    if (response.data.hasProfile) {
                        pfp.src = `${CONFIG.PFP_PATH}/${id}.png`
                    } else {
                        pfp.src = `${CONFIG.PFP_PATH}/default.png`
                    }
                })
        },
        postData(e: Event) {
            e.preventDefault();
            let form = this.$refs.updateForm as HTMLFormElement;
            let data = new FormData(form);
            let username = data.get('username');
            let password = data.get('password');

            if (username) {
                this.$data.formData.append('username', username);
            }

            if (password) {
                this.$data.formData.append('password', password);
            }

            this.$http.post(`/api/users/profile/`, this.$data.formData)
                .then((response) => {
                    if (response.status == 200) {
                        if (username) {
                            this.user.$patch({name: username as string})
                            localStorage.setItem('user', username as string);
                        }

                        if (data.get('avatar-crop')) {
                            let userId = localStorage.getItem('id');
                            let path = `/public/storage/profiles/${userId}.png`

                            this.user.$patch({profilePic: path});
                            localStorage.setItem('profilePic', path);
                        }

                        this.toast.$patch({ type: 'success' });
                        this.toast.$patch({ message: 'Information has been updated' });

                        setTimeout(() => {
                            this.$router.go(0);
                        }, 3000)
                    }
                });
        }
    },
    mounted() {
        if (localStorage.getItem('user')) {
            let userId = localStorage.getItem('id')!;
            this.fetchData(userId);
        }
        this.addFileListener();

    }
}
</script>

<template>
    <div class="flex-container row">
        <div class="info-container">
            <section class="column-md profile-pic">
                <div>
                    <img id="pfp" class="profile-pic" alt="pfp">
                </div>
            </section>
            <div class="column-md center-text">
                <h2>{{ username }}</h2>
            </div>
        </div>
        <div class="flex-container column">
            <div>
                <h1>Settings</h1>
            </div>
            <div class="settings-container column">
                <div class="flex-container column">
                    <label for="file-upload" class="post-button">
                        Change Profile Picture
                    </label>
                    <input name="avatar" id="file-upload" type="file" accept="image/*" />
                </div>
                <form ref="updateForm" @submit="postData" method="POST" enctype="multipart/form-data">
                    <TextInput label-name="username" place-holder="New Username" :required="false"/>
                    <div class="column-md">
                        <label class="input-label" for="password">New Password</label>
                        <input type="password" class="input-text" placeholder="New Password" name="password">
                    </div>
                    <div class="column-md">
                        <label class="input-label" for="password">Confrim New Password</label>
                        <input type="password" class="input-text" placeholder="Confirm New Password"
                            name="confirmPassword">
                    </div>
                    <SubmitButton submit-text="Update Info" />
                </form>
            </div>
        </div>
    </div>
</template>

<style>
.center {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    z-index: 3
}

.overlay {
    position: absolute;
    background: #000;
    opacity: .3;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1
}

.pop-up-preview-img {
    background-color: var(--secondary);
    padding: 3em;
    border-radius: .5em;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    align-items: center;
    max-width: 640px;
    z-index: 2
}

.settings-container {
    background-color: var(--secondary);
    padding: .5em;
    border-radius: .35em;
}

.settings-container.column {
    display: flex;
    flex-direction: column;
}

.cropper-view-box,
.cropper-face {
    border-radius: 50%;
}

/* The css styles for `outline` do not follow `border-radius` on iOS/Safari (#979). */
.cropper-view-box {
    outline: 0;
    box-shadow: 0 0 0 1px #39f;
}
</style>