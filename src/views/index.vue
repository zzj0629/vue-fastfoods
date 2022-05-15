<template>

</template>

<script>
export default {
  name: "index",
  data(){
    let request=this.$route.query.path;
    if(request==='userManage'){
      this.$router.push({path: '/adminMenu/userManage'})
    }else if(request==='adminManage'){
      this.$router.push({path: '/adminMenu/adminManage'})
    }else if(request==='lookCategory'){
      this.$router.push({path: '/adminMenu/lookCategory'})
    }else if(request==='lookCommodity'){
      this.$router.push({path: '/adminMenu/lookCommodity'})
    }else if(request==='orderManage'){
      this.$router.push({path: '/adminMenu/orderManage'})
    }else if(request==='userIndex'){
      this.$router.push({path: '/userMenu/userLookCommodity',query:{typeName:this.$route.query.typeName}})
    }else if(request==='addCommodity'){
      this.$router.push({path: '/adminMenu/addCommodity'})
    }
  }
}
</script>

<style scoped>

</style>