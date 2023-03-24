<template>
    <div style="border-radius: 15px" class="footer pt-1 text-center d-flex justify-content-around">
        <button @click.prevent="index" class="btn menu p-2"><i class="fad fa-home icon"></i><br>Beranda</button>
        <button @click.prevent="receives" class="btn menu p-2"><i class="fad fa-box-open icon"></i><br>Receive</button>
        <button @click.prevent="historyList" class="btn menu p-2"><i class="fad fa-file-lines icon"></i><br>Opname</button>
    </div>
</template>

<script>
export default {
    name: "Menu"
}
</script>

<style scoped>
.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: white;
    color: white;
    text-align: center;
    box-shadow: 0px -1px 5px 0px rgba(0,0,0,0.05);
}
.icon {
    font-size: 20px;
}
.menu {
    color: lightslategray;
}
.active {
    color: #FBAB7E;
}
</style>
