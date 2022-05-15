<template>
  <div class="background">
    <div class="loginback">
      <div style="margin-top: -30px">
        <h3 style="display: inline-block">注册</h3>
        <el-divider style="margin-top: -10px"/>
      </div>
      <el-form :model="user" rules="rules" style="margin: 5px 5px 5px 50px">
        <el-form-item label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;账号: " prop="username">
          <el-input type="text"
                    v-model="user.username"
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
                    v-model="user.password"
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
                    v-model="user.password2"
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
                    v-model="user.email"
                    autocomplete="off"
                    style="width: 40%;"
                    v-on:blur="emailonblur"
          ></el-input>
          <p class="tishi2"  >{{emailErr}}</p>
        </el-form-item>
                <el-form-item style="margin-left: 17%">
                  <el-radio-group v-model="user.sex">
                    <el-radio label="男" border class="radio">男</el-radio>
                    <el-radio label="女" border class="radio">女</el-radio>
                  </el-radio-group>
                  <p class="tishi2" style="margin-left: 100px" >请选择性别</p>
                </el-form-item>

        <el-divider />
        <el-form-item style="margin-left: 28%">
          <el-button type="primary" @click="count()" size="large" style="width: 100px">注册</el-button>
          <el-button @click="login()" size="large" style="width: 100px">返回登录</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import $store from "@/store";
import Axios from "axios";
import {Encrypt, Decrypt} from '../../AES/aes.js';

export default {
  name: "count",
  data(){
    return{
      user:{
        username:'',
        password:'',
        password2:'',
        role:null,
        email:'',
        sex:'',
      },
      userErr:'*请输入2-20位用户名',
      passErr:'*请输入6-20位密码',
      pass2Err:'*请输入6-20位密码',
      emailErr:'请输入正确的邮箱格式',
    }
  },$store,methods:{
    login(){
      this.$router.push({path: '/'})
    },count(){
      if(this.userErr!='*' || this.passErr!='*' || this.pass2Err!='*'){
        ElMessage({
          message: '请按提示正确输入数据',
          type: 'error',
        })
      }else{
        let url=$store.state.url+"account?username="+this.user.username+"&password="+Encrypt(this.user.password)+
            "&email="+this.user.email+"&gender="+this.user.sex
        let url1=$store.state.url+"login?username="+this.user.username+"&role=1"
        Axios.post(url1)
            .then(response => {//请求成功处理
              if(response.data!=''){
                ElMessage({
                  message: '用户已被注册',
                  type: 'error',
                })
              }else{
                Axios.post(url)
                    .then(response => {//请求成功处理
                      if(response.data===1){
                        ElMessage({
                          message: '注册成功',
                          type: 'success',
                        })
                        //定时器回到登录页
                        const that=this;
                        this.timer = setTimeout(function(){
                          that.$router.push({path:'/'})
                        }, 1000);
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
    },useronblur(){
      if(this.user.username.length<2 || this.user.username.length>20){
        this.userErr='* 用户名在2-20位之间'
      }else{
        this.userErr='*'
      }
    }, passonblur(){
      if(this.user.password.length<6 || this.user.password.length>20){
        this.passErr='* 密码在6-20位之间'
      }else{
        this.passErr='*'
      }
    },
    pass2onblur(){
      if(this.user.password2.length<6 || this.user.password2.length>20){
        this.pass2Err='* 密码在6-20位之间'
      }else if(this.user.password!=this.user.password2){
        this.pass2Err='* 两次密码输入不一致'
      }else{
        this.pass2Err='*'
      }
    },emailonblur(){
      let e = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (e.test(this.user.email)){
        this.emailErr = '邮箱格式正确'
      }else {
        this.user.email = ''
      }
    }
  }
}
</script>

<style scoped>
.background{
  background: url('../../assets/login5.jpg') no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  margin-top: -10px;
  margin-left: -10px;
  position: fixed;
}
.loginback{
  width: 60%;
  height: 55%;
  margin-top: 5%;
  margin-left: 20%;
  padding: 40px 20px;
  border: 1px solid var(--el-border-color);
  border-radius: 10px;
  background-color: rgba(240, 240, 240);
  box-shadow: 1px 1px 1px 1px white;
}
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