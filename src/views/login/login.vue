<template>
  <div class="background">
    <div class="loginback">
      <div style="margin-top: -30px">
        <h3 style="display: inline-block">欢迎登录速食品售卖系统</h3>
        <el-button type="text" style="float: right;margin-top: 10px" v-on:click="adminbutton">{{ admin }}</el-button>
        <el-divider style="margin-top: -10px"/>
      </div>
      <el-form :model="user" rules="rules" style="margin: 5px 5px 5px 50px">
        <el-form-item label="账号: " prop="username">
          <el-input type="text"
                    v-model="user.username"
                    placeholder="请输入账号"
                    autocomplete="off"
                    style="width: 40%;"
                    v-on:blur="useronblur"
          ></el-input>
          <p class="tishi" >{{ userErr }}</p>
        </el-form-item>
        <el-form-item label="密码: " prop="password" >
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

        <el-divider />
        <el-form-item style="margin-left: 28%;">
          <el-button type="primary" @click="login()" size="large" style="width: 100px">{{loginbutton}}</el-button>
          <el-button @click="account()" size="large" style="width: 100px" v-if="this.admin==='管理员'">注册</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import $store from '../../store/index.js'
import {ElMessage} from "element-plus";
import {Encrypt, Decrypt} from '../../AES/aes.js';
export default {
  name: "login",
  data(){
    return{
      user:{
        username:'',
        password:'',
        role:1
      },
      userErr:'*请输入2-20位账号',
      passErr:'*请输入6-20位密码',
      admin:'管理员',
      loginbutton:'用户登录'
    }
  },$store,methods:{
    adminbutton(){
      if(this.admin=='管理员'){
        this.admin='用户'
        this.user.role=0
        this.loginbutton='管理员登录'
        this.userErr='*请输入4-20位账号'
        this.passErr='*请输入4-20位密码'
      }else{
        this.admin='管理员'
        this.user.role=1
        this.loginbutton='用户登录'
      }
    },
    login(){
      if(this.userErr!='*' || this.passErr!='*'){
        ElMessage({
          message: '请正确输入数据',
          type: 'error',
        })
      }else{
        let url=$store.state.url+"login?username="+this.user.username+"&role="+this.user.role
        Axios.post(url).then(response => {//请求成功处理
              if(response.data==''){
                console.log(response.data)
                ElMessage({ message: '暂无此用户', type: 'error', })
              }else if(Decrypt(response.data.password)!=this.user.password){
                ElMessage({ message: '密码输入错误', type: 'error', })
              }else{
                this.selectAndInsertCart(response.data.id);
                ElMessage({ message: '登录成功', type: 'success',})
                this.$cookies.set("id",response.data.id,"1d");
                this.$cookies.set("username",response.data.username,"1d");
                this.$cookies.set("password",response.data.password,"1d");
                this.$cookies.set("role",response.data.role,"1d");
                this.$cookies.set("email",response.data.email,"1d");
                this.$cookies.set("gender",response.data.gender,"1d");
                this.$cookies.set("flag",response.data.flag,"1d");
                this.$cookies.set("activatecode",response.data.activatecode,"1d");
                this.$cookies.set("createtime",response.data.createtime,"1d");
                if(this.user.role===0){
                  this.$router.push({path: '/adminMenu'})
                }else{
                  this.$router.push({path: '/userMenu/userHome'})
                }
              }
            })
            .catch(function (error) {//请求失败处理
              alert("错误");
              console.log(error);
            });
      }

    },selectAndInsertCart(uid){
      let url=$store.state.url+"selectUserCart?uid="+uid
      Axios.post(url).then(response=>{
        if(response.data==''){
          let url1=$store.state.url+"addNewUserCard?uid="+uid
          Axios.post(url1).then(response=>{
          }).catch(Err=>{
            alert("错误");
          })
        }
      })
    },account(){
      this.$router.push({path: '/count'})
    },
    useronblur(){
      if(this.user.username.length<2 || this.user.username.length>20){
        this.userErr='* 用户名在2-20位之间'
      }else{
        this.userErr='*'
      }
    }, passonblur(){
      if(this.user.password.length<6 || this.user.password.length>20){
        this.passtishi=true;
        this.passErr='* 密码在6-20位之间'
      }else{
        this.passtishi=false;
        this.passErr='*'
      }
    },
  },mounted() {
    this.$cookies.remove("username");
    this.$cookies.remove("password");
    this.$cookies.remove("role")
    this.$cookies.remove("email")
    this.$cookies.remove("gender")
    this.$cookies.remove("flag")
    this.$cookies.remove("activatecode")
    this.$cookies.remove("createtime")
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
  height: 30%;
  margin-top: 10%;
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
</style>