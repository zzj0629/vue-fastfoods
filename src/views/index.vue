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
    }
  }
}
</script>

<style scoped>

</style>