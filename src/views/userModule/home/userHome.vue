<template>
  <el-carousel height="350px">
    <el-carousel-item v-for="item in carouselImg" :key="item" v-on:click="a(item.id)">
      <h3 class="small">
        <el-image :src="item.img"/>
      </h3>
    </el-carousel-item>
  </el-carousel>
  <div><h1>热销商品</h1></div>
  <el-divider style="margin-top: -5px;"/>
  <el-row>
    <el-col :span="4" v-for="(item) in tabledata" :key="item.id" :offset="1" v-on:click="b(item.id)">
      <div style="margin-top:10px; margin-left: -30px; text-align: center;">
        <el-card :body-style="{ padding: '0px'}" shadow="always" style="height: 350px">
          <el-image
              style="width: 220px; height: 220px; margin-top: 5px"
              :src="item.picture"
              :preview-src-list="item.picture"
              fit="cover"
          />
          <div style="background-color: rgba(250,250,250);">
            <div style="font-size: 20px">
              <span > {{item.name}}</span><br/><br/>
            </div>
            <div style="font-size: 13px; margin-top: -20px">
              <span > {{item.intro}}</span><br/><br/>
            </div>
            <div style="color: red; margin-top: -10px">
              <span >￥&nbsp;{{item.price}}&nbsp;元</span><br/>
            </div>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import $store from "@/store";
import Axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "userHome",
  data() {
    return {
      carouselImg:[
        {
          img:'http://localhost:8080/uploadFile/8f7e24c028ce4e12b810c80730f4d0bc.jpg',
          id:1
        },{
          img:'http://localhost:8080/uploadFile/70ef6da10dbb4118833b73ecdc640059.jpg',
          id:2
        },{
          img:'http://localhost:8080/uploadFile/827aa5f795f6443fa74a0f6a438e576f.jpg',
          id:3
        }
      ],tabledata:[{
        img:'',
        name:'',
        intro:'',
        price:''
      }]
    }
  }, methods: {
    // 轮播图跳转问题
    a(id){
      if(id == 1){}
      if(id == 2){}
      if(id == 3){}
    },b(id){
      this.$router.push({
        path: '/userMenu/usermenuindex', query:{path:"commodityDetails",id:id}
      })
    }
  },mounted() {
    //显示热销商品
    let url = $store.state.url+"selectRxGoods"
    Axios.post(url).then(response => {
      this.tabledata = response.data;
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
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
  }
</style>