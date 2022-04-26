<template>
  <div><h1>用户列表</h1></div>
  <div style="width: 100%;">
    <el-divider style="margin-top: -10px"/>
    <el-form :model="user" rules="rules" style="margin: 5px 5px 5px 50px">
      <div style="display: inline-block;width: 500px">
        用户名：<el-input v-model="searchData.username" placeholder="按用户名搜索" clearable style="width: 50%;margin-top: -30px"/>
      </div>
      <div style="display: inline-block;width: 300px">
        性别：
        <el-radio v-model="searchData.sex" label="男" size="large">男</el-radio>
        <el-radio v-model="searchData.sex" label="女" size="large">女</el-radio>
        <el-radio v-model="searchData.sex" label="" size="large">不限</el-radio>
      </div>
      <div style="display: inline-block;width: 300px">
        <el-button type="primary" v-on:click="search">搜索</el-button>
      </div>
    </el-form>
  </div>
  <el-divider style="margin-top: 10px"/>

  <div >
    <el-table :data="tableData" style="width: 100%;" height="450" stripe >
      <el-table-column prop="num" label="编号" width="180" />
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="gender" label="性别" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="操作" >
        <template #default="scope">
          <el-button
              round
              type="danger"
              @click="userDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Axios from 'axios'
import $store from '../../../store/index.js'
import {ElMessage} from "element-plus";
export default {
  name: "userManage",
  data() {
    return {
      tableData: [],
      user: {
        num:'',
        id:'',
        username: '',
        sex: '',
        email:''
      },
      searchData:{
        username: '',
        sex: '',
      }
    }
  },$store,methods: {
    search(){
      let url=$store.state.url+"selectUserWhereCondition?username="+this.searchData.username+"&gender="+this.searchData.sex
      Axios.post(url).then(response=>{
        this.tableData=response.data
        for(let i = 1;  i<=response.data.length;i++){
          this.tableData[i-1].num=i;
        }
        if(response.data==""){
          ElMessage({
            message: '此分类下暂无用户,请更换条件',
            type: 'error',
          })
        }
      }).catch(error=>{
        alert("错误")
        console.log(error)
      })
    },userDelete(index,data){
      let url=$store.state.url+"deleteUserById?id="+data.id
      Axios.post(url).then(response=>{
        if(response.data==1){
          ElMessage({
            message: '删除成功',
            type: 'success',
          })
          this.$router.push({path:'/adminMenu/index',query:{path:'userManage'} })
        }else{
          ElMessage({
            message: '删除失败',
            type: 'error',
          })
        }
      }).catch(error=>{
        alert("错误")
        console.log(error)
      })

    }
  },mounted() {
    let url = $store.state.url+"selectUserWhereUser"
    Axios.post(url).then(response=>{
      this.tableData=response.data
      for(let i = 1;  i<=response.data.length;i++){
        this.tableData[i-1].num=i;
      }
    }).catch(error=>{
      alert("错误")
      console.log(error)
    })
  }
}
</script>

<style scoped>

</style>