<template>
  <div class="ts">
    <div>
      <h1>订单预览</h1>
      <el-divider style="margin-top: -10px"/>
    </div>
    <el-table :data="tableData" border style="height: 300px; border: 1px solid black" stripe>
      <el-table-column prop="snum" label="编号" width="60" />
      <el-table-column prop="name" label="商品名称" width="200" />
      <el-table-column prop="price" label="单价" width="120" />
      <el-table-column prop="num" label="数量" width="160" />
      <el-table-column prop="money" label="小计" width="160" />
    </el-table>
    <span style="color: red; font-size: 20px">商品金额总计：￥&nbsp;{{zongji}}&nbsp;元</span>
    <div>
      <p>收货地址</p>
      <template>
        <el-select v-model="value" clearable placeholder="Select">
<!--          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>-->
        </el-select>
      </template>
      <el-button @click="createorder()" size="large" type="primary">生成订单</el-button>
    </div>
  </div>
</template>

<script>
import $store from "@/store";
import Axios from "axios";

export default {
  name: "orderpreview",
  data(){
    return{
      cartdata:[],
      tableData:[],
      zongji:''
    }
  },methods:{

  },mounted(){
    this.uid=this.$cookies.get("id")
    let url = $store.state.url+"selectUserCartById?uid="+this.uid;
    Axios.post(url).then(response=>{
      this.cartdata = response.data;
      this.cid = this.cartdata[0].id
      let url1 = $store.state.url+"seeAllInCart?cid="+this.cid;
      Axios.post(url1).then(response=>{
        this.tableData=response.data
        for(let i = 1;  i<=response.data.length;i++){
          this.tableData[i-1].snum=i;
        }
      }).catch(error=>{
        alert("错误")
        console.log(error)
      })
      let url2 = $store.state.url+"zongJinE?cid="+this.cid;
      Axios.post(url2).then(response=>{
        this.zongji=response.data
      })
    }).catch(error=>{
      alert("错误")
      console.log(error)
    })
  }
}
</script>

<style scoped>
.ts{
  width: 70%;
  margin-left: 15%;
}
</style>