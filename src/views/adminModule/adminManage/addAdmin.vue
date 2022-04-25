<template>
<h1>添加管理员</h1>
  <el-divider style="margin-top: 10px"/>
  <el-form :model="admin" rules="rules" style="margin: 5px 5px 5px 50px">
    <el-form-item label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;账号: " prop="username">
      <el-input type="text"
                v-model="admin.username"
                placeholder="请输入账号"
                autocomplete="off"
                style="width: 40%;"
                v-on:blur="useronblur"
      ></el-input>
      <p class="tishi" >{{ userErr }}</p>
    </el-form-item>
    <el-form-item label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密码: " prop="password" >
      <el-input type="password"
                placeholder="请输入密码"
                show-password
                v-model="admin.password"
                autocomplete="off"
                style="width: 40%;"
                onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
                v-on:blur="passonblur"
      ></el-input>
      <p class="tishi"  >{{passErr}}</p>
    </el-form-item>
    <el-form-item label="确认密码:" prop="password2" >
      <el-input type="password"
                placeholder="请确认密码"
                show-password
                v-model="admin.password2"
                autocomplete="off"
                style="width: 40%;"
                onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
                v-on:blur="pass2onblur"
      ></el-input>
      <p class="tishi"  >{{pass2Err}}</p>
    </el-form-item>
    <el-form-item label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱: " prop="email" >
      <el-input type="text"
                placeholder="email"
                v-model="admin.email"
                autocomplete="off"
                style="width: 40%;"
      ></el-input>
      <p class="tishi2"  >填写正确的邮箱格式</p>
    </el-form-item>
    <el-form-item style="margin-left: 17%">
      <el-radio-group v-model="admin.gender">
        <el-radio label="男" border class="radio">男</el-radio>
        <el-radio label="女" border class="radio">女</el-radio>
      </el-radio-group>
      <p class="tishi2" style="margin-left: 100px" >你是帅哥，还是美女</p>
    </el-form-item>

    <el-divider />
    <el-form-item style="margin-left: 28%">
      <el-button type="primary" @click="addAdmin()" size="large" style="width: 100px">添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {ElMessage} from "element-plus";
import $store from "@/store";
import Axios from "axios";
export default {
  name: "addAdmin",
  data(){
    return{
      admin:{
        username:'',
        password:'',
        password2:'',
        role:null,
        email:'',
        gender:'',
      },
      userErr:'*请输入4-20位用户名',
      passErr:'*请输入4-20位密码',
      pass2Err:'*请输入4-20位密码',
    }
  },$store,methods: {
    addAdmin() {
      if(this.userErr!='*' || this.passErr!='*' || this.pass2Err!='*') {
        ElMessage({
          message: '请正确输入数据',
          type: 'error',
        })
      }else{
        let url=$store.state.url+"addAdmin?username="+this.admin.username+"&password="+this.admin.password+
            "&email="+this.admin.email+"&gender="+this.admin.gender
        let url1=$store.state.url+"login?username="+this.admin.username+"&role=0"
        Axios.post(url1)
            .then(response => {//请求成功处理
              if(response.data!=''){
                ElMessage({
                  message: '该管理员已存在',
                  type: 'error',
                })
              }else{
                Axios.post(url)
                    .then(response => {//请求成功处理
                      if(response.data===1){
                        ElMessage({
                          message: '添加成功',
                          type: 'success',
                        })
                        this.admin.username='';
                        this.admin.password='';
                        this.admin.password2='';
                        this.admin.gender='';
                        this.admin.role='';
                        this.admin.email='';
                      }else{
                        ElMessage('注册失败')
                      }
                    })
                    .catch(function (error) {//请求失败处理
                      alert("错误");
                      console.log(error);
                    });
              }
            })
            .catch(function (error) {//请求失败处理
              alert("错误");
              console.log(error);
            });
      }
    }, useronblur() {
      if (this.admin.username.length < 4 || this.admin.username.length > 20) {
        this.userErr = '* 用户名在4-20位之间'
      } else {
        this.userErr = '*'
      }
    }, passonblur() {
      if (this.admin.password.length < 4 || this.admin.password.length > 20) {
        this.passErr = '* 密码在4-20位之间'
      } else {
        this.passErr = '*'
      }
    },
    pass2onblur() {
      if (this.admin.password2.length < 4 || this.admin.password2.length > 20) {
        this.pass2Err = '* 密码在4-20位之间'
      } else if (this.admin.password != this.admin.password2) {
        this.pass2Err = '* 两次密码输入不一致'
      } else {
        this.pass2Err = '*'
      }
    }
  }
}
</script>

<style scoped>
.tishi{
  color: red;
  margin-left: 20px;
  font-size: 5px;

}
.tishi2{
  margin-left: 20px;
  font-size: 5px;

}
</style>