import Layout from '@/layouts';

const commodityDetail = {
    path: '/commodityDetail',
    redirect: '/commodityDetail/index',
    component: Layout,
    meta: {
        keepAlive: false
    },
    children: [{
            path: 'index',
            name: 'detailIndex',
            component: () =>
                import ('@/views/commodityDetail/index/index'),
            meta: { title: '', keepAlive: false }
        },
        {
            path: 'idOrder',
            name: 'idOrder',
            component: () =>
                import ('@/views/commodityDetail/order/index'),
            meta: { title: '', keepAlive: false }
        },
    ]
}
export default commodityDetail
