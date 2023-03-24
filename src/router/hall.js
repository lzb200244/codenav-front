export default [
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
            {
                path: 'circle',
                name: 'circle',
                component: () => import('@/components/hall/views/Circle.vue'),

            },
            {
                path: 'stimulate',
                name: 'stimulate',
                component: () => import('@/components/hall/views/Stimulate.vue'),

            },
        ]

    },
]