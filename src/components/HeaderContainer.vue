<template>
    <div id="header_container" class="header_container">
      <div class="logo_container"> 
        <img src="/Logo Pemprov Jabar.png" alt="Logo"
         style=
          "max-width: 40px;
           margin: 5px;
           padding-top:12px;
           ">
      </div>
      <div id="tittle_logo" class="pemprov_container">
        <h3> Pemerintah <br> Provinsi Jawa Barat </h3>
      </div>
      <div class="menu_container" >
        <div class="menu_item"> <RouterLink class="put_low" to="/">Home</RouterLink> </div>
        <div class="menu_item"> <RouterLink class="put_low" to="/">Admin</RouterLink> </div>
        <div class="menu_item"> <RouterLink class="put_low" to="/">Documentation</RouterLink> </div>
        <div class="menu_item"> <RouterLink class="put_low" to="/">Source Code</RouterLink> </div>
        <div class="menu_item"> <RouterLink class="put_low" to="/">
          Login
          <img class="user-icon" src="../assets/user.png">
        </RouterLink> </div>

        <!-- <h1>Biro Hukum <br/>Pemerintah Provinsi Jawa Barat</h1> -->
      </div>
    </div>
  </template>
  
<script setup lang="ts">
</script>
  
<style scoped>

.header_container{
  /* background-color: green; */
  display: flex;
  text-align: left;
  width:100%;
  padding:10px 30px 0px 30px;
}
.logo_container{
  flex:1;
}
.pemprov_container{
  flex:14;
}
.menu_container{
  flex:20;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;

}

.user-icon{
  width: 20px;
  height: 20px;
  margin-left: 5px;
  /* margin-top:50px; */
}
h3{
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
}
a{
  text-decoration: none;
  color: rgb(13, 75, 53);
  font-size: 1.4em;
  font-family: Helvetica;

}
.menu_item{
  display:flex;
  flex-direction: column;
  padding-bottom: 10px;
  margin: 0 25px;

}
.put_low{
  margin-top: auto;
}
.bottom_border{
  border-bottom: 1px solid rgb(211, 211, 211);
}
.main_tittle {
    font-family: Helvetica;
    font-weight: lighter;
    font-size: 6em;
    margin: 15px;
}
  
.horizontal_container {
    display: flex;
    flex-direction: row;
}

.centered_text {
    margin: 0 auto;
}
  
#tittle_logo {
    margin: 10px;
}

</style>
  