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
import userHome from "@/views/userModule/home/userHome";
import userLookCommodity from "@/views/userModule/commodity/userLookCommodity"
import usermenuindex from "../views/usermenuindex"
import commodityDetails from "@/views/userModule/commodity/commodityDetails"
import cart from "@/views/userModule/cart/cart"
import userAddress from "@/views/userModule/userAddress/userAddress"
import orderPreview from "@/views/userModule/cart/orderpreview"
import myOrder from "@/views/userModule/order/myorder"
import orderDetails from "@/views/userModule/order/orderdetails"
import lookUser from "@/views/userModule/user/lookuser"

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
    component: userMenu,
    children: [
      {
        path:'userHome',
        name:userHome,
        component: userHome
      },{
        path: 'userLookCommodity',
        name: 'userLookCommodity',
        component: userLookCommodity
      },{
        path: 'usermenuindex',
        name: 'usermenuindex',
        component: usermenuindex
      },{
        path: 'commodityDetails',
        name: 'commodityDetails',
        component: commodityDetails
      },{
        path: 'cart',
        name: 'cart',
        component: cart
      },{
        path: 'userAddress',
        name: 'userAddress',
        component: userAddress
      },{
        path: 'orderPreview',
        name: 'orderPreview',
        component: orderPreview
      },{
        path: 'myOrder',
        name: 'myOrder',
        component: myOrder
      },{
        path: 'orderDetails',
        name: 'orderDetails',
        component: orderDetails
      },{
        path: 'lookUser',
        name: 'lookUser',
        component: lookUser
      }
    ]
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
