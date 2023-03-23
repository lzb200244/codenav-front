export default [
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
]