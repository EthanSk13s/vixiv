<script lang="ts">
import InfoContainer from '@/components/partials/InfoContainer.vue';
import ThumbnailPost from './partials/ThumbnailPost.vue';

import { MiniPostModel }from '@/models';
import { CONFIG } from '../../../config';

export default {
    data() {
        return {
            latestPosts: [] as MiniPostModel[],
            userPosts: [] as MiniPostModel[]
        }
    },
    components: {
        InfoContainer,
        ThumbnailPost
    },
    methods: {
        getLatestPosts() {
            this.$http.get('/api/image/posts/', { params: { limit: CONFIG.LATEST_POST_LIMIT } })
                .then((response) => {
                    let posts: MiniPostModel[] = []
                    response.data.forEach((element: any) => {
                        let post = new MiniPostModel(element.title, element.authorName, element.postId, element.hasProfile, element.authorId);

                        posts.push(post);
                    });
                    this.latestPosts = posts;
                })
        },
        getUserPosts() {
            let userId = localStorage.getItem('id');
            this.$http.get('/api/image/posts/', { params: { limit: CONFIG.USER_POST_LIMIT, user: userId } })
                .then((response) => {
                    let posts: MiniPostModel[] = []
                    response.data.forEach((element: any) => {
                        let post = new MiniPostModel(element.title, element.authorName, element.postId, element.hasProfile, element.authorId);

                        posts.push(post);
                    });
                    this.userPosts = posts;
                })
        }
    },
    mounted() {
        this.getLatestPosts();

        if (localStorage.getItem('id')) {
            this.getUserPosts();
        }
    }
}
</script>

<template>
    <div class="container">
        <main>
            <section class="flex-container column">
                <h1>Welcome to Some Image Viewer</h1>
                <div>
                    <h2>Latest Posts</h2>
                </div>
                <div class="flex-container row post-flex">
                    <ThumbnailPost v-if="latestPosts" v-for="post in latestPosts" :author="post.authorName"
                        :authorPfp="post.getProfilePath()" :title="post.title"
                        :image="post.getThumbnailPath()" :postPath="post.getPostPath()" />
                </div>
                <div v-if="userPosts.length != 0">
                    <h2>Your Posts</h2>
                </div>
                <div class="flex-container row post-flex">
                    <ThumbnailPost v-if="userPosts.length != 0" v-for="post in userPosts" :author="post.authorName"
                        :authorPfp="post.getProfilePath()" :title="post.title"
                        :image="post.getThumbnailPath()" :postPath="post.getPostPath()" />
                </div>
            </section>
        </main>
        <div id="counter" class="flex-container column">

        </div>
    </div>
</template>