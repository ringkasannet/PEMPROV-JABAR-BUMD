<template>
  <div>
    <div class="main_container right_aligned_text">
      <div class="">
        <h1 class="main_tittle">Smart <span class="green_color">Asistant </span></h1>
        <h2 class="main_tittle">Pemerintah Provinsi Jawa Barat</h2>
      </div>
      <div class="tools_card_container">
        <div class="tools_card" @click="navigateToBUMD">
          <h2 class="card_title">Matching Penugasan BUMD</h2>
          <img class="card_image" src="../assets/infographic.gif" alt="" />
          <p>Sistem pintar yang dapat membantu memetakan potensi penugasan BUMD sesuai dengan Tujuan dan Ruang Lingkup Pendirian</p>
        </div>
        <div class="tools_card">
          <h2 class="card_title">Chatbot Pemanfaatan Aset</h2>
          <img class="card_image" src="../assets/sun.gif" alt="" />
          <p>Sistem pintar yang dapat membantu memetakan potensi penugasan BUMD sesuai dengan Tujuan dan Ruang Lingkup Pendirian</p>
        </div>
        <div class="tools_card">
          <h2 class="card_title">Smart Asisten Dokumen Hukum</h2>
          <img class="card_image" src="../assets/connection.gif" alt="" />
          <p>Sistem pintar yang dapat membantu memetakan potensi penugasan BUMD sesuai dengan Tujuan dan Ruang Lingkup Pendirian</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function navigateToBUMD() {
  console.log("navigateToBUMD");
  router.push("/bumd");
}
function click() {
  console.log("clicked");
}
</script>
<style scoped>
p {
  text-align: left;
}
.tools_card_container {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  /* flex-wrap:wrap; */
}
.card_title {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
}

.card_image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  display: block;
  border-radius: 10px;
  margin: 10px auto;

}
.tools_card {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 0 20px;
  cursor: pointer;
}
.tools_card:hover {
  background-color: rgba(208, 208, 208, 0.5);
  transition: 0.5s;
}

.main_container {
  background-image: url("../assets/19449741.jpg");
  background-repeat: repeat-x;
  background-size: cover;
  /* height: 90vh; */
  min-height: 90vh;
  padding: 0 40px 0 40px;
  text-align: left;
}

.bottom_border {
  border-bottom: 1px solid rgb(211, 211, 211);
}
.green_color {
  color: rgb(0, 85, 0);
}
.right_aligned_text {
  text-align: right;
}
h1.main_tittle {
  font-family: Helvetica;
  font-weight: lighter;
  font-size: 8em;
  margin: 0;
  padding: 0;
  /* margin: 15px; */
}
h2.main_tittle {
  font-family: Helvetica;
  font-weight: normal;
  font-size: 4em;
  margin: 0;
  padding: 0;
}

@media (max-width: 860px) {
  .tools_card_container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
  }
  .tools_card {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    width: 300px;
    margin: 20px auto;
  }
}
</style>
