<script lang="ts">
import MiniPost from './MiniPost.vue';

export default {
    props: {
        userName: String,
        profilePic: String
    },

    components: {
        MiniPost
    }
}
</script>

<template>
    <div class="info-container">
        <section class="column-md profile-pic">
            <div>
                <img class="profile-pic" :src=profilePic alt="pfp">
            </div>
        </section>
        <div class="column-md center-text">
            <h2>{{ userName }}</h2>
        </div>
        <div class="center-text">
            <h2>Other Posts</h2>
        </div>
        <div class="column-md mini-post-container">
            <div class="mini-post-container">
                <MiniPost post-link="https://theater.miriondb.com/card/017kth0343_0.png"/>
                <MiniPost post-link="https://theater.miriondb.com/card_bg/017kth0054_0.png"/>
                <MiniPost post-link="https://theater.miriondb.com/card_bg/029umi0314_0.png"/>
            </div>
        </div>
    </div>
</template>