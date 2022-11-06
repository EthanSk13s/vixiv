<script lang="ts">
import InfoContainer from '@/components/partials/InfoContainer.vue';
import { stringifyQuery } from 'vue-router';
import ThumbnailPost from './partials/ThumbnailPost.vue';

export default {
    data() {
        return {
            latestPosts: [] as { title: any; authorName: any; path: string; postPath: string }[]
        }
    },
    components: {
        InfoContainer,
        ThumbnailPost
    },
    methods: {
        getLatestPosts() {
            this.$http.get('/api/image/posts/')
                .then((response) => {
                    let posts: { title: any; authorName: any; path: string; postPath: string }[] = []
                    response.data.data.forEach((element: any) => {
                        let post = {
                            title: element.title,
                            authorName: element.authorName,
                            path: `/public/storage/images/${element.postId}.png`,
                            postPath: `/post/${element.postId}`
                        }

                        posts.push(post);
                    });
                    this.latestPosts = posts;
                })
        }
    },
    mounted() {
        this.getLatestPosts()
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
                    <ThumbnailPost v-for="post in latestPosts" 
                        :author="post.authorName"
                        authorPfp="https://theater.miriondb.com/card_bg/029umi0314_0.png"
                        :title="post.title" 
                        :image="post.path"
                        :postPath="post.postPath"/>
                </div>
                <div>
                    <h2>Your Posts</h2>
                </div>
                <div class="flex-container row post-flex">
                    <ThumbnailPost author="AliceBob20" authorPfp="https://theater.miriondb.com/icons/017kth0343_0.png" 
                        title="Cuteoha" image="https://theater.miriondb.com/card_bg/017kth0054_0.png"/>
                    <ThumbnailPost author="AliceBob20" authorPfp="https://theater.miriondb.com/icons/017kth0343_0.png" 
                        title="Cuteoha 2" image="https://theater.miriondb.com/card_bg/017kth0124_0.png"/>
                    <ThumbnailPost author="AliceBob20" authorPfp="https://theater.miriondb.com/icons/017kth0343_0.png" 
                        title="Cuteoha 3" image="https://theater.miriondb.com/card_bg/017kth0154_0.png"/>
                    <ThumbnailPost author="AliceBob20" authorPfp="https://theater.miriondb.com/icons/017kth0343_0.png" 
                        title="Cuteoha 4" image="https://theater.miriondb.com/card_bg/017kth0174_1.png"/>
                </div>
            </section>
        </main>
        <div id="counter" class="flex-container column">

        </div>
    </div>
</template>