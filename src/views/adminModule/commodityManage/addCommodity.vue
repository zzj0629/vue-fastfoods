<template>
  <div><h1>添加商品</h1></div>
  <div style="width: 100%;">
    <el-divider style="margin-top: -10px"/>
    <el-form :model="admin" rules="rules" style="margin: 5px 5px 5px 50px">
      <el-form-item label="商品名称: " prop="name" style="float: left; width: 30%;">
        <el-input type="text"
                  placeholder="请输入商品名称"
                  autocomplete="off"
                  style="width: 70%;"
                  v-model="adddata.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品价格: " prop="price">
        <el-input type="text"
                  placeholder="请输入商品价格"
                  autocomplete="off"
                  style="width: 27%;"
                  v-model="adddata.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品分类: " prop="typeName" style="float: left; width: 30%;">
        <el-input type="text"
                  placeholder="请输入商品分类"
                  autocomplete="off"
                  style="width: 70%;"
                  v-model="adddata.typeName"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品评分: " prop="star" >
        <el-input type="text"
                  placeholder="请输入商品评分"
                  autocomplete="off"
                  style="width: 27%;"
                  v-model="adddata.star"
        ></el-input>
      </el-form-item>
      <el-form-item label="上架时间: " prop="pubdate">
        <el-date-picker v-model="adddata.pubdate" type="date" placeholder="请选择日期" />
      </el-form-item>
      <el-form-item label="商品图片: " prop="picture">
        <el-upload
            class="upload-demo"
            action="http://localhost:8080/upload/picture"
            multiple
            :limit="3"
            :on-success="success"
        >
          <el-button type="primary">Click to upload</el-button>
        </el-upload>
        <img :src="adddata.imgUrl" alt="" style="width: 230px; height: 230px;">
      </el-form-item>
      <el-form-item label="商品简介: " prop="intro">
        <el-input
            v-model="adddata.intro"
            :rows="2"
            type="textarea"
            placeholder="Please input"
            style="width: 50%"
        />
      </el-form-item>
      <el-form-item style="margin-left: 80px;">
        <el-button type="primary" size="large" @click="addgoods()" style="width: 100px" >添加</el-button>
        <el-button type="reset" size="large" @click="chongzhi()" style="width: 100px">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<!--v-model="admin.username"-->
<!--v-on:blur="useronblur"-->
<script>
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
      }
    }
  },methods:{
    success(res,file){
      this.adddata.imgUrl=file.response
      // addgoods(){
      //
      // }
    }
  }
}
</script>

<style scoped>

</style>