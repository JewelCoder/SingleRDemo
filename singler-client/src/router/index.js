import {createRouter,createWebHashHistory} from 'vue-router'
const routes = [
    {path:'/',redirect:'/patstatistics'},
    {
        path:'/patstatistics',
        name:'patstatistics',
        component:() => import(/*webpackChunkName:"diagrams"*/'../views/diagrams/patstatistics.vue'),
        meta:{
            title:'患者统计展示'
        }
    },
    {
        path:'/chat',
        name:'chat',
        component:() => import(/*webpackChunkName:"chat"*/'../views/chat.vue')
    }
]

const  route = createRouter({
    history:createWebHashHistory(process.env.BASE_URL),
    routes
})

export default route