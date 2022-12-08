<script lang="ts">
import { nextTick } from "vue";

import Comment from "./partials/Comment.vue"
import InfoContainer from "./partials/InfoContainer.vue";
import TextAreaVue from "./partials/TextArea.vue";

import { userStore } from "@/stores/user";

import { CommentModel } from "@/models";
import { CONFIG } from "../../../config";

export default {
    data() {
        return {
            title: "",
            description: "",
            authorName: "",
            authorId: null,
            authorPfp: '',
            postUpload: new Date(),
            path: "",
            comments: [] as CommentModel[],
            otherPosts: [] as { image: any; postPath: string; }[],
            loggedIn: false
        }
    },
    setup() {
        const user = userStore();

        return {
            user
        }
    },
    methods: {
        fetchPost(id: string) {
            this.$http.get(`/api/image/posts/${id}`)
                .then((response) => {
                    let data = response.data.post
                    this.title = data.title;
                    this.description = data.description;
                    this.authorName = data.authorName;
                    this.authorId = data.authorId;
                    this.postUpload = new Date(data.postUpload);
                    this.path = `${CONFIG.IMAGE_PATH}/${id}.png`

                    if (data.hasProfile) {
                        this.authorPfp = `${CONFIG.PFP_PATH}/${this.authorId}.png`
                    } else {
                        this.authorPfp = `${CONFIG.PFP_PATH}/default.png`
                    }

                    this.fetchAuthorInfo(String(this.authorId));
                })
                .catch(() => {
                    this.$router.push({'name': 'NotFound'})
                })
        },
        fetchAuthorInfo(id: string) {
            this.$http.get('/api/image/posts/', { params: { limit: 3, user: id } })
                .then((response) => {
                    let results = [] as any[];

                    response.data.forEach((data: any) => {
                        let result = {
                            image: `${CONFIG.IMAGE_PATH}/${data.postId}.png`,
                            postPath: `${CONFIG.POST_PATH}/${data.postId}`
                        }

                        results.push(result);
                    })

                    this.otherPosts = results;
                })
        },
        createComment(e: KeyboardEvent) {
            if (e.key === 'Enter' && !e.shiftKey) {
                let currentTarget = e.currentTarget as HTMLInputElement;
                let value = currentTarget.value;
                let postId = this.$route.params.id!;
                let userId = localStorage.getItem('id');

                let postComment = {
                    postId: postId,
                    userId: userId,
                    date: new Date(),
                    content: value,
                }

                this.$http.post(`/api/image/posts/${this.$route.params.id!}/comments`, postComment)

                let hasPfp = localStorage.getItem('profilePic') ? true : false;

                let comment = new CommentModel(localStorage.getItem('user')!, userId!, new Date(), value, hasPfp);

                this.comments.unshift(comment);

                e.preventDefault();

            }
        },
        fetchComments(id: string) {
            this.$http.get(`/api/image/posts/${id}/comments`)
                .then((response) => {
                    response.data.forEach((data: any) => {
                        let comment = new CommentModel(data.userName, data.userId, new Date(data.date), data.content, data.hasProfile);

                        this.comments.push(comment);
                    })
                })
        },
        getIcon() {
            let path = ''
            if (localStorage.getItem('profilePic')) {
                path = localStorage.getItem('profilePic')!
            } else {
                path = `${CONFIG.PFP_PATH}/default.png`
            }

            return path
        }
    },
    components: {
        Comment,
        InfoContainer,
        TextAreaVue
    },
    mounted() {
        this.fetchPost(String(this.$route.params.id!));
        this.fetchComments(String(this.$route.params.id!));

        // TODO: Rely state checking by user store instead, shouldnt do another session check when
        // its already being done once.
        this.$http.get('/session')
            .then((response) => {
                if (response.status == 200) {
                    this.$data.loggedIn = true;

                    nextTick()
                        .then(() => {
                            let commentInput = document.getElementById('commentInput');

                            if (commentInput) {
                                commentInput.addEventListener('keypress', this.createComment);
                            }
                        })
                }
            })
            .catch((error) => {
                // Catch to silent console error
            })
    }
}
</script>

<template>
    <div class="flex-container row">
        <main class="main-container">
            <section class="img-container">
                <img class="img-container" :src="path" alt="Generic Art">
            </section>
            <div class="desc-container">
                <section class="row-md">
                    <h2>{{ $data.title }}</h2>
                </section>
                <div class="row-md">
                    {{ $data.description }}<span class="comment-date">{{ $data.postUpload.toLocaleString() }}</span>
                </div>
            </div>
            <div class="comments-container">
                <div>
                    <h3>Comments</h3>
                </div>
                <div class="comment-parent">
                    <div class="comment-pfp">
                        <img class="comment-pfp" :src="getIcon()" alt="pfp">
                    </div>
                    <TextAreaVue v-if="loggedIn" placeholder="Post a comment..." id="commentInput" :disabled="false" />
                    <TextAreaVue v-else placeholder="You must be logged in to post a comment" :disabled="true" />
                </div>
                <Comment v-for="comment in comments" :user-name="comment.author" :profile-pic="comment.getProfilePath()"
                    :comment-content="comment.content" :date="comment.getDateString()" />
            </div>
        </main>
        <InfoContainer :user-name=$data.authorName :profile-pic=$data.authorPfp :mini-posts="$data.otherPosts" />
    </div>
</template>