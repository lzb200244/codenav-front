export default [
    {
        path: '/hall',
        name: 'hall',
        redirect: '/hall/chat',
        meta: {
            requiresAuth: true, title: '大厅-搬运工',
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
                meta: {
                    requiresAuth: false, title: '排行榜 | 英雄榜',

                },
                component: () => import('@/components/hall/views/rank.vue'),
            },
            {
                path: 'chat',
                name: 'chat',
                meta: {
                    requiresAuth: true, title: '问答',
                },
                component: () => import('@/components/hall/views/chatGroup.vue'),
            },
            {
                path: 'circle',
                name: 'circle',
                meta: {
                    requiresAuth: true, title: '圈子',
                },
                component: () => import('@/components/hall/views/Circle.vue'),

            },
            {
                path: 'stimulate',
                name: 'stimulate',
                meta: {
                    requiresAuth: true, title: '兑换激励',
                },
                component: () => import('@/components/hall/views/Stimulate.vue'),

            },
            {
                path: 'order',
                name: 'order',
                meta: {
                    requiresAuth: true, title: '订单详查',
                },
                component: () => import('@/components/hall/views/Order.vue'),
            },
        ]

    },
]