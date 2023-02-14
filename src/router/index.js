import {
    createRouter, createWebHistory
} from 'vue-router'

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
        meta: {requiresAuth: false},


    },
    {
        path: '/source',
        name: 'source',
        component: () => import('@/components/source/source.vue'),
        meta: {requiresAuth: false},
        children: [
            {
                path: '/type/:type',
                name: 'type',
                component: () => import('@/components/source/source.vue'),
                meta: {requiresAuth: false},
            }
        ]
    },

    {
        path: '/detail/:uid',
        name: 'detail',
        meta: {requiresAuth: false},
        component: () => import('@/components/detail.vue'),
    },
    {
        path: '/recommends',
        name: 'recommends',
        meta: {requiresAuth: false},
        redirect: '/account/recommend',
    },
    {
        path: '/register',
        name: 'register',
        meta: {requiresAuth: false},
        component: () => import('@/components/account/register.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/account/login.vue'),
        meta: {requiresAuth: false,},
    },
    /**
     *大厅
     */
    {
        path: '/hall',
        name: 'hall',
        meta: {requiresAuth: false},
        component: () => import('@/components/hall/hall.vue'),
        children: [
            {
                path: 'rank',
                name: 'rank',

                component: () => import('@/components/hall/views/rank.vue'),

            },
        ]

    },


    {
        path: '/account',
        name: 'account',

        component: () => import('@/components/manage/account.vue'),
        redirect: '/account/person',
        meta: {requiresAuth: true,},
        children: [
            {
                path: 'person',
                name: 'person',

                component: () => import('@/components/manage/account/person.vue'),

            },
            {
                path: 'collect',
                name: 'collect',
                component: () => import('@/components/manage/account/collect.vue'),
            },
            {
                path: 'recommend',
                name: 'recommend',
                component: () => import('@/components/manage/account/recommend.vue'),
            },
            {
                path: 'inform',
                name: 'inform',
                component: () => import('@/components/manage/account/inform.vue'),

            },
        ]
    },
    {
        //404匹配
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/components/index.vue'),

    },
];

//router实例
const router = createRouter({
    history: createWebHistory('/'),
    routes: routes,
})

export default router;
