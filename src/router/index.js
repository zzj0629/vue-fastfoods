import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login/login'
import count from '../views/login/count'
import userMenu from '../views/userMenu/userIndex'
import adminMenu from '../views/adminMenu/adminIndex'
import userManage from '../views/adminModule/userManage/userManage'
import addAdmin from '../views/adminModule/adminManage/addAdmin'
import adminManage from '../views/adminModule/adminManage/adminManage'
import addCategory from "@/views/adminModule/commodityCategory/addCategory";
import lookCategory from "@/views/adminModule/commodityCategory/lookCategory";
import addCommodity from "@/views/adminModule/commodityManage/addCommodity";
import lookCommodity from "@/views/adminModule/commodityManage/lookCommodity";
import orderManage from "@/views/adminModule/orderManage/orderManage";
import index from "../views/index"

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/count',
    name: 'count',
    component: count
  },
  {
    path: '/userMenu',
    name: 'userMenu',
    component: userMenu
  },
  {
    path: '/adminMenu',
    name: 'adminMenu',
    component: adminMenu,
    children:[
        {
        path: 'userManage',
        name: 'userManage',
        component: userManage
      },{
        path: 'addAdmin',
        name: 'addAdmin',
        component: addAdmin
      },{
        path: 'adminManage',
        name: 'adminManage',
        component: adminManage
      },{
        path: 'addCategory',
        name: 'addCategory',
        component: addCategory
      },{
        path: 'lookCategory',
        name: 'lookCategory',
        component: lookCategory
      },{
        path: 'addCommodity',
        name: 'addCommodity',
        component: addCommodity
      },{
        path: 'lookCommodity',
        name: 'lookCommodity',
        component: lookCommodity
      },{
        path: 'orderManage',
        name: 'orderManage',
        component: orderManage
      },{
        path: 'index',
        name: 'index',
        component: index
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
