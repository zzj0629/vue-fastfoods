<template>
  <div><h1>商品列表</h1></div>
  <div style="width: 100%;">
    <el-divider style="margin-top: -10px"/>
    <el-form :model="user" rules="rules" style="margin: 5px 5px 5px 50px">
      <div style="display: inline-block;width: 400px">
        商品分类：<el-input v-model="searchData.typeName" placeholder="按商品分类搜索" clearable style="width: 50%;margin-top: -30px"/>
      </div>
      <div style="display: inline-block;width: 400px">
        上架时间：<el-input v-model="searchData.pubdate" placeholder="请输入商品分类" clearable style="width: 50%;margin-top: -30px"/>
      </div>
      <div style="display: inline-block;width: 300px">
        <el-button type="primary">搜索</el-button>
      </div>
    </el-form>
  </div>
  <el-divider style="margin-top: 10px"/>
  <div>
    <el-table :data="tableData" style="width: 100%;" height="450" stripe >
      <el-table-column prop="num" label="序号" width="80" />
      <el-table-column prop="name" label="商品名称" width="100" />
      <el-table-column prop="picture" label="图片" width="120">
        <template #default="scope">
          <img :src="scope.row.picture" alt="" style="height: 100px;width: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="类型" width="90" />
      <el-table-column prop="price" label="价格" width="100" />
      <el-table-column prop="intro" label="介绍" width="180" />
      <el-table-column prop="pubdate" label="上架时间" width="110" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              round
              color="#626aef"
          >修改</el-button>
          <el-button
              round
              type="danger"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<!--v-model="searchData.name"-->
<!--v-on:click="search"-->
<script>
import $store from "@/store";
import Axios from "axios";
export default {
  name: "lookCommodity",
  data(){
    return{
      tableData:[],
      searchData:{
        typeName:'',
        pubdate:''
      }
    }
  },$store,methods: {

  },mounted() {
    let url = $store.state.url+"selectFoodsInformation"
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