<template>
  <div class="ts">
    <div>
      <h1>我的购物车</h1>
      <el-divider style="margin-top: -10px"/>
      <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算！</span>
      <el-divider/>
    </div>
    <el-table :data="tableData" border style="height: 400px; border: 1px solid black" stripe>
      <el-table-column prop="snum" label="编号" width="150"/>
      <el-table-column prop="name" label="商品名称" width="250"/>
      <el-table-column prop="price" label="单价" width="150"/>
      <el-table-column prop="num" label="数量" width="160">
        <template #default="scope">
          <el-input-number v-model="scope.row.num" :min="1" @change="numChange(scope.row)" size="small">
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="money" label="小计" width="120">
        <template #default="scope">
          {{ scope.row.money }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              round
              type="danger"
              @click="deleteSP(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="jiesuan">
      <br/><span>商品金额总计：￥&nbsp;{{ zongji }}&nbsp;元</span><br/><br/>
      <el-button v-on:click="deleteAll()" size="large" type="primary">清空购物车</el-button>
      <el-button @click="orderYL()" size="large" type="primary">结算</el-button>
    </div>
  </div>
</template>

<script>
import $store from "@/store";
import Axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "cart",
  data() {
    return {
      tableData: [],
      cartdata: [],
      xiaoji: '',
      zongji:'0'
    }
  }, methods: {
    numChange(data) {
      this.gid = this.tableData[0].gid
      data.money = data.num * data.price
      //存数据库
      let url = $store.state.url + "updateNumAndMoney?cid=" + this.cid + "&gid=" + data.gid + "&num=" + data.num + "&money=" + data.money
      Axios.post(url).then(response => {
        this.$router.push({path: '/userMenu/usermenuindex', query: {path: 'cart'}})
      }).catch(err => {
        alert("错误")
        console.log(err)
      })
      console.log(data)
    },
    deleteSP(data) {
      let url = $store.state.url + "deleteSP?cid=" + this.cid + "&gid=" + data.gid
      Axios.post(url).then(response=>{
        ElMessage({
          message: '删除成功',
          type: 'success',
        })
        this.$router.push({path:'/userMenu/usermenuindex',query:{path:'cart'}})
      }).catch(err=>{
        alert("错误")
        console.log(err)
      })
    }, deleteAll() {
      let url = $store.state.url + "deleteAllByCid?cid=" + this.cid
      Axios.post(url).then(response => {
        ElMessage({
          message: '购物车已清空',
          type: 'success',
        })
        this.$router.push({path: '/userMenu/usermenuindex', query: {path: 'cart'}})
      }).catch(err => {
        alert("错误")
        console.log(err)
      })
    }, orderYL() {
      if(this.zongji === '0'){
        ElMessage({
          message: '请添加商品'
        })
      }else{
        this.$router.push({path: '/userMenu/orderPreview'})
      }
    }
  }, mounted() {
    this.uid = this.$cookies.get("id")
    let url = $store.state.url + "selectUserCart?uid=" + this.uid;
    Axios.post(url).then(response => {
      this.cartdata = response.data;
      this.cid = this.cartdata[0].id
      let url1 = $store.state.url + "seeAllInCart?cid=" + this.cid;
      Axios.post(url1).then(response => {
        this.tableData = response.data
        for (let i = 1; i <= response.data.length; i++) {
          this.tableData[i - 1].snum = i;
        }
      }).catch(error => {
        alert("错误")
        console.log(error)
      })
      let url2 = $store.state.url + "zongJinE?cid=" + this.cid;
      Axios.post(url2).then(response => {
        this.zongji = response.data
      })
    }).catch(error => {
      alert("错误")
      console.log(error)
    })
  }
}
</script>

<style scoped>
.ts {
  width: 70%;
  margin-left: 15%;
}
.jiesuan {
  float: right;
  margin-right: 5%;
  text-align: center;
}
</style>