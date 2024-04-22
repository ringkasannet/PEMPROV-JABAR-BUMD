<template>
  <div id="main_container">
    <div id="header_container" class="horizontal_container">
      <div id="logo_container"> 
        <img src="/Logo Pemprov Jabar.png" alt="Logo"
         style=
          "max-width: 50px;
           margin: 5px;">
      </div>
      <div id="tittle_logo" class="horizontal_container">
        Pemerintah <br> Provinsi Jawa Barat
      </div>
      <div id="title_container" class="centered_text">
        <h2 class="main_tittle">
          Pemetaan Fungsi BUMD Pemprov Jawa Barat
        </h2>
      </div>
    </div>
    <div id="chat_container">
      <ChatApp />
    </div>
    <div id="rekomendasi_container">
      <img src="/Migas Utama Jabar.png" alt="Migas"
      style="
      max-width: 175px;
      margin: 20px;">
    </div>
  </div>
</template>

<script setup>

import ChatApp from './components/ChatApp.vue';

</script>

<style scoped>
.main_tittle{
  font-family: Helvetica;
  font-weight: lighter;
  margin: 15px;
}

.horizontal_container{
  display: flex;
  flex-direction: row;
}

.centered_text{
  margin: 0 auto;
}

#chat_container {
  margin-top: 80px;
}

#tittle_logo {
  margin: 10px;
}

#rekomendasi_container{
  background: grey;
  margin: 5px;
  margin-top: 20px;
  width: 900px;
  height: auto;
}
</style>