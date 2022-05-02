<template>
  <div>
    <h1 style="float: left">我的收货地址</h1>
    <el-button class="addAddress" @click="addAddress()" size="large" type="primary">添加收货地址</el-button>
  </div>
  <el-divider/>
  <div >
    <el-table :data="tableData" style="width: 100%;" height="500" stripe>
      <el-table-column prop="num" label="编号" width="180" />
      <el-table-column prop="name" label="收件人" width="180" />
      <el-table-column prop="phone" label="手机号" width="180" />
      <el-table-column prop="detail" label="地址" width="360" />
      <el-table-column label="操作" >
        <template #default="scope">
          <el-button
              round
              type="primary"
              @click="updateAddress(scope.$index, scope.row)"
          >修改</el-button>
          <el-button
              round
              type="danger"
              @click="deleteDZ(scope.$index, scope.row)"
          >删除</el-button>
          <el-button
              round
              type="success"
              @click="setToDefault(scope.$index, scope.row)"
              v-if="scope.row.flag==1"
          >设为默认</el-button>
          <el-button
              round
              type="info"
              @click="removeDefault(scope.$index, scope.row)"
              v-if="scope.row.flag==2"
          >解除默认</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!--添加地址-->
  <el-dialog v-model="dialogVisible1" title="添加收货地址" width="40%" draggable>
    <el-form :model="addaddress" rules="rules" style="margin: 5px 5px 5px 50px">
      <el-form-item label="收件人姓名: " prop="name" style="width: 100%;">
        <el-input type="text"
                  placeholder="请输入收件人姓名"
                  autocomplete="off"
                  style="width: 62%;"
                  v-model="addaddress.name"
                  v-on:blur="nameonblur"
        ></el-input>
        <p class="tishi">{{nameErr}}</p>
      </el-form-item>
      <el-form-item label="收件人手机号: " prop="phone" style="width: 100%;">
        <el-input type="text"
                  placeholder="请输入收件人手机号"
                  autocomplete="off"
                  style="width: 60%;"
                  v-model="addaddress.phone"
                  v-on:blur="phoneonblur"
        ></el-input>
        <p class="tishi">{{phoneErr}}</p>
      </el-form-item>
      <el-form-item label="收货地址: " prop="detail" style="width: 100%;">
        <el-input type="text"
                  placeholder="请输入收货地址"
                  autocomplete="off"
                  style="width: 64%;"
                  v-model="addaddress.detail"
                  v-on:blur="detailonblur"
        ></el-input>
        <p class="tishi">{{detailErr}}</p>
      </el-form-item>
      <el-button type="primary" style="width: 100px" @click="add()">添加</el-button>
      <el-button style="width: 100px" @click="dialogVisible1 = false">返回</el-button>
    </el-form>
  </el-dialog>
  <!--修改地址-->
  <el-dialog v-model="dialogVisible2" title="添加收货地址" width="40%" draggable>
    <el-form :model="updateaddress" rules="rules" style="margin: 5px 5px 5px 50px">
      <el-form-item label="收件人姓名: " prop="name" style="width: 100%;">
        <el-input type="text"
                  placeholder="请输入收件人姓名"
                  autocomplete="off"
                  style="width: 62%;"
                  v-model="updateaddress.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="收件人手机号: " prop="phone" style="width: 100%;">
        <el-input type="text"
                  placeholder="请输入收件人手机号"
                  autocomplete="off"
                  style="width: 60%;"
                  v-model="updateaddress.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="收货地址: " prop="detail" style="width: 100%;">
        <el-input type="text"
                  placeholder="请输入收货地址"
                  autocomplete="off"
                  style="width: 64%;"
                  v-model="updateaddress.detail"
        ></el-input>
      </el-form-item>
      <el-button type="primary" style="width: 100px" @click="update()">修改</el-button>
      <el-button style="width: 100px" @click="dialogVisible2 = false">返回</el-button>
    </el-form>
  </el-dialog>
</template>

