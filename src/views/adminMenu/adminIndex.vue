<template>
  <el-container>
    <el-header>
      <div style="width: 100%;   ">
        <h1 style=" display: inline-block;margin-left: 40%">速食品商城后台管理</h1>
        <el-dropdown id="userAnd">
          <el-avatar id="userIon"> {{ user }}</el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-on:click="quit()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-divider/>
    <el-container>
      <el-aside width="220px" >
        <el-menu
            router
            default-active="2"
            class="el-menu-vertical-demo"
            unique-opened="true"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>用户管理</span>
            </template>
              <el-menu-item index="/adminMenu/userManage">用户管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>管理员管理</span>
            </template>
            <el-menu-item index="/adminMenu/addAdmin">添加管理员</el-menu-item>
            <el-menu-item index="/adminMenu/adminManage">管理员列表</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>商品分类管理</span>
            </template>
            <el-menu-item index="/adminMenu/addCategory">添加商品分类</el-menu-item>
            <el-menu-item index="/adminMenu/lookCategory">查看商品分类</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/adminMenu/addCommodity">添加商品</el-menu-item>
            <el-menu-item index="/adminMenu/lookCommodity">查看商品信息</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/adminMenu/orderManage">查看订单</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <div style="margin-top: -30px">
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "adminIndex",
  data() {
    return {
      user: ''
    }
  }, methods: {
    quit() {
      this.$router.push({path: '/'})
    }
  }, mounted() {
    this.user = this.$cookies.get("username")
  }
}
</script>

<style scoped>
#userAnd {
  position: absolute;
  left: 20px;
  margin-left: 50px;
}
#userIon {
  font-size: 5px;
  margin-top: 15px;
  margin-right: 20px
}
</style>