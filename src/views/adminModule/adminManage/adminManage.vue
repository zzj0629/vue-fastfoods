<template>
  <div><h1>管理员列表</h1></div>
  <div style="width: 100%;">
    <el-divider style="margin-top: -10px"/>
    <el-form :model="user" rules="rules" style="margin: 5px 5px 5px 50px">
      <div style="display: inline-block;width: 500px">
        管理员：<el-input v-model="searchData.username" placeholder="按管理员名称搜索" clearable style="width: 50%;margin-top: -30px"/>
      </div>
      <div style="display: inline-block;width: 300px">
        性别：
        <el-radio v-model="searchData.sex" label="男" size="large">男</el-radio>
        <el-radio v-model="searchData.sex" label="女" size="large">女</el-radio>
        <el-radio v-model="searchData.sex" label="" size="large">不限</el-radio>
      </div>
      <div style="display: inline-block;width: 300px">
        <el-button v-on:click="search" type="primary" >搜索</el-button>
      </div>
      <div >
        <el-table :data="tableData" style="width: 100%;" height="450" stripe >
          <el-table-column prop="num" label="编号" width="180" />
          <el-table-column prop="username" label="管理员名称" width="180" />
          <el-table-column prop="gender" label="性别" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column label="操作" >
            <template #default="scope">
              <el-button
                round
                color="#626aef"
                @click="adminUpdata(scope.$index, scope.row)"
            >修改</el-button>
              <el-button
                  round
                  type="danger"
                  @click="adminDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
  </div>
  <el-divider style="margin-top: 10px"/>
<!--修改dealog-->
  <el-dialog
      v-model="dialogVisible"
      title="修改"
      width="30%"
      draggable
  >
<!--    内容-->
    <el-form :model="admin" rules="rules" style="margin: 5px 5px 5px 50px">
      <el-form-item label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;账号: " prop="username">
        <el-input type="text"
                  v-model="admin.username"
                  placeholder="请输入账号"
                  autocomplete="off"
                  style="width: 60%;"
        ></el-input>
      </el-form-item>
      <el-form-item label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密码: " prop="password" >
        <el-input type="password"
                  placeholder="请输入密码"
                  show-password
                  v-model="admin.password"
                  autocomplete="off"
                  style="width: 60%;"
                  onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="password2" >
        <el-input type="password"
                  placeholder="请确认密码"
                  show-password
                  v-model="admin.password2"
                  autocomplete="off"
                  style="width: 60%;"
                  onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
        ></el-input>
      </el-form-item>
      <el-form-item label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱: " prop="email" >
        <el-input type="text"
                  placeholder="email"
                  v-model="admin.email"
                  autocomplete="off"
                  style="width: 60%;"
        ></el-input>
      </el-form-item>
      <el-form-item style="margin-left: 17%">
        <el-radio-group v-model="admin.gender">
          <el-radio label="男" border class="radio">男</el-radio>
          <el-radio label="女" border class="radio">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">返回</el-button>
        <el-button type="primary" @click="updateAdminRequest()"
        >修改</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import Axios from 'axios'
import $store from '../../../store/index.js'
import {ElMessage} from "element-plus";
import {Encrypt, Decrypt} from '../../../AES/aes.js';
export default {
  name: "adminManage",
  data(){
    return{
      searchData:{
        username: '',
        sex: '',
      },tableData: [],
      user: {
        num:'',
        id:'',
        username: '',
        sex: '',
        email:'',
      },
      admin:{
        id:null,
        username:'',
        password:'',
        password2:'',
        role:0,
        email:'',
        gender:'',
      },
      dialogVisible:false,
    }
  },$store,methods:{
    search(){
      let url=$store.state.url+"selectAdminWhereCondition?username="+this.searchData.username+"&gender="+this.searchData.sex
      Axios.post(url).then(response=> {
        this.tableData = response.data
        for (let i = 1; i <= response.data.length; i++) {
          this.tableData[i - 1].num = i;
        }
        if (response.data == "") {
          ElMessage({
            message: '此分类下暂无用户,请更换条件',
            type: 'error',
          })
        }
      })
    },adminUpdata(index,data){
      // alert(data.id+data.username+data.password+data.email+data.gender)
      this.admin.id=data.id;
      this.admin.username=data.username;
      this.admin.password=Decrypt(data.password);
      this.admin.email=data.email;
      this.admin.gender=data.gender;
      this.dialogVisible=true;
    },updateAdminRequest(){
      if(this.admin.password!==this.admin.password2){
        ElMessage({
          message: '两次密码输入不一致',
          type: 'error',
        })
      }else if(this.admin.username=="" || this.admin.password==""){
        ElMessage({
          message: '用户名和密码不能为空',
          type: 'error',
        })
      }else{
        let url=$store.state.url+"updateAdminById?id="+this.admin.id+"&username="+this.admin.username+"&password="+
            Encrypt(this.admin.password)+"&email="+this.admin.email+"&gender="+this.admin.gender
        Axios.post(url).then(response=>{
          ElMessage({
            message: '修改成功',
            type: 'success',
          })
          this.$router.push({path:'/adminMenu/index',query:{path:'adminManage'} })
        }).catch(err=>{
          alert("错误")
          console.log(err)
        })
      }
    },adminDelete(index,data){
      if(data.id==this.$cookies.get("id")){
        ElMessage({
          message: '请不要删除你自己',
          type: 'error',
        })
      }else{
        let url=$store.state.url+"deleteAdminById?id="+data.id
        Axios.post(url).then(response=>{
          if(response.data==1){
            ElMessage({
              message: '删除成功',
              type: 'success',
            })
            this.$router.push({path:'/adminMenu/index',query:{path:'adminManage'} })
          }else{
            ElMessage({
              message: '删除失败',
              type: 'error',
            })
          }
        }).catch(error=>{
          alert("错误")
          console.log(error)
        })
      }
    }
  },mounted(){
    let url = $store.state.url+"selectAdminWhereAdmin"
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