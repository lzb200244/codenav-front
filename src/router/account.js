export default [
    {
        path: '/account',
        name: 'account',

        component: () => import('@/components/manage/account.vue'),
        redirect: '/account/person',
        meta: {
            requiresAuth: true,
            title: '个人-搬运工',
            content: {
                keywords: '',
                description: ''
            }
        },
        children: [
            {
                path: 'person',
                name: 'person',
                meta: {
                    requiresAuth: true,
                },
                component: () => import('@/components/manage/account/person.vue'),

            },
            {
                path: 'collect',
                name: 'collect',
                meta: {
                    requiresAuth: true,
                },
                component: () => import('@/components/manage/account/collect.vue'),
            },
            {
                path: 'recommend',
                name: 'recommend',
                meta: {
                    requiresAuth: true,
                },
                component: () => import('@/components/manage/account/recommend.vue'),
            },
            {
                path: 'inform',
                name: 'inform',
                meta: {
                    requiresAuth: true,
                },
                component: () => import('@/components/manage/account/inform.vue'),

            },
        ]
    },
    {
        path: '/recommends',
        name: 'recommends',
        meta: {
            requiresAuth: true, title: '用户推荐-搬运工',
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
]