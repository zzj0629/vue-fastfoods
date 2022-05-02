<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
        >
          <el-dropdown id="userAnd">
            <el-avatar id="userIon"> {{ user }}</el-avatar>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-on:click="userinformation()">个人信息</el-dropdown-item>
                <el-dropdown-item v-on:click="myAddress()">我的收货地址</el-dropdown-item>
                <el-dropdown-item v-on:click="cart()">购物车</el-dropdown-item>
                <el-dropdown-item v-on:click="myOrder()">我的订单</el-dropdown-item>
                <el-dropdown-item v-on:click="quit()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-menu-item index="0" v-on:click="home()">
            首页
          </el-menu-item>
          <el-menu-item :index="category.id"
                        v-for="category in menuData"
                        v-on:click="categoryIndex(category.name)"
          >{{ category.name }}
          </el-menu-item>
          <span id="searchS">
          <el-input v-model="input" placeholder="搜索" class="searchI" clearable/>
             <el-button type="primary" v-on:click="Search">搜索</el-button>
          </span>
        </el-menu>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import $store from "@/store";
import Axios from "axios";

export default {
  name: "userIndex",
  data() {
    return {
      menuData: [],
      user: '',
      input: '',
      name:'',
    }
  }, $store, methods: {
    categoryIndex(name) {
      this.$router.push({path:'/userMenu/usermenuindex',query:{path:'userIndex',typeName:name} })
    }, quit() {
      this.$router.push({path: '/'})
    },home(){
      this.$router.push({path: '/userMenu/userHome'})
    },Search(){
      this.$router.push({path:'/userMenu/usermenuindex',query:{path:'userIndex',name:this.input} })
    },myAddress(){
      this.$router.push({path:'/userMenu/userAddress'})
    },cart(){
      this.$router.push({path:'/userMenu/cart'})
    }
  }, mounted() {
    let url = $store.state.url + "selectCategory"
    Axios.post(url).then(response => {
      this.menuData = response.data;
    }).catch(err => {
      ElMessage({
        message: '错误',
        type: 'error'
      })
      console.log(err)
    })
    this.user = this.$cookies.get("username")
  }
}
</script>

<style scoped>
#userAnd {
  margin-top: 10px;
  margin-right: 5%;
}

#searchS {
  width: 30%;
  display: inline;
  right: 10px;
  position: absolute;
}

.searchI {
  width: 75%;
  margin-top: 10px;
  margin-right: 10px;
}
</style>