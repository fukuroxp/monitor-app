<template>
    <div class="container">
        <div class="header">
        </div>


        <div class="row pl-3 pr-3 mb-2 text-secondary">
            <div class="col-6">
                <h4><i class="fad fa-box"> </i> <b>LOGISTICS</b></h4>
            </div>
            <div class="col-6 text-end">
                <img class="img-fluid" style="max-height: 25px;" :src="asset('/logos/track.png')">
            </div>
        </div>

        <div class="col-12">
            <div class="form-group mb-2">
                <label for="example1">Vendor</label>
                <div class="shadow-sm form-control border-0">
                    <select class="form-control w-100 select2" style="border: 0 !important;">
                        <option>Pilih Vendor</option>
                        <option v-for="vendor in collections.vendors">{{ vendor.name}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group mb-2">
                <label for="example1">Material</label>
                <div class="shadow-sm form-control border-0">
                    <select class="form-control select2">
                        <option>Pilih Item</option>
                        <option v-for="item in collections.items">{{ item.itemdescription}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group mb-2">
                <label for="example1">Nopol</label>
                <input type="text" class="form-control border-0 shadow-sm" placeholder="Masukan Nomor Kendaraan">
            </div>
            <div class="form-group mb-2">
                <label for="example1">Volume</label>
                <input type="text" class="form-control border-0 shadow-sm" placeholder="Volume Barang">
            </div>
            <div class="form-group mb-2">
                <label for="example1">Keterangan</label>
                <textarea class="form-control border-0 shadow-sm"></textarea>
            </div>


        </div>
        <label>Foto</label>
        <Camera></Camera>

        <div class="col-12 text-end mt-4">
            <button class="btn btn-success shadow-sm">
                <i class="fa fa-check"></i>
                Simpan</button>
        </div>

        <div class="m-4 p-4"></div>
       <Menu></Menu>

    </div>
</template>

<script>
import Menu from "@/src/components/Menu.vue";
import $ from "jquery";
import Camera from "@/src/components/Camera.vue";

export default {
    name: "Receive",
    components: {Camera, Menu},
    data() {
        return {
            collections: {
                projects: [],
                items: [],
                vendors: [],
            },
            isCameraOpen: false,
            isPhotoTaken: false,
            isShotPhoto: false,
            isLoading: false,
            link: '#',
        }
    },
    mounted() {
        $('.select2').select2({
            theme: "bootstrap-5",
            dropdownParent: $(".select2").parent(),
        });
    },
    methods: {
        asset(path){
            return `${BASEURL}${path}`
        },

        toggleCamera() {
            if(this.isCameraOpen) {
                this.isCameraOpen = false;
                this.isPhotoTaken = false;
                this.isShotPhoto = false;
                this.stopCameraStream();
            } else {
                this.isCameraOpen = true;
                this.createCameraElement();
            }
        },
        createCameraElement() {
            this.isLoading = true;

            const constraints = (window.constraints = {
                audio: false,
                video: true
            });


            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => {
                    this.isLoading = false;
                    this.$refs.camera.srcObject = stream;
                })
                .catch(error => {
                    this.isLoading = false;
                    alert("May the browser didn't support or there is some errors.");
                });
        },

        stopCameraStream() {
            let tracks = this.$refs.camera.srcObject.getTracks();

            tracks.forEach(track => {
                track.stop();
            });
        },

        takePhoto() {
            if(!this.isPhotoTaken) {
                this.isShotPhoto = true;

                const FLASH_TIMEOUT = 50;

                setTimeout(() => {
                    this.isShotPhoto = false;
                }, FLASH_TIMEOUT);
            }

            this.isPhotoTaken = !this.isPhotoTaken;

            const context = this.$refs.canvas.getContext('2d');
            context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
        },

        downloadImage() {
            const download = document.getElementById("downloadPhoto");
            const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg")
                .replace("image/jpeg", "image/octet-stream");
            download.setAttribute("href", canvas);
        }
    }
}
</script>

<style scoped>
.header {
    clip-path: polygon(0 0, 100% 0, 100% 57%, 36% 29%, 48% 49%, 0 61%);
    height: 300px;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: -12;
    background-color: #FBAB7E;
    background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
}
.box-camera {
    height: 180px;
    max-width: 100%;
    border-radius: 15px;
    background: #FFFFFF !important;
    border: 0;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.10);
}
.has-search .form-control {
    padding-left: 2.375rem;
}

.has-search .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 3.175rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
    top: -2px;
}
.count .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    top: 0px;
    text-align: center;
    pointer-events: none;
    color: #fff;
    border-radius: 5px;
}
</style>

<style lang="scss">
body {
    display: flex;
    justify-content: center;
}

.web-camera-container {
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;


    .camera-button {
        margin-bottom: 2rem;
    }

    .camera-box {
        .camera-shutter {
            opacity: 0;
            width: 450px;
            height: 337.5px;
            background-color: #fff;
            position: absolute;

            &.flash {
                opacity: 1;
            }
        }
    }

    .camera-shoot {
        margin: 1rem 0;

        button {
            height: 60px;
            width: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;

            img {
                height: 35px;
                object-fit: cover;
            }
        }
    }

    .camera-loading {
        overflow: hidden;
        height: 100%;
        position: absolute;
        width: 100%;
        min-height: 150px;
        margin: 3rem 0 0 -1.2rem;

        ul {
            height: 100%;
            position: absolute;
            width: 100%;
            z-index: 999999;
            margin: 0;
        }

        .loader-circle {
            display: block;
            height: 14px;
            margin: 0 auto;
            top: 50%;
            left: 100%;
            transform: translateY(-50%);
            transform: translateX(-50%);
            position: absolute;
            width: 100%;
            padding: 0;

            li {
                display: block;
                float: left;
                width: 10px;
                height: 10px;
                line-height: 10px;
                padding: 0;
                position: relative;
                margin: 0 0 0 4px;
                background: #999;
                animation: preload 1s infinite;
                top: -50%;
                border-radius: 100%;

                &:nth-child(2) {
                    animation-delay: .2s;
                }

                &:nth-child(3) {
                    animation-delay: .4s;
                }
            }
        }
    }

    @keyframes preload {
        0% {
            opacity: 1
        }
        50% {
            opacity: .4
        }
        100% {
            opacity: 1
        }
    }
}
</style>
