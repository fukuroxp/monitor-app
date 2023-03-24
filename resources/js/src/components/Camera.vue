<template>
    <div class="camera-box justify-content-center">
        <div style="display: flex; justify-content: center;">
            <div @click="toggleCamera" class="text-center" v-if="!isCameraOpen"><i class="fad fa-image text-secondary" style="font-size: 100px"></i></div>
            <div @click="capture" class="text-center" v-if="isCameraOpen" style="position: absolute; bottom: 180px; right: 20px;"><i class="fad fa-camera text-secondary" style="font-size: 50px;"></i></div>
            <div  @click="toggleCamera" v-if="isCameraOpen" style="position: absolute; bottom: 300px; right: 30px;"><i class="fad fa-times" style="font-size: 40px;"></i></div>
        </div>
        <div style="height: 200px">
            <div v-if="isCameraOpen" class="camera-canvas">
                <video ref="camera" :width="canvasWidth" :height="canvasHeight" autoplay></video>
                <canvas v-show="false" id="photoTaken" ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
            </div>
        </div>
        <vue-picture-swipe :items="items"></vue-picture-swipe>
    </div>
</template>

<script>
// import VuePictureSwipe from 'vue-picture-swipe';

export default {
    name: "Camera",
    components: {
        // VuePictureSwipe
    },
    data() {
        return {
            isCameraOpen: false,
            canvasHeight:200,
            canvasWidth:190,
            items: [],
        }
    },
    methods: {
        toggleCamera() {
            if (this.isCameraOpen) {
                this.isCameraOpen = false;
                this.stopCameraStream();
            } else {
                this.isCameraOpen = true;
                this.startCameraStream();
            }
        },
        startCameraStream() {
            const constraints = (window.constraints = {
                audio: false,
                video: true
            });
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => {
                    this.$refs.camera.srcObject = stream;
                }).catch(error => {
                alert("Browser doesn't support or there is some errors." + error);
            });
        },

        stopCameraStream() {
            let tracks = this.$refs.camera.srcObject.getTracks();
            tracks.forEach(track => {
                track.stop();
            });
        },

        capture() {
            const FLASH_TIMEOUT = 50;
            let self = this;
            setTimeout(() => {
                const context = self.$refs.canvas.getContext('2d');
                context.drawImage(self.$refs.camera, 0, 0, self.canvasWidth, self.canvasHeight);
                const dataUrl = self.$refs.canvas.toDataURL("image/jpeg")
                    .replace("image/jpeg", "image/octet-stream");
                self.addToPhotoGallery(dataUrl);
                self.uploadPhoto(dataUrl);
                self.isCameraOpen = false;
                self.stopCameraStream();
            }, FLASH_TIMEOUT);
        },

        addToPhotoGallery(dataURI) {
            this.items.push(
                {
                    src: dataURI,
                    thumbnail: dataURI,
                    w: this.canvasWidth,
                    h: this.canvasHeight,
                    alt: 'some numbers on a grey background' // optional alt attribute for thumbnail image
                }
            )
        },
        uploadPhoto(dataURL){
            let uniquePictureName = this.generateCapturePhotoName();
            let capturedPhotoFile = this.dataURLtoFile(dataURL, uniquePictureName+'.jpg')
            let formData = new FormData()
            formData.append('file', capturedPhotoFile)
            // Upload image api
            // axios.post('http://your-url-upload', formData).then(response => {
            //   console.log(response)
            // })
        },

        generateCapturePhotoName(){
            return  Math.random().toString(36).substring(2, 15)
        },

        dataURLtoFile(dataURL, filename) {
            let arr = dataURL.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type: mime});
        },
    }
}
</script>

<style scoped>
.camera-box {
    height: 180px;
    max-width: 100%;
    border-radius: 15px;
    background: #FFFFFF !important;
    border: 0;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.10);
}

</style>