<script>
import $store from "@/store";
import Axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "userAddress",
  data(){
    return{
      id:'',
      flag:'',
      tableData:[],
      addaddress:{
        name:'',
        phone:'',
        detail:''
      },updateaddress:{
        name:'',
        phone:'',
        detail:''
      },
      dialogVisible1:false,
      dialogVisible2:false,
      nameErr:'* 请输入收件人姓名',
      phoneErr:'* 请输入收件人手机号',
      detailErr:'* 请输入收货地址',
    }
  },methods:{
    addAddress(){
      this.dialogVisible1=true;
    },nameonblur(){
      if (this.addaddress.name != "") {
        this.nameErr = '*'
      }
    },phoneonblur(){
      let ph = /^1\d{10}$/;
      if (ph.test(this.addaddress.phone)) {
        this.phoneErr = '*'
      }else{
        alert("请输入正确电话号码！")
      }
    },detailonblur(){
      if (this.addaddress.detail != "") {
        this.detailErr = '*'
      }
    },add() {
      if (this.nameErr != '*' || this.phoneErr != '*' || this.detailErr != '*') {
        ElMessage({
          message: '请正确输入数据',
          type: 'error',
        })
      } else {
        let url = $store.state.url+"addAddress?name="+this.addaddress.name+"&phone="+
            this.addaddress.phone+"&detail="+this.addaddress.detail+"&uid="+this.uid
        Axios.post(url).then(response => {
          if (response.data === 1) {
            ElMessage({
              message: '添加成功',
              type: 'success',
            })
            this.dialogVisible1=false;
            this.$router.push({path:'/userMenu/usermenuindex',query:{path:'userAddress'} })
          } else {
            ElMessage('添加失败')
          }
        }).catch(error => {
          alert("错误")
          console.log(error)
        })
      }
    },updateAddress(index,data){
      this.updateaddress.id=data.id;
      this.updateaddress.name=data.name;
      this.updateaddress.phone=data.phone;
      this.updateaddress.detail=data.detail;
      this.dialogVisible2=true;
    },update(){
      let url = $store.state.url+"updateById?name="+this.updateaddress.name+
          "&phone="+this.updateaddress.phone+"&detail="+this.updateaddress.detail+"&id="+this.updateaddress.id
        Axios.post(url).then(response => {
        if (response.data === 1) {
          ElMessage({
            message: '修改成功',
            type: 'success',
          })
          this.dialogVisible1=false;
          this.$router.push({path:'/userMenu/usermenuindex',query:{path:'userAddress'} })
        } else {
          ElMessage('修改失败')
        }
      }).catch(error => {
        alert("错误")
        console.log(error)
      })
    },deleteDZ(index,data){
      this.id=data.id;
      let url=$store.state.url+"deleteById?id="+this.id
      Axios.post(url).then(response=>{
        ElMessage({
          message: '删除成功',
          type: 'success',
        })
        this.$router.push({path:'/userMenu/usermenuindex',query:{path:'userAddress'} })
      }).catch(err=>{
        alert("错误")
        console.log(err)
      })
    },setToDefault(index,data){
      this.uid = this.$cookies.get("id")
      let url1 = $store.state.url+"lookAllByUid?uid="+this.uid
      Axios.post(url1).then(response=>{
        let a=0;
        for(let i=0;i<response.data.length;i++){
          if(response.data[i].flag==2){
           a=a+1;
          }
        }
        if(a!=0){
          ElMessage({
            message:'请取消默认再设置默认',
            type:'error'
          })
        }else{
          this.id=data.id;
          let url=$store.state.url+"updateMoRen?id="+this.id
          Axios.post(url).then(response=>{
            ElMessage({
              message: '已设为默认地址',
              type: 'success',
            })
            this.$router.push({path:'/userMenu/usermenuindex',query:{path:'userAddress'} })
          }).catch(err=>{
            alert("错误")
            console.log(err)
          })
        }
      })
    },removeDefault(index,data){
      this.id=data.id;
      let url=$store.state.url+"updateRemoveMoRen?id="+this.id
      Axios.post(url).then(response=>{
        ElMessage({
          message: '已解除默认地址',
          type: 'success',
        })
        this.$router.push({path:'/userMenu/usermenuindex',query:{path:'userAddress'} })
      }).catch(err=>{
        alert("错误")
        console.log(err)
      })
    }
  },mounted() {
    this.uid = this.$cookies.get("id")
    let url = $store.state.url+"lookAllByUid?uid="+this.uid
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
  .addAddress{
    margin-top: 15px;
    margin-left: 60%;
  }
  .tishi{
    color: red;
    margin-left: 20px;
    font-size: 5px;
  }
</style>