<script lang="ts">
import Comment from "./partials/Comment.vue"
import InfoContainer from "./partials/InfoContainer.vue";

export default {
  components: {
    Comment,
    InfoContainer
  }
}
</script>

<template>
    <div class="flex-container row">
        <main class="main-container">
            <section class="img-container">
                <img class="img-container"
                    src="https://3.bp.blogspot.com/-afaf52oOnoo/TbebbzSOKlI/AAAAAAAAALw/9GZLtjzYh6M/s1600/e2cd6ef9a92344428afbbdc36a3eea44.jpg"
                    alt="Generic Art">
            </section>
            <div class="desc-container">
                <section class="row-md">
                    <h2>Generic Art</h2>
                </section>
                <div class="row-md">
                    I love this generic art <span class="comment-date">Tue, 25 Oct 2022 20:12:45</span>
                </div>
            </div>
            <div class="comments-container">
                <div>
                    <h3>Comments</h3>
                </div>
                <Comment user-name="Me"
                 profile-pic="https://theater.miriondb.com/icons/017kth0343_0.png"
                 comment-content="Very Cool"
                 date="Tue, 25 Oct 2022 20:12:50"/>
                 <Comment user-name="You"
                 profile-pic="https://theater.miriondb.com/icons/017kth0343_0.png"
                 comment-content="Awesome"
                 date="Tue, 25 Oct 2022 20:12:45"/>
                 <Comment user-name="Them"
                 profile-pic="https://theater.miriondb.com/icons/017kth0343_0.png"
                 comment-content="Bad >:("
                 date="Tue, 25 Oct 2022 20:12:30"/>
            </div>
        </main>
        <InfoContainer 
          user-name="AliceBob20"
          profile-pic="https://theater.miriondb.com/icons/017kth0343_0.png"/>
    </div>
</template>