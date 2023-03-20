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
        path: '/source',
        name: 'source',
        component: () => import('@/components/source/source.vue'),
        meta: {
            requiresAuth: false,
            title: '全部资源-搬运工',
            content: {
                keywords: '',
                description: ''
            }
        },
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
        meta: {
            requiresAuth: false,
            title: '详细-搬运工',
            content: {
                keywords: '',
                description: ''
            }
        },
        component: () => import('@/components/detail.vue'),
    },
    {
        path: '/recommends',
        name: 'recommends',
        meta: {
            requiresAuth: false, title: '用户推荐-搬运工',
            content: {
                keywords: '',
                description: ''
            }
        },
        redirect: '/account/recommend',
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            requiresAuth: false, title: '注册-搬运工',
            content: {
                keywords: '',
                description: ''
            }
        },
        component: () => import('@/components/account/register.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/account/login.vue'),
        meta: {
            requiresAuth: false, title: '登录-搬运工',
            content: {
                keywords: '',
                description: ''
            }
        },
    },
    /**
     *大厅
     */
    {
        path: '/hall',
        name: 'hall',
        redirect: '/hall/chat',
        meta: {
            requiresAuth: false, title: '大厅-搬运工',
            content: {
                keywords: '',
                description: ''
            }
        },
        component: () => import('@/components/hall/hall.vue'),
        children: [
            {
                path: 'rank',
                name: 'rank',

                component: () => import('@/components/hall/views/rank.vue'),

            },
            {
                path: 'chat',
                name: 'chat',

                component: () => import('@/components/hall/views/chatGroup.vue'),

            },
        ]

    },


    {
        path: '/account',
        name: 'account',

        component: () => import('@/components/manage/account.vue'),
        redirect: '/account/person',
        meta: {
            requiresAuth: true, title: '个人-搬运工',
            content: {
                keywords: '',
                description: ''
            }
        },
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
