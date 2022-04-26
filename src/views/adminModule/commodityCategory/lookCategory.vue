<template>
  <div><h1>查看商品分类</h1></div>
  <div style="width: 100%;">
    <el-divider style="margin-top: -10px"/>
    <el-form :model="user" rules="rules" style="margin: 5px 5px 5px 50px">
      <div style="display: inline-block;width: 500px">
        商品分类：<el-input v-model="searchData.name" placeholder="请输入商品分类" clearable style="width: 50%;margin-top: -30px"/>
      </div>
      <div style="display: inline-block;width: 300px">
        <el-button type="primary" v-on:click="search" >搜索</el-button>
      </div>
    </el-form>
  </div>
  <el-divider style="margin-top: 10px"/>
  <div >
    <el-table :data="tableData" style="width: 100%;" height="450" stripe >
      <el-table-column prop="num" label="编号" width="180" />
      <el-table-column prop="name" label="类型" width="180" />
      <el-table-column label="操作" >
        <template #default="scope">
          <el-button
              round
              type="danger"
              @click="typeDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import $store from "@/store";
import Axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "lookCategory",
  data(){
    return{
      tableData:[],
      searchData:{
        name: ''
      },type: {
        num:'',
        id:'',
        name: ''
      },
    }
  },$store,methods: {
    search(){
      let url=$store.state.url+"selectAdminByName?name="+this.searchData.name
      Axios.post(url).then(response=>{
        this.tableData=response.data
        for(let i = 1;  i<=response.data.length;i++){
          this.tableData[i-1].num=i;
        }
        if(response.data==""){
          ElMessage({
            message: '无此分类，请确认搜索信息',
            type: 'error',
          })
        }
      }).catch(error=>{
        alert("错误")
        console.log(error)
      })
    },typeDelete(index,data){
      let url=$store.state.url+"deleteCategoryById?id="+data.id
      Axios.post(url).then(response=>{
        if(response.data==1){
          ElMessage({
            message: '删除成功',
            type: 'success',
          })
          this.$router.push({path:'/adminMenu/index',query:{path:'lookCategory'} })
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
    let url = $store.state.url+"selectCategory"
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