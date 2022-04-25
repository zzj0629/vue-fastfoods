<template>
  <h1>添加商品分类</h1>
  <el-divider style="margin-top: 10px"/>
  <el-form-item label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商品分类: " prop="username">
    <el-input type="text"
              placeholder="请输入要添加的商品分类"
              autocomplete="off"
              style="width: 40%;"
              v-model="type"
    ></el-input>
    <el-form-item style="margin-left: 28%">
      <el-button type="primary" size="large" @click="addtype()" style="width: 100px">添加</el-button>
      <el-button type="reset" size="large" @click="chongzhi()" style="width: 100px">重置</el-button>
    </el-form-item>
  </el-form-item>
</template>

<script>
import {ElMessage} from "element-plus";
import $store from "@/store";
import Axios from "axios";

export default {
  name: "addCategory",
  data(){
    return{
      type:'',
    }
  },methods:{
      addtype(){
        if (this.type == ""){
          ElMessage({
            message: '请输入分类',
            type: 'error',
          })
        }else {
          let url=$store.state.url+"addtype?name="+this.type
          Axios.post(url).then(response => {//请求成功处理
            if(response.data===1){
              ElMessage({
                message: '添加成功',
                type: 'success',
              })
              this.type='';
            }else{
              ElMessage('添加失败')
            }
          }).catch(function (error) {//请求失败处理
            alert("错误");
            console.log(error);
          });
        }
      },chongzhi(){
        this.type=""
    }
  },mounted() {

  }
}
</script>

<style scoped>

</style>