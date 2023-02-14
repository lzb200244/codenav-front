import message from '@/utils/messager';
export default {
    data() {
        return {}
    },
    filters: { //过滤器

    },
    created() {

    },
    mounted() {

    },
    computed: {   //计算属性
        loginRequire() {
            return this.require()
        }
    },
    methods: {
        //是否登录
        require() {
            if (!this.$router.currentRoute.value.meta.islogin) {
                message('需要登入哦!', 'warning');
                this.$router.push('/login/');
                return true
            }
            return false;
        }

        // 其它属性方法......
    }
}

