<template>
  <div class="ts">
    <div>
      <h1>我的订单</h1>
      <el-divider style="margin-top: -10px"/>
      <span>温馨提示：您有 <span style="color: red">{{orderNum}}</span> 个订单</span>
      <el-divider/>
    </div>
    <el-table :data="orderData" border style="height: 500px; border: 1px solid black" stripe>
      <el-table-column prop="num" label="编号" width="60" />
      <el-table-column prop="id" label="订单编号" width="250" />
      <el-table-column prop="money" label="总金额" width="100" />
      <el-table-column prop="flag" label="订单状态" width="140" />
      <el-table-column prop="createtime" label="订单时间" width="170" />
      <el-table-column prop="address" label="收件人信息" width="160" />
      <el-table-column label="操作" >
        <template #default="scope">
          <el-button
              round
              type="danger"
              @click="selectOrder(scope.$index, scope.row)"
          >订单详情</el-button>
          <el-button
              round
              type="danger"
              @click="deleteOrder(scope.$index, scope.row)"
          >删除订单</el-button>
          <el-button
              round
              type="danger"
              v-if="scope.row.flag=='已发货，待收货'"
              @click="shouHuo(scope.$index, scope.row)"
          >确认收货</el-button>
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
  name: "myorder",
  data(){
    return{
      orderData:[],
      orderNum:'',
    }
  },methods:{
    selectOrder(index,data){
      this.$router.push({path: '/userMenu/orderDetails',
        query:{oid:data.id}
      })
    },deleteOrder(index,data){
      let shanchuOrderdetail = $store.state.url + "deleteOrderdetailByOid?oid=" + data.id;
      Axios.post(shanchuOrderdetail).then(response => {
        let shanchuOrder = $store.state.url + "shanchuOrderById?id=" + data.id;
        Axios.post(shanchuOrder).then(response => {
          if (response.data === 1) {
            ElMessage({
              message: '删除成功',
              type: 'success',
            })
            this.$router.push({path: '/userMenu/usermenuindex', query: {path: 'myorder'}})
          }
        })
      })
    },shouHuo(index,data){
      let shouhuo = $store.state.url + "shouhuo?id=" + data.id;
      Axios.post(shouhuo).then(response => {
        this.$router.push({path: '/userMenu/usermenuindex', query: {path: 'myorder'}})
      })
    }
  },mounted(){
    this.uid = this.$cookies.get("id")
    let url = $store.state.url + "selectOrderAllByUid?uid=" + this.uid;
    Axios.post(url).then(response => {
      this.orderData = response.data;
      for (let i = 1; i <= response.data.length; i++) {
        //生成序号
        this.orderData[i-1].num = i;
        //判断支付状态
        if(this.orderData[i-1].flag===1){
          this.orderData[i-1].flag='未支付'
        }else if(this.orderData[i-1].flag===2){
          this.orderData[i-1].flag='已支付，待发货'
        }else if(this.orderData[i-1].flag===3){
          this.orderData[i-1].flag='已发货，待收货'
        }else if(this.orderData[i].flag===4){
          this.orderData[i-1].flag='已收货,订单完成'
        }
        //生成收件人信息
        this.oid = this.orderData[i-1].id
        this.name = this.orderData[i-1].name
        this.phone = this.orderData[i-1].phone
        this.detail = this.orderData[i-1].detail
        this.orderData[i-1].address = this.name+"-"+this.phone+"-"+this.detail
      }
    }).catch(error => {
      alert("错误")
      console.log(error)
    })
    let orderNum = $store.state.url + "howMuchOrderByUid?uid=" + this.uid;
    Axios.post(orderNum).then(response => {
      this.orderNum = response.data;
    })
  }
}
</script>

<style scoped>
.ts{
  width: 90%;
  margin-left: 5%;
}
</style>