import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

// 配置项目路由
export const asyncRoutes = [{
        path: '/',
        redirect: '/creditCard/home'
    },
    {
        path: '/404',
        name: '404',
        component: () =>
            import ('@/error-page/404'),
    },
    { path: '*', redirect: '/creditCard/home', hidden: true }
]

/** 批量导入 */
const contexts = require.context('../views', true, /route\.js$/)
contexts.keys().forEach(key => {
    asyncRoutes.push(contexts(key).default || contexts(key))
})

/** 批量导入 */
const createRouter = () => new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: asyncRoutes
})

const router = createRouter()
router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? to.meta.title : ''
    next()
})
export default router
