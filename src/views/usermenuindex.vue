<template>

</template>

<script>
export default {
  name: "usermenuindex",
  data(){
    let request=this.$route.query.path;
    if(request==='userIndex'){
      this.$router.push({
        path: '/userMenu/userLookCommodity',
        query:{
          typeName:this.$route.query.typeName,
          name:this.$route.query.name,
          id:this.$route.query.id
        }
      })
    }else if(request==='commodityDetails'){
      this.$router.push({path: '/userMenu/commodityDetails',
        query: {id: this.$route.query.id}})
    }else if(request==='userAddress'){
      this.$router.push({path: '/userMenu/userAddress'})
    }else if(request==='cart'){
      this.$router.push({path: '/userMenu/cart'})
    }else if(request==='myorder'){
      this.$router.push({path: '/userMenu/myOrder'})
    }else if(request==='lookuser'){
      this.$router.push({path: '/userMenu/lookuser'})
    }
  }
}
</script>

<style scoped>

</style>