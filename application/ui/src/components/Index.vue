<script lang="ts">
import InfoContainer from '@/components/partials/InfoContainer.vue';
import ThumbnailPost from './partials/ThumbnailPost.vue';

export default {
    data() {
        return {
            latestPosts: [] as { title: any; authorName: any; path: string; postPath: string }[],
            userPosts: [] as { title: any; authorName: any; path: string; postPath: string }[]
        }
    },
    components: {
        InfoContainer,
        ThumbnailPost
    },
    methods: {
        getLatestPosts() {
            this.$http.get('/api/image/posts/', {params: {limit: 15}})
                .then((response) => {
                    let posts: { title: any; authorName: any; path: string; postPath: string }[] = []
                    response.data.forEach((element: any) => {
                        let post = {
                            title: element.title,
                            authorName: element.authorName,
                            path: `/public/storage/thumbnails/${element.postId}.jpg`,
                            postPath: `/post/${element.postId}`
                        }

                        posts.push(post);
                    });
                    this.latestPosts = posts;
                })
        },
        getUserPosts() {
            this.$http.get('/api/image/posts/', {params: {limit: 15, user: localStorage.getItem('id')}})
                .then((response) => {
                    let posts: { title: any; authorName: any; path: string; postPath: string }[] = []
                    response.data.forEach((element: any) => {
                        let post = {
                            title: element.title,
                            authorName: element.authorName,
                            path: `/public/storage/thumbnails/${element.postId}.jpg`,
                            postPath: `/post/${element.postId}`
                        }

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
                    <ThumbnailPost v-if="latestPosts" v-for="post in latestPosts" 
                        :author="post.authorName"
                        authorPfp="https://theater.miriondb.com/card_bg/029umi0314_0.png"
                        :title="post.title" 
                        :image="post.path"
                        :postPath="post.postPath"/>
                </div>
                <div v-if="userPosts.length != 0">
                    <h2>Your Posts</h2>
                </div>
                <div class="flex-container row post-flex">
                    <ThumbnailPost v-if="userPosts.length != 0" v-for="post in userPosts" 
                        :author="post.authorName"
                        authorPfp="https://theater.miriondb.com/card_bg/029umi0314_0.png"
                        :title="post.title" 
                        :image="post.path"
                        :postPath="post.postPath"/>
                </div>
            </section>
        </main>
        <div id="counter" class="flex-container column">

        </div>
    </div>
</template>