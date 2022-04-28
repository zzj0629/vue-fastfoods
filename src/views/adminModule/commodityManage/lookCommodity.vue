<template>
  <div><h1>商品列表</h1></div>
  <div style="width: 100%;">
    <el-divider style="margin-top: -10px"/>
    <el-form :model="user" rules="rules" style="margin: 5px 5px 5px 50px">
      <div style="display: inline-block;width: 400px">
        商品名称：<el-input v-model="searchData.name" placeholder="按商品名称搜索" clearable style="width: 50%;margin-top: -30px"/>
      </div>
      <div style="display: inline-block;width: 400px">
        上架时间：<el-date-picker v-model="searchData.pubdate" v-on:blur="pubdateonblur" type="date" value-format="YYYY-MM-DD" placeholder="请选择日期" style="width: 50%;margin-top: -30px"/>
      </div>
      <div style="display: inline-block;width: 300px">
        <el-button type="primary" v-on:click="search">搜索</el-button>
      </div>
    </el-form>
  </div>
  <el-divider style="margin-top: 10px"/>
  <div>
    <el-table :data="tableData" style="width: 100%;" height="450" stripe >
      <el-table-column prop="num" label="序号" width="80" />
      <el-table-column prop="name" label="商品名称" width="100" />
      <el-table-column prop="picture" label="图片" width="120">
        <template #default="scope">
          <img :src="scope.row.picture" alt="" style="height: 100px;width: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="类型" width="90" />
      <el-table-column prop="price" label="价格" width="100" />
      <el-table-column prop="intro" label="介绍" width="180" />
      <el-table-column prop="pubdate" label="上架时间" width="110" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              round
              color="#626aef"
              @click="goodUpdata(scope.$index, scope.row)"
          >修改</el-button>
          <el-button
              round
              type="danger"
              @click="goodDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!--修改-->
  <el-dialog
      v-model="dialogVisible"
      title="修改"
      width="60%"
      draggable
  >
    <!--内容-->
    <el-form :model="updatagood" rules="rules" style="margin: 5px 5px 5px 50px">
      <el-form-item label="商品名称: " prop="name" style="float: left; width: 50%;">
        <el-input type="text"
                  placeholder="请输入商品名称"
                  autocomplete="off"
                  style="width: 50%;"
                  v-model="updatagood.name"
                  v-on:blur="nameonblur"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品价格: " prop="price" style="width: 50%">
        <el-input type="text"
                  placeholder="请输入商品价格"
                  autocomplete="off"
                  style="width: 50%;"
                  v-model="updatagood.price"
                  v-on:blur="priceonblur"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品分类: " prop="typeName" style="float: left; width: 50%;">
        <el-input type="text"
                  placeholder="请输入商品分类"
                  autocomplete="off"
                  style="width: 50%;"
                  v-model="updatagood.typeName"
                  v-on:blur="typeNameonblur"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品评分: " prop="star" style="width: 50%">
        <el-input type="text"
                  placeholder="请输入商品评分"
                  autocomplete="off"
                  style="width: 50%;"
                  v-model="updatagood.star"
                  v-on:blur="staronblur"
        ></el-input>
      </el-form-item>
      <el-form-item label="上架时间: " prop="pubdate">
        <el-date-picker v-model="updatagood.pubdate" v-on:blur="pubdateonblur" type="date" value-format="YYYY-MM-DD" placeholder="请选择日期" />
      </el-form-item>
      <el-form-item label="商品图片: " prop="picture">
        <el-upload
            class="upload-demo"
            action="http://localhost:8080/upload/picture"
            multiple
            :limit="3"
            :on-success="success"
        >
          <el-button v-model="updatagood.tp" type="primary">请选择图片</el-button>
        </el-upload>
        <img :src="updatagood.imgUrl" alt="" style="width: 150px; height: 150px;">
      </el-form-item>
      <el-form-item label="商品简介: " prop="intro">
        <el-input
            v-model="updatagood.intro"
            :rows="2"
            type="textarea"
            placeholder="请填写商品的详细信息"
            style="width: 62%"
            v-on:blur="introonblur"
        />
      </el-form-item>
      <el-form-item style="margin-left: 80px;">
        <el-button type="primary" style="width: 100px" @click="goodUpdataRequest()">修改</el-button>
        <el-button style="width: 100px" @click="dialogVisible = false">返回</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import $store from "@/store";
import Axios from "axios";
import {ElMessage} from "element-plus";
export default {
  name: "lookCommodity",
  data(){
    return{
      tableData:[],
      searchData:{
        name:'',
        pubdate:''
      },updatagood:{
        id:null,
        name:'',
        price:'',
        typeName:'',
        star:'',
        pubdate:'',
        imgUrl:'',
        intro:''
      },
      dialogVisible:false,
    }
  },$store,methods: {
    search(){
      let url=$store.state.url+"selectGoods?name="+this.searchData.name+"&pubdate="+this.searchData.pubdate
      Axios.post(url).then(response=>{
        this.tableData=response.data
        for(let i = 1;  i<=response.data.length;i++){
          this.tableData[i-1].num=i;
        }
        if(response.data==""){
          ElMessage({
            message: '无此商品，请确认搜索信息',
            type: 'error',
          })
        }
      }).catch(error=>{
        alert("错误")
        console.log(error)
      })
    },goodUpdata(index,data){
      this.updatagood.id=data.id;
      this.updatagood.name=data.name;
      this.updatagood.price=data.price;
      this.updatagood.typeName=data.typeName;
      this.updatagood.star=data.star;
      this.updatagood.pubdate=data.pubdate;
      this.updatagood.imgUrl=data.picture;
      this.updatagood.intro=data.intro;
      this.dialogVisible=true;
    },goodUpdataRequest(){
      let url = $store.state.url+
          "updateFoodsInformation?id="+this.updatagood.id+
          "&name="+this.updatagood.name+
          "&price="+this.updatagood.price+
          "&pubdate="+this.updatagood.pubdate+
          "&typeName="+this.updatagood.typeName+
          "&intro="+this.updatagood.intro+
          "&picture="+this.updatagood.imgUrl+
          "&star="+this.updatagood.star
      Axios.post(url).then(response=>{
        ElMessage({
          message: '修改成功',
          type: 'success',
        })
        this.$router.push({path:'/adminMenu/index',query:{path:'lookCommodity'} })
      }).catch(err=>{
        alert("错误")
        console.log(err)
      })
    },success(res,file){
      this.updatagood.imgUrl=file.response
    },goodDelete(index,data){
      alert(data.id)
      let url=$store.state.url+"deleteFoodsInformation?id="+data.id
      Axios.post(url).then(response=>{
        ElMessage({
          message: '删除成功',
          type: 'success',
        })
        this.$router.push({path:'/adminMenu/index',query:{path:'lookCommodity'} })
      }).catch(err=>{
        alert("错误")
        console.log(err)
      })
    }
  },mounted() {
    let url = $store.state.url+"selectFoodsInformation"
    Axios.post(url).then(response=>{
      this.tableData=response.data
      for(let i = 1;  i<=response.data.length;i++){
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