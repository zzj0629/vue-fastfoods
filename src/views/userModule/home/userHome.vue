<template>
  <el-carousel height="350px">
    <el-carousel-item v-for="item in carouselImg" :key="item">
      <h3 class="small">
        <el-image :src="item.img"/>
      </h3>
    </el-carousel-item>
  </el-carousel>


</template>

<script>
export default {
  name: "userHome",
  data() {
    return {
      carouselImg:[
        {
          img:'http://localhost:8080/uploadFile/8f7e24c028ce4e12b810c80730f4d0bc.jpg'
        },{
          img:'http://localhost:8080/uploadFile/70ef6da10dbb4118833b73ecdc640059.jpg'
        },{
          img:'http://localhost:8080/uploadFile/827aa5f795f6443fa74a0f6a438e576f.jpg'
        }
      ]


    }
  }, methods: {}, mounted() {
  }
}
</script>

<style scoped>

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}



</style>