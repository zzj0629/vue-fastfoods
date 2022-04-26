<template>
  <div><h1>添加商品</h1></div>
  <div style="width: 100%;">
    <el-divider style="margin-top: -10px"/>
    <el-form :model="adddata" rules="rules" style="margin: 5px 5px 5px 50px">
      <el-form-item label="商品名称: " prop="name" style="float: left; width: 40%;">
        <el-input type="text"
                  placeholder="请输入商品名称"
                  autocomplete="off"
                  style="width: 50%;"
                  v-model="adddata.name"
                  v-on:blur="nameonblur"
        ></el-input>
        <p class="tishi">{{nameErr}}</p>
      </el-form-item>
      <el-form-item label="商品价格: " prop="price" style="width: 40%">
        <el-input type="text"
                  placeholder="请输入商品价格"
                  autocomplete="off"
                  style="width: 50%;"
                  v-model="adddata.price"
                  v-on:blur="priceonblur"
        ></el-input>
        <p class="tishi">{{priceErr}}</p>
      </el-form-item>
      <el-form-item label="商品分类: " prop="typeName" style="float: left; width: 40%;">
        <el-input type="text"
                  placeholder="请输入商品分类"
                  autocomplete="off"
                  style="width: 50%;"
                  v-model="adddata.typeName"
                  v-on:blur="typeNameonblur"
        ></el-input>
        <p class="tishi">{{typeNameErr}}</p>
      </el-form-item>
      <el-form-item label="商品评分: " prop="star" style="width: 40%">
        <el-input type="text"
                  placeholder="请输入商品评分"
                  autocomplete="off"
                  style="width: 50%;"
                  v-model="adddata.star"
                  v-on:blur="staronblur"
        ></el-input>
        <p class="tishi">{{starErr}}</p>
      </el-form-item>
      <el-form-item label="上架时间: " prop="pubdate">
        <el-date-picker v-model="adddata.pubdate" v-on:blur="pubdateonblur" type="date" value-format="YYYY-MM-DD" placeholder="请选择日期" />
        <p class="tishi">{{pubdateErr}}</p>
      </el-form-item>
      <el-form-item label="商品图片: " prop="picture">
        <el-upload
            class="upload-demo"
            action="http://localhost:8080/upload/picture"
            multiple
            :limit="3"
            :on-success="success"
        >
          <el-button v-model="adddata.tp" type="primary">请选择图片</el-button>
        </el-upload>
        <img :src="adddata.imgUrl" alt="" style="width: 150px; height: 150px;">
        <p class="tishi">{{imgUrlErr}}</p>
      </el-form-item>
      <el-form-item label="商品简介: " prop="intro">
        <el-input
            v-model="adddata.intro"
            :rows="2"
            type="textarea"
            placeholder="请填写商品的详细信息"
            style="width: 62%"
            v-on:blur="introonblur"
        />
        <p class="tishi">{{introErr}}</p>
      </el-form-item>
      <el-form-item style="margin-left: 80px;">
        <el-button type="primary" size="large" @click="addcommodity()" style="width: 100px" >添加</el-button>
        <el-button type="reset" size="large" @click="chongzhi()" style="width: 100px">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import $store from "@/store";
import Axios from "axios";

export default {
  name: "addCommodity",
  data(){
    return{
      adddata:{
        name:'',
        price:'',
        typeName:'',
        star:'',
        pubdate:'',
        imgUrl:'',
        intro:''
      },
      nameErr:'* 请输入商品名称',
      priceErr:'* 请输入商品价格',
      typeNameErr:'* 请输入商品分类',
      starErr:'* 请输入商品评分',
      pubdateErr:'* 请输入上架时间',
      imgUrlErr:'* 请添加商品图片',
      introErr:'* 请输入商品简介',
    }
  },$store,methods:{
    nameonblur(){
      if (this.adddata.name != "") {
        this.nameErr = '*'
      }
    },priceonblur(){
      if (this.adddata.price != "") {
        this.priceErr = '*'
      }
    },typeNameonblur(){
      if (this.adddata.typeName != "") {
        this.typeNameErr = '*'
      }
    },staronblur(){
      if (this.adddata.star != "") {
        this.starErr = '*'
      }
    },pubdateonblur(){
      if (this.adddata.pubdate != "") {
        this.pubdateErr = '*'
        // alert(this.adddata.pubdate)
      }
    },introonblur(){
      if (this.adddata.intro != "") {
        this.introErr = '*'
      }
    },success(res,file){
      this.adddata.imgUrl=file.response
    },addcommodity(){
      if(this.nameErr!='*' || this.priceErr!='*' || this.typeNameErr!='*' || this.starErr!='*' || this.pubdateErr!='*' || this.adddata.imgUrl=='' || this.introErr!='*') {
        ElMessage({
          message: '请正确输入数据',
          type: 'error',
        })
      }else {
        let url=$store.state.url+
            "insertFoodsInformation?name="+this.adddata.name+
            "&price="+this.adddata.price+
            "&pubdate="+this.adddata.pubdate+
            "&typeName="+this.adddata.typeName+
            "&intro="+this.adddata.intro+
            "&picture="+this.adddata.imgUrl+
            "&star="+this.adddata.star
        Axios.post(url).then(response => {
          if(response.data===1){
            ElMessage({
              message: '添加成功',
              type: 'success',
            })
            this.adddata.name='',
            this.adddata.price='',
            this.adddata.typeName='',
            this.adddata.star='',
            this.adddata.pubdate='',
            this.adddata.imgUrl='',
            this.adddata.intro=''
          }else{ElMessage('添加失败') }
        }).catch(function (error) {
          alert("错误");
          console.log(error);
        })
      }
    },chongzhi(){
      this.adddata.name='',
      this.adddata.price='',
      this.adddata.typeName='',
      this.adddata.star='',
      this.adddata.pubdate='',
      this.adddata.imgUrl='',
      this.adddata.intro=''
    }
  },mounted() {

  }
}
</script>

<style scoped>
.tishi{
  color: red;
  margin-left: 20px;
  font-size: 5px;
}
</style>