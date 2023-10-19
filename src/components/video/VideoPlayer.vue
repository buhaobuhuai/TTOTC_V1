<template>
    <div>
        <video ref="videoPlayer" class="video-js"></video>
    </div>
</template>

<script>
    import videojs from 'video.js';
    import "video.js/dist/video-js.css"
    export default {
        name: 'VideoPlayer',
        props: {
            // options: {
            //   type: Object,
            //   default() {
            //     return {};
            //   }
            // },
            showDialog: {
                type: Boolean,
                default: true,
            },
            urls: {
                type: String,
                default: "",
            },
        },
        data() {
            return {
                player: null,
                options: {
                    autoplay: true,
                    controls: true,
                    fluid: true,
                    autoplay: "muted",
                    sources: [{
                        src: "video.mp4",
                        type: 'video/mp4'
                    }]
                }
            }
        },
        mounted() {
            this.player = videojs(this.$refs.videoPlayer, this.options, () => {
                // this.player.log('onPlayerReady', this);
            });
            this.player.src({
                src: this.urls
            });
            // console.log(this.urls, 0)
        },
        beforeDestroy() {
            if (this.player) {
                this.player.dispose();
            }
        },
        methods: {
            handle_src(a) {
                this.player.src({
                    src: a
                });
                // console.log(this.urls, a)
            },
        },

    }
</script>
