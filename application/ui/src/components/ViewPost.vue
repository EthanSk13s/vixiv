<script lang="ts">
import Comment from "./partials/Comment.vue"
import InfoContainer from "./partials/InfoContainer.vue";
import TextAreaVue from "./partials/TextArea.vue";

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
            comments: [] as { userName: any; date: any; content: string; pfp: string }[],
            otherPosts: [] as { image: any; postPath: string; }[]
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
                    this.path = `/public/storage/images/${id}.png`

                    if (data.hasProfile) {
                        this.authorPfp = `/public/storage/profiles/${this.authorId}.png`
                    } else {
                        this.authorPfp = `/public/storage/profiles/default.png`
                    }

                    this.fetchAuthorInfo(String(this.authorId));
                })
        },
        fetchAuthorInfo(id: string) {
            this.$http.get('/api/image/posts/', { params: { limit: 3, user: id } })
                .then((response) => {
                    let results = [] as any[];

                    response.data.forEach((data: any) => {
                        let result = {
                            image: `/public/storage/images/${data.postId}.png`,
                            postPath: `/post/${data.postId}`
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

                let comment = {
                    postId: postId,
                    userId: userId,
                    userName: localStorage.getItem('user'),
                    date: new Date(),
                    content: value,
                    pfp: localStorage.getItem('profilePic')!
                }

                this.$http.post(`/api/image/posts/${this.$route.params.id!}/comments`, comment)

                this.comments.unshift(comment);

                e.preventDefault();

            }
        },
        fetchComments(id: string) {
            this.$http.get(`/api/image/posts/${id}/comments`)
                .then((response) => {
                    response.data.forEach((data: any) => {
                        let comment = {
                            userName: data.userName,
                            date: new Date(data.date),
                            content: data.content,
                            pfp: ''
                        }

                        if (data.hasProfile) {
                            comment.pfp = `/public/storage/profiles/${data.userId}.png`
                        } else {
                            comment.pfp = `/public/storage/profiles/default.png`
                        }


                        this.comments.push(comment);
                    })
                })
        },
        getIcon() {
            return localStorage.getItem('profilePic')!
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

        let commentInput = document.getElementById('commentInput');

        commentInput?.addEventListener('keypress', this.createComment);
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
                    {{ $data.description }}<span class="comment-date">{{ $data.postUpload }}</span>
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
                    <TextAreaVue placeholder="Post a comment..." id="commentInput" />
                </div>
                <Comment v-for="comment in comments" :user-name="comment.userName" :profile-pic="comment.pfp"
                    :comment-content="comment.content" :date="comment.date" />
            </div>
        </main>
        <InfoContainer :user-name=$data.authorName :profile-pic=$data.authorPfp :mini-posts="$data.otherPosts" />
    </div>
</template>