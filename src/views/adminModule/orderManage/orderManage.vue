<template>
  <div><h1>订单管理</h1></div>
  <div style="width: 100%;">
    <el-divider style="margin-top: -10px"/>
    <el-form :model="user" rules="rules" style="margin: 5px 5px 5px 50px">
      <div style="display: inline-block;width: 400px">
        用户姓名：<el-input v-model="searchData.username" placeholder="按用户姓名搜索" clearable style="width: 50%;margin-top: -30px"/>
      </div>
      <div style="display: inline-block;width: 400px">
        <el-form-item label="订单状态" prop="region">
          <el-select  placeholder="按订单状态查询"  v-model="searchData.flag">
            <el-option label="----------" value="" />
            <el-option label="已支付，待发货" value="2" />
            <el-option label="已发货，待收货" value="3" />
          </el-select>
        </el-form-item>
      </div>
      <div style="display: inline-block;width: 300px">
        <el-button type="primary" v-on:click="search">搜索</el-button>
      </div>
    </el-form>
  </div>
  <el-divider style="margin-top: 10px"/>
  <el-table :data="tableData" style="width: 100%;" height="450" stripe >
    <el-table-column v-model="update.num" prop="num" label="序号" width="60" />
    <el-table-column v-model="update.id" prop="id" label="订单号" width="250" />
    <el-table-column prop="money" label="总金额" width="90" />
    <el-table-column prop="flag" label="订单状态" width="120" />
    <el-table-column prop="createtime" label="订单时间" width="240" />
    <el-table-column prop="username" label="用户姓名" width="120" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
            round
            color="#626aef"
            @click="seeOrder(scope.$index, scope.row)"
        >查看订单</el-button>
        <el-button
            round
            color="#626aef"
            v-if="scope.row.flag=='已支付，待发货'"
            @click="fahuo(scope.$index, scope.row)"
        >发货</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="订单详情" width="80%" draggable>
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
    </el-descriptions>
  </el-dialog>
</template>

<script>
import $store from "@/store";
import Axios from "axios";
import {ElMessage} from "element-plus";
export default {
  name: "orderManage",
  data(){
    return{
      a:false,
      dialogVisible:false,
      tableData:[],
      searchData:{
        username:'',
        flag:''
      },update:{
        num:'',
        id:''
      },
      oid:'',
      orderTime:'',
      sjrName:'',
      telephone:'',
      shAddress:'',
      orderSum:'',
      shangpinData:[],
    }
  },$store,methods: {
    search(){
      let url=$store.state.url+"selectByNameAndFlag?username="+this.searchData.username+"&flag="+this.searchData.flag
      Axios.post(url).then(response=>{
        // alert(this.searchData.username+this.searchData.flag)
        this.tableData=response.data
        for(let i = 1;  i<=response.data.length;i++){
          if(this.tableData[i-1].flag===1){
            this.tableData[i-1].flag='未支付'
          }else if(this.tableData[i-1].flag===2){
            this.tableData[i-1].flag='已支付，待发货'
          }else if(this.tableData[i-1].flag===3){
            this.tableData[i-1].flag='已发货，待收货'
          }else if(this.tableData[i-1].flag===4){
            this.tableData[i-1].flag='已收货'
          }
          this.tableData[i-1].num=i;
        }
        if(response.data==""){
          ElMessage({
            message: '无此订单，请确认搜索信息',
            type: 'error',
          })
        }
      }).catch(error=>{
        alert("错误")
        console.log(error)
      })
    },fahuo(index,data){
      this.update.id = data.id
      let url = $store.state.url+"fahuo?id="+this.update.id
      Axios.post(url).then(response=>{
        ElMessage({
          message: '发货成功',
          type: 'success',
        })
        this.$router.push({path:'/adminMenu/index',query:{path:'orderManage'} })
      })
    },seeOrder(index,data){
      this.oid = data.id
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
      this.dialogVisible=true
    }
  },mounted() {
    let url = $store.state.url+"selectAllOrder"
    Axios.post(url).then(response=>{
      this.tableData=response.data
      for(let i = 1;  i<=response.data.length;i++){
        if(this.tableData[i-1].flag===1){
          this.tableData[i-1].flag='未支付'
        }else if(this.tableData[i-1].flag===2){
          this.tableData[i-1].flag='已支付，待发货'
        }else if(this.tableData[i-1].flag===3){
          this.tableData[i-1].flag='已发货，待收货'
        }else if(this.tableData[i-1].flag===4){
          this.tableData[i-1].flag='已收货'
        }
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