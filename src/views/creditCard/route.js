import Layout from '@/layouts';

const creditCard = {
    path: '/creditCard',
    redirect: '/creditCard/home',
    component: Layout,
    meta: {
        keepAlive: false
    },
    children: [{
            path: 'home',
            name: 'ZXHome',
            component: () =>
                import ('@/views/creditCard/home/index'),
            meta: { title: '', keepAlive: false }
        },
        {
            path: 'idOrder',
            name: 'idOrder',
            component: () =>
                import ('@/views/creditCard/order/index'),
            meta: { title: '', keepAlive: false }
        },
    ]
}
export default creditCard
