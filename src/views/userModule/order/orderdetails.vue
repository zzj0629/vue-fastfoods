<template>
  <div class="ts">
    <h1>订单详情</h1>
    <el-descriptions border :column="2">
      <el-descriptions-item label="订单编号">{{oid}}</el-descriptions-item>
      <el-descriptions-item label="订单时间">  {{orderTime}}</el-descriptions-item>
      <el-descriptions-item label="收件人">{{sjrName}}</el-descriptions-item>
      <el-descriptions-item label="联系电话">{{telephone}}</el-descriptions-item>
      <el-descriptions-item label="送货地址">{{shAddress}}</el-descriptions-item>
      <el-descriptions-item label="订单总计">{{orderSum}}</el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            商品详情:
          </div>
        </template>
        <el-table :data="shangpinData" border style="height: 400px;" stripe>
          <el-table-column prop="spnum" label="序号" width="60" />
          <el-table-column prop="picture" label="商品图片" width="80" >
            <template #default="scope">
              <img :src="scope.row.picture" alt="" style="height: 50px;width: 50px">
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="150" />
          <el-table-column prop="star" label="商品评分" width="120" />
          <el-table-column prop="price" label="商品单价" width="170" />
          <el-table-column prop="num" label="购买数量" width="160" />
          <el-table-column prop="money" label="小计" width="121" />
        </el-table>
      </el-descriptions-item>
    </el-descriptions><br/>
    <div style="text-align: center;">
      <el-button @click="back()" size="large" type="primary">返回订单列表</el-button>
      <el-button @click="pay()" size="large" type="warning" v-if="this.zhuangTai==1">支付</el-button>
    </div>
  </div>
  <el-dialog v-model="dialogVisible1" title="选择支付方式" width="20%" draggable>
    <div>
      <el-radio-group v-model="payStyle">
        <el-radio label="1" border size="large" style="width: 250px">微信支付&nbsp;&nbsp;</el-radio>
        <br/>
        <el-radio label="2" border size="large" style="width: 250px">支付宝支付</el-radio>
      </el-radio-group><br/><br/>
      <el-button @click="paytow()" size="large" type="warning">支付</el-button>
    </div>
  </el-dialog>
</template>

<script>
import $store from "@/store";
import Axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "orderdetails",
  data(){
    return{
      orderData:[],
      oid:'',
      orderTime:'',
      sjrName:'',
      telephone:'',
      shAddress:'',
      orderSum:'',
      zhuangTai:'',
      shangpinData:[],
      dialogVisible1:false,
      payStyle:''
    }
  },methods:{
    back(){
      this.$router.push({path: '/userMenu/myOrder'})
    },pay(){
      this.dialogVisible1=true;
    },paytow(){
      if (this.payStyle == 1 || this.payStyle == 2){
        let pay = $store.state.url + "zhifu?id=" + this.oid;
        Axios.post(pay).then(response => {
          if (response.data === 1) {
            ElMessage({
              message: '支付成功',
              type: 'success',
            })
            this.dialogVisible1=false;
            this.$router.push({path: '/userMenu/myOrder'})
          }
        })
      }else {
        ElMessage('请选择支付方式')
      }
    }
  },mounted(){
    this.oid = this.$route.query.oid
    let selectAllByOid = $store.state.url + "selectAllByOid?id=" + this.oid;
    Axios.post(selectAllByOid).then(response => {
      this.orderData = response.data;
      this.orderTime = this.orderData[0].createtime
      this.sjrName = this.orderData[0].name
      this.telephone = this.orderData[0].phone
      this.shAddress = this.orderData[0].detail
      this.orderSum = this.orderData[0].money
      this.zhuangTai = this.orderData[0].flag
    })
    let selectGoodsByOid = $store.state.url + "selectGoodsByOid?oid=" + this.oid;
    Axios.post(selectGoodsByOid).then(response => {
      this.shangpinData = response.data;
      for (let i = 1; i <= response.data.length; i++) {
        this.shangpinData[i-1].spnum = i;
      }
    })
  }
}
</script>

<style scoped>
.ts {
  width: 70%;
  margin-left: 15%;
}
</style>