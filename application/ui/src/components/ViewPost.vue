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
            postUpload: new Date(),
            path: ""
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
                    this.postUpload = new Date(data.postUpload);
                    this.path = `/public/storage/images/${id}.png`
                })
        }
    },
    components: {
        Comment,
        InfoContainer,
        TextAreaVue
    },
    mounted() {
        this.fetchPost(String(this.$route.params.id!));
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
                        <img class="comment-pfp" src="https://theater.miriondb.com/icons/017kth0343_0.png" alt="pfp">
                    </div>
                    <TextAreaVue placeholder="Post a comment..."/>
                </div>
                <Comment user-name="Me" profile-pic="https://theater.miriondb.com/icons/017kth0343_0.png"
                    comment-content="Very Cool" date="Tue, 25 Oct 2022 20:12:50" />
                <Comment user-name="You" profile-pic="https://theater.miriondb.com/icons/017kth0343_0.png"
                    comment-content="Awesome" date="Tue, 25 Oct 2022 20:12:45" />
                <Comment user-name="Them" profile-pic="https://theater.miriondb.com/icons/017kth0343_0.png"
                    comment-content="Bad >:(" date="Tue, 25 Oct 2022 20:12:30" />
            </div>
        </main>
        <InfoContainer :user-name=$data.authorName profile-pic="https://theater.miriondb.com/icons/017kth0343_0.png" />
    </div>
</template>