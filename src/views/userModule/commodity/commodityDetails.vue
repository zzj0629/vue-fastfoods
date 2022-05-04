<template>
  <h1>{{typeName}}</h1>
  <el-divider style="margin-top: -5px;"/>
  <div>
    <div>
      <el-image
        style="width: 600px; height: 600px; margin-left: 70px; float: left"
        :src="img"
        :preview-src-list="tabledata.img"
        fit="cover"
      />
      <div class="xiangq">
        <div style="font-size: 20px;">
          <h1>&nbsp;商品详情</h1>
          <el-divider/>
          <span>&nbsp;&nbsp;商品名称:&nbsp;&nbsp;{{name}}</span><br/><br/>
          <span>&nbsp;&nbsp;市场价格:&nbsp;&nbsp;{{price}}</span><br/><br/>
          <span>&nbsp;&nbsp;上市时间:&nbsp;&nbsp;{{pubdate}}</span><br/><br/>
          <span>&nbsp;&nbsp;好评度:&nbsp;&nbsp;{{aaa(star)}}</span><br/><br/>
          <span>&nbsp;&nbsp;详细介绍:
            <div style="width: 85%; font-size: 18px; margin-left: 10%; margin-top: 10px;">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;{{intro}}</span>
            </div>
          </span><br/><br/>
          <div style="width: 100%; text-align: center;">
            <el-button @click="addCart()" size="large" style="width: 150px; background-color: orange;">加入购物车</el-button>
            <el-button @click="buy()" size="large" style="width: 150px; background-color: orange;">直接购买</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--加入购物车的提示-->
  <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="40%"
      draggable
  >
    <div style="font-size: 20px"><span>添加购物车成功!</span></div>
    <el-divider style="margin-top: 25px;"/>
    <div style="width: 100%; text-align: center;">
      <el-button @click="lookCart()" size="large" style="width: 150px; background-color: orange;">查看购物车</el-button>
      <el-button @click="buyagain()" size="large" style="width: 150px; background-color: orange;">继续购买</el-button>
    </div>
    <div></div>
  </el-dialog>
</template>

<script>
import {ElMessage} from "element-plus";
import $store from "@/store";
import Axios from "axios";

export default {
  name: "commodityDetails",
  data() {
    return {
      tabledata:[],
      cartdata:[],
      cartdetail:[],
      goodxq:[],
      typeName:'',
      img:'',
      name:'',
      price:'',
      pubdate:'',
      star:'',
      intro:'',
      uid:'',
      gid:'',
      money:'',
      dialogVisible:false,
    }
  },methods: {
    aaa(a){
      let b = '';
      for (let i = 0; i < a; i++) {
        b = b + "★"
      }
      return b
    },addCart(){
      this.uid = this.$cookies.get("id")
      this.gid = this.tabledata[0].id
      this.money = this.tabledata[0].price
      let url = $store.state.url+"selectUserCart?uid="+this.uid
      Axios.post(url).then(response => {
        this.cartdata = response.data;
        this.cid = this.cartdata[0].id
        let url2 = $store.state.url+"seegid?cid="+this.cid
        Axios.post(url2).then(response => {
          this.cartdetail = response.data
          this.gidd = this.cartdetail[0].gid
          this.xiaoji = this.cartdetail[0].money
          if (this.gid==this.gidd){
            let selectprice = $store.state.url+"selectGoodsById?id="+this.gid
            Axios.post(selectprice).then(response => {
              this.goodxq = response.data
              this.pricee = this.goodxq[0].price
              this.xiaoji = this.xiaoji+this.pricee
              alert(this.cid+" "+this.gid+" "+this.xiaoji)
              let updateAddOne = $store.state.url+"updateAddOne?cid="+this.cid+"&gid="+this.gid+"&money="+this.xiaoji
              Axios.post(updateAddOne).then(response => {
                if(response.data===1){
                  this.dialogVisible=true;
                }else {
                  ElMessage({
                    message: '添加失败',
                  })
                }
              }).catch()(err => {
                ElMessage({
                  message: '错误',
                  type: 'error'
                })
              })
            }).catch(err => {
              ElMessage({
                message: '错误',
                type: 'error'
              })
            })
          }else{
            let url1 = $store.state.url+"addCommodityInCart?cid="+this.cid+"&gid="+this.gid+"&money="+this.money
            Axios.post(url1).then(response => {
              if(response.data===1){
                this.dialogVisible=true;
              }else{
                ElMessage('添加失败')
              }
            }).catch(err => {
              ElMessage({
                message: '错误',
                type: 'error'
              })
            })
          }
        })
      }).catch(err => {
        ElMessage({
          message: '错误',
          type: 'error'
        })
        console.log(err)
      })
      // this.dialogVisible=true;
    },lookCart(){
      this.$router.push({path: '/userMenu/cart'})
    },buyagain(){
      this.$router.push({path: '/userMenu/userHome'})
    }
  },mounted() {
    let url = $store.state.url + "selectGoodsById?id=" + this.$route.query.id;
    Axios.post(url).then(response => {
      this.tabledata = response.data;
      this.typeName=this.tabledata[0].typeName
      this.img=this.tabledata[0].picture
      this.name=this.tabledata[0].name
      this.price=this.tabledata[0].price
      this.pubdate=this.tabledata[0].pubdate
      this.star=this.tabledata[0].star
      this.intro=this.tabledata[0].intro
    }).catch(err => {
      ElMessage({
        message: '错误',
        type: 'error'
      })
      console.log(err)
    })
  }
}
</script>

<style scoped>
  .xiangq{
    width: 45%;
    height: 600px;
    border: 2px solid rgba(245,245,245);
    float: right;
    margin-right: 70px;
  }
</style>