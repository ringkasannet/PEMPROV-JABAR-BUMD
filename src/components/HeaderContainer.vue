<template>
  <div id="header_container" class="header_container">
    <div class="logo_container" @click="">
      <img src="/Logo Pemprov Jabar.png" alt="Logo" class="logo_container" />
    </div>
    <div id="tittle_logo" class="pemprov_container">
      <h3>
        <RouterLink to="/">
          Pemerintah <br />
          Provinsi Jawa Barat
        </RouterLink>
      </h3>
    </div>
    <div class="menu_container">
      <div class="menu_item"><RouterLink class="put_low" to="/">Home</RouterLink></div>
      <div class="menu_item"><RouterLink class="put_low" to="/admin">Admin</RouterLink></div>
      <div class="menu_item"><RouterLink class="put_low" to="/">Documentation</RouterLink></div>
      <div class="menu_item"><RouterLink class="put_low" to="/">Source Code</RouterLink></div>
      <div class="menu_item">
        <RouterLink class="put_low" to="/">
          Login
          <img class="user-icon" src="../assets/user.png" />
        </RouterLink>
      </div>

      <!-- <h1>Biro Hukum <br/>Pemerintah Provinsi Jawa Barat</h1> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<style scoped>
.header_container {
  /* background-color: green; */
  display: flex;
  text-align: left;
  width: 100%;
  padding: 10px 30px 0px 30px;
}
.logo_container {
  flex: 1;
}
.pemprov_container {
  flex: 14;
}
.menu_container {
  flex: 20;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
}

.user-icon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  /* margin-top:50px; */
}
h3 {
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
}
a {
  text-decoration: none;
  color: rgb(13, 75, 53);
  font-size: 1.4em;
  font-family: Helvetica;
}
.menu_item {
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  margin: 0 25px;
}
.put_low {
  margin-top: auto;
}
.bottom_border {
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
.pemprov_container {
  cursor: pointer;
}

.pemprov_container:hover {
  background-color: white;
}
.logo_container {
  max-width: 40px;
  margin: 5px;
  padding-top: 8px;
  /* cursor: pointer; */
}

@media (max-width: 850px) {
  .menu_container {
    display: none;
  }
  h3 {
    font-size: 0.9em;
  }
  /* .header_container {
    background-color: rgb(240, 240, 240);
  } */
  .logo_container {
  max-width: 40px;
  margin: 5px;
  padding-top: 2px;
  /* cursor: pointer; */
}

}
</style>
