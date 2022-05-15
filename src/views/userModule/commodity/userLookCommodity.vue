<template>
  <div style="margin-top: -30px"><h1>商品列表</h1></div>
  <el-divider style="margin-top: -5px;"/>
  <el-row>
    <el-col :span="4" v-for="(item) in tabledata" :key="item.id" :offset="1" v-on:click="detail(item.id)">
      <div style="margin-top:10px; margin-left: -30px; ">
        <el-card :body-style="{ padding: '0px'}" shadow="always" style="height: 400px">
          <div style="text-align: center;">
            <el-image
                style="width: 220px; height: 220px; margin-top: 5px"
                :src="item.picture"
                fit="cover"
            />
          </div>
          <div style="background-color: rgba(250,250,250);">
            <div style="font-size: 20px">
              <span>商品名称： {{ item.name }}</span><br/><br/>
            </div>
            <div style="font-size: 13px; ">
              <span>好评度： {{ aaa(item.star) }}</span><br/><br/>
            </div>
            <div style="font-size: 13px;">
              <span>上架日期： {{ item.pubdate }}</span><br/><br/>
            </div>
            <div style="color: red;">
              <span>￥&nbsp;{{ item.price }}&nbsp;元</span><br/>
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
  name: "userLookCommodity",
  data() {
    return {
      tabledata: [{
        img: '',
        name: '',
        star: '',
        pubdata: '',
        price: ''
      }],
      typeName: '',
      name: ''
    }
  }, methods: {
    aaa(a) {
      let b = '';
      for (let i = 0; i < a; i++) {
        b = b + "★"
      }
      return b
    },typenamepost() {
      let url = $store.state.url + "selectAllByTypename?typeName=" + this.typeName
      Axios.post(url).then(response => {
        this.tabledata = response.data;
      }).catch(err => {
        ElMessage({
          message: '错误',
          type: 'error'
        })
        console.log(err)
      })
    },namepost() {
      let url = $store.state.url + "selectGoodsByName?name=" + this.name
      Axios.post(url).then(response => {
        this.tabledata = response.data;
      }).catch(err => {
        ElMessage({
          message: '错误',
          type: 'error'
        })
        console.log(err)
      })
    },detail(id){
      this.$router.push({path: '/userMenu/usermenuindex',
        query:{path:"commodityDetails", id:id}
      })
    }
  }, mounted() {
    this.typeName = this.$route.query.typeName;
    this.name = this.$route.query.name;
    if (this.typeName !== undefined) {
      this.typenamepost();
    }else if(this.name !== undefined){
      this.namepost();
    }
  }
}
</script>

<style>

</style>