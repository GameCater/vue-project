<template>
    <dl class="card">
        <dt class="card-header">LoginView</dt>
        <dd class="card-body">
            <input type="text">
        </dd>
    </dl>
</template>

<script>
    export default {
        name: "LoginView",
        data() {
            return {}
        },
        computed: {},
        watch: {},
        methods: {},
        components: {},
        created() {

        },
        /*组件内的守卫*/
        beforeRouteLeave(to, from, next) {  //判断当前路由离开时触发 函数
            
            if (confirm("你确定要离开吗?")) {  //当前确定后,才进入下一跳
                next()
            }
        }
    }
</script>

<style scoped lang="scss">

</style>