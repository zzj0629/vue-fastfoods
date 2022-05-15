<template>
  <div class="yh">
    <h1>用户信息</h1>
    <el-divider/>
    <div>
      <el-descriptions border :column="1">
        <el-descriptions-item label="用户名">{{username}}</el-descriptions-item>
        <el-descriptions-item label="性别">{{sex}}</el-descriptions-item>
        <el-descriptions-item label="邮箱">  {{email}}</el-descriptions-item>
        <el-descriptions-item label="账户创建时间">{{time}}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div>
      <br/>
      <el-button @click="updata()" size="large" type="primary">修改信息</el-button>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="修改用户信息" width="30%" draggable>
      <el-form :model="user" rules="rules" style="margin: 5px 5px 5px 50px">
        <el-form-item label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;账号: " prop="username">
          <el-input type="text"
                    v-model="user.username"
                    placeholder="请输入账号"
                    autocomplete="off"
                    style="width: 60%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密码: " prop="password" >
          <el-input type="password"
                    placeholder="请输入密码"
                    show-password
                    v-model="user.password"
                    autocomplete="off"
                    style="width: 60%;"
                    onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="password2" >
          <el-input type="password"
                    placeholder="请确认密码"
                    show-password
                    v-model="user.password2"
                    autocomplete="off"
                    style="width: 60%;"
                    onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
          ></el-input>
        </el-form-item>
        <el-form-item label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱: " prop="email" >
          <el-input type="text"
                    placeholder="email"
                    v-model="user.email"
                    autocomplete="off"
                    style="width: 60%;"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 17%">
          <el-radio-group v-model="user.gender">
            <el-radio label="男" border class="radio">男</el-radio>
            <el-radio label="女" border class="radio">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="text-align: center">
          <span class="dialog-footer">
          <el-button @click="dialogVisible = false">返回</el-button>
          <el-button type="primary" @click="updateUserRequest()">修改</el-button>
        </span>
        </div>
      </template>
  </el-dialog>
</template>

<script>
import $store from "@/store";
import Axios from "axios";
import {ElMessage} from "element-plus";
import {Encrypt, Decrypt} from '../../../AES/aes.js';

export default {
  name: "lookuser",
  data(){
    return{
      userData:[],
      username:'',
      sex:'',
      email:'',
      time:'',
      user:[],
      dialogVisible:false,
    }
  },methods:{
    updata(){
      this.user.id=this.uid;
      this.user.username=this.username;
      this.user.password=this.password;
      this.user.email=this.email;
      this.user.gender=this.sex;
      this.dialogVisible=true
    },updateUserRequest(){
      if(this.user.password!==this.user.password2){
        ElMessage({
          message: '两次密码输入不一致',
          type: 'error',
        })
      }else if(this.user.username=="" || this.user.password==""){
        ElMessage({
          message: '用户名和密码不能为空',
          type: 'error',
        })
      }else{
        let url=$store.state.url+"updateUserById?id="+this.user.id+"&username="+this.user.username+"&password="+
            Encrypt(this.user.password)+"&email="+this.user.email+"&gender="+this.user.gender
        Axios.post(url).then(response=>{
          ElMessage({
            message: '修改成功',
            type: 'success',
          })
          this.$router.push({path:'/userMenu/usermenuindex',query:{path:'lookuser'} })
        }).catch(err=>{
          alert("错误")
          console.log(err)
        })
      }
    }
  },mounted(){
    this.uid = this.$cookies.get("id")
    let selectUserById = $store.state.url + "selectUserById?id=" + this.uid;
    Axios.post(selectUserById).then(response => {
      this.userData = response.data;
      this.username = this.userData[0].username
      this.password = Decrypt(this.userData[0].password)
      this.sex = this.userData[0].gender
      this.email = this.userData[0].email
      this.time = this.userData[0].createtime
    })
  }
}
</script>

<style scoped>
.yh{
  width: 20%;
  margin-left: 40%;
  text-align: center;
}

</style>