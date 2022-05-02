<template>
  <div class="ts">
    <div>
      <h1>我的购物车</h1>
      <el-divider style="margin-top: -10px"/>
      <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算！</span>
      <el-divider/>
    </div>
    <el-table :data="tableData" style="height: 400px; border: 1px solid black" stripe>
      <el-table-column prop="snum" label="编号" width="60" />
      <el-table-column prop="gid" label="商品名称" width="180" />
      <el-table-column prop="price" label="价格" width="120" />
      <el-table-column prop="num" label="数量" width="180" />
      <el-table-column prop="money" label="小计" width="120" />
      <el-table-column label="操作" >
        <el-button
            round
            type="danger"
            @click="deleteSP(scope.$index, scope.row)"
        >删除</el-button>
      </el-table-column>
    </el-table>
    <div class="jiesuan">
      <br/><span>商品金额总计：￥&nbsp;50&nbsp;元</span><br/><br/>
      <el-button @click="addAddress()" size="large" type="primary">清空购物车</el-button>
      <el-button @click="addAddress()" size="large" type="primary">结算</el-button>
    </div>
  </div>


<!--  <template>-->
<!--    <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />-->
<!--  </template>-->
</template>

<script>
//lang="ts" setup
import { ref } from 'vue'

export default {
  name: "cart",
  data(){
    return{
      // num : ref(1),
      // handleChange : (value: number) => {
      //   console.log(value)
      // }
    }
  },methods:{

  },mounted() {

  }
}
</script>

<style scoped>
.ts{
  width: 70%;
  margin-left: 15%;
}
.jiesuan{
  float: right;
  margin-right: 5%;
  text-align: center;
}
</style>