<script lang="ts">
import InfoContainer from '@/components/partials/InfoContainer.vue';
import ThumbnailPost from './partials/ThumbnailPost.vue';

export default {
    components: {
        InfoContainer,
        ThumbnailPost
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
                    <ThumbnailPost author="XD" authorPfp="https://theater.miriondb.com/card_bg/029umi0314_0.png" 
                        title="umimi" image="https://theater.miriondb.com/card_bg/029umi0314_0.png"/>
                    <ThumbnailPost author="XD" authorPfp="https://theater.miriondb.com/card_bg/029umi0314_0.png" 
                        title="umimi" image="https://theater.miriondb.com/card_bg/029umi0314_0.png"/>
                    <ThumbnailPost author="XD" authorPfp="https://theater.miriondb.com/card_bg/029umi0314_0.png" 
                        title="umimi" image="https://theater.miriondb.com/card_bg/029umi0314_0.png"/>
                    <ThumbnailPost author="XD" authorPfp="https://theater.miriondb.com/card_bg/029umi0314_0.png" 
                        title="umimi" image="https://theater.miriondb.com/card_bg/029umi0314_0.png"/>
                    <ThumbnailPost author="XD" authorPfp="https://theater.miriondb.com/card_bg/029umi0314_0.png" 
                        title="umimi" image="https://theater.miriondb.com/card_bg/029umi0314_0.png"/>
                    <ThumbnailPost author="XD" authorPfp="https://theater.miriondb.com/card_bg/029umi0314_0.png" 
                        title="umimi" image="https://theater.miriondb.com/card_bg/029umi0314_0.png"/>
                    <ThumbnailPost author="XD" authorPfp="https://theater.miriondb.com/card_bg/029umi0314_0.png" 
                        title="umimi" image="https://theater.miriondb.com/card_bg/029umi0314_0.png"/>
                    <ThumbnailPost author="XD" authorPfp="https://theater.miriondb.com/card_bg/029umi0314_0.png" 
                        title="umimi" image="https://theater.miriondb.com/card_bg/029umi0314_0.png"/>
                    <ThumbnailPost author="XD" authorPfp="https://theater.miriondb.com/card_bg/029umi0314_0.png" 
                        title="umimi" image="https://theater.miriondb.com/card_bg/029umi0314_0.png"/>
                    <ThumbnailPost author="XD" authorPfp="https://theater.miriondb.com/card_bg/029umi0314_0.png" 
                        title="umimi" image="https://theater.miriondb.com/card_bg/029umi0314_0.png"/>
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