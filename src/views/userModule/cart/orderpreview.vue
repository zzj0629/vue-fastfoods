<template>
  <div class="ts">
    <div>
      <h1>订单预览</h1>
      <el-divider style="margin-top: -10px"/>
    </div>
    <el-table :data="tableData" border style="height: 300px; border: 1px solid black" stripe>
      <el-table-column prop="snum" label="编号" width="150" />
      <el-table-column prop="name" label="商品名称" width="250" />
      <el-table-column prop="price" label="单价" width="150" />
      <el-table-column prop="num" label="数量" width="150" />
      <el-table-column prop="money" label="小计" width="150" />
    </el-table>
    <span style="color: red; font-size: 20px">商品金额总计：￥&nbsp;{{zongji}}&nbsp;元</span>
    <div>
      <p>收件人信息：</p>
        <el-select style="width: 30%" v-model="addressId" class="m-2" placeholder="请选择地址">
          <el-option
              v-for="item in addressdata"
              :key="item.id"
              :label="item.name+'    '+item.phone+'   '+item.detail"
              :value="item.id"
          /></el-select><br/><br/>
      <el-button @click="createorder()" size="large" type="primary">提交订单</el-button>
    </div>
  </div>
  <!--提示是否提交订单-->
  <el-dialog v-model="tishixinxi" title="提示：" width="20%" draggable>
    <div style="text-align: center;">
      <h1>确认提交订单？</h1><br/><br/>
      <el-button type="primary" style="width: 100px" @click="queren()">确认提交</el-button>
      <el-button style="width: 100px" @click="fanhui">返回预览</el-button>
    </div>
  </el-dialog>
</template>
<!--tishixinxi = false-->
<script>
import $store from "@/store";
import Axios from "axios";

export default {
  name: "orderpreview",
  data(){
    return{
      cartdata:[],
      tableData:[],
      addressdata:[],
      zongji:'',
      SJRName:'',
      SJRPhone:'',
      SJRAddress:'',
      SJRXX:'',
      addressId:'',
      tishixinxi:false,
    }
  },methods:{
    createorder(){
      this.uid = this.$cookies.get("id")
      //生成一个订单
      let addorder = $store.state.url+"addOrder?uid="+this.uid+"&uaid="+this.addressId+"&money="+this.zongji
      Axios.post(addorder).then(response=>{
        //填写订单详情
        for (let i = 0;i<this.tableData.length;i++){
          this.oid = response.data
          this.gid = this.tableData[i].gid
          this.money = this.tableData[i].money
          this.num = this.tableData[i].num
          let addorderdetail = $store.state.url+"addOrderDetail?oid="+this.oid+"&gid="+this.gid+"&money="+this.money+"&num="+this.num
          Axios.post(addorderdetail).then(response=>{
          })
        }
        //清空购物车
        this.cid = this.cartdata[0].id
        let emptycart = $store.state.url+"deleteAllByCid?cid="+this.cid
        Axios.post(emptycart).then(response=>{
          this.$router.push({path:'/userMenu/myOrder'})
        })
      })
    },fanhui(){
      this.tishixinxi = false;
    }
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
    let getAddress = $store.state.url+"seeAddressByUid?uid="+this.uid;
    Axios.post(getAddress).then(response=>{
      this.addressdata = response.data;
      this.addressId=response.data[0].id
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