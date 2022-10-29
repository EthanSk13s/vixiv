<script lang="ts">
    export default {
        props: {
            userName: String,
            profilePic: String,
            commentContent: String,
            date: String
        }
    }
</script>

<template>
    <div class="comment">
        <div class="comment-pfp">
            <img class="comment-pfp" :src=profilePic alt="pfp">
        </div>
        <div class="comment-content">
            <div>
                <b>{{ userName }}</b> <span class="comment-date">{{ date }}</span>
            </div>
            <div>
                {{ commentContent }}
            </div>
        </div>
    </div>
</template>
