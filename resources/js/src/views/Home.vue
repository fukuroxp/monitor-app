<template>
    <div class="col-12 bg-danger">
        <h3>Test select2</h3>
        <select class="select2 form-control">
            <option>Pilih data</option>
            <option v-for="item in items">{{ item.message }}</option>
        </select>
    </div>
</template>

<script>
window.BASEURL=''
import $ from 'jquery';
window.$ = $;
import { onMounted, ref } from 'vue';
import select2 from 'select2';
select2();
export default {
    name: "Home",
    data() {
        return {
            items: [{ message: 'Foo' }, { message: 'Bar' }]
        }
    },
    mounted() {
        $('.select2').select2();
    },
    methods:{
        select2(){
            $('.select2').select2();
        }
    }
}
</script>

<style scoped>

</style>
