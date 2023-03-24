<template>
    <div class="container">
        <div class="header">
        </div>


        <div class="row pl-3 pr-3 mb-2 text-secondary">
            <div class="col-6">
                <h4><i class="fas fa-box"> </i> <b>LOGISTICS</b></h4>
            </div>
            <div class="col-2">

            </div>
            <div class="col-3">
            </div>
        </div>

        <div class="col-12">
            <h4 class="mb-2"><span class="badge badge-secondary text-white">Menu</span></h4>
            <div>
                <div class="row d-flex justify-content-center p-0">
                    <div v-for="(row, index) in model.categoryitems" :key="index" @click.prevent="menu(row.alias)" class="box card col-5 m-2 pt-4 text-center count">
                        <div class="form-control-feedback">
                            <img class="img-fluid" style="max-height: 30px;" :src="asset('/logos/'+row.unit+'.png')">
                        </div>
                        <div @click.prevent="menu(row.alias)" class="col-12">
                            <i :class="row.icon" :style="{ color: row.color }" class="icon-menu mb-4 mt-2"></i>
                            <b>{{ row.name }}</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="m-4 p-4"></div>
        <Menu></Menu>
    </div>
</template>

<script>
import Menu from "@/src/components/Menu.vue";

window.BASEURL=''
export default {
    name: "Index",
    components: {Menu},
    data(){
        return{
            model: {
                keyword:'',
                categoryitems: [
                    {
                        name:'Receive',
                        alias:'receives',
                        icon:'fad fa-box-open',
                        unit:'track',
                        color:'#FBAB7E'
                    },
                    {
                        name:'Progress',
                        alias:'monitorings',
                        icon:'fad fa-chart-line',
                        unit:'fast',
                        color:'#0018a9'
                    },
                ]
            },
        }
    },
    mounted() {

    },
    methods: {
        asset(path){
            return `${BASEURL}${path}`
        },
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
    background: linear-gradient(135deg, hsla(209, 100%, 67%, 1) 0%, hsla(279, 100%, 50%, 1) 100%);
}
.box {
    height: 180px;
    max-width: 180px;
    border-radius: 15px;
    border: 0;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.10);
}

.icon-menu {
    font-size: 50px;
    color: #FBAB7E;
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
    height: 20px;
    line-height: 1rem;
    top: -10px;
    left: -10px;
    text-align: center;
    pointer-events: none;
    color: #fff;
    border-radius: 5px;
}
</style>
