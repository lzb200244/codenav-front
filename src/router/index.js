import {
    createRouter, createWebHistory
} from 'vue-router'
import hall from "./hall";
import account from "./account";
import source from "./source";

const routes = [

    {
        path: '',
        redirect: '/index',
        meta: {requiresAuth: false},
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('@/components/index.vue'),
        meta: {
            requiresAuth: false,
            title: '首页 - 做IT人只做搬运',
            content: {
                keywords: '',
                description: ''
            }
        },


    },
    {
        //404匹配
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/components/index.vue'),

    },
    /**
     * 用户
     */
    ...account,
    /**
     * 资源
     */
    ...source,

    /**
     *大厅
     */
    ...hall,


];

//router实例
const router = createRouter({
    history: createWebHistory('/'),
    routes: routes,
})

export default router;
