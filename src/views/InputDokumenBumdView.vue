<template>
  <div id="main_container">
    <div id="title_container" class="fadeIn">
      <div id="title">
        <h1 class="title">Form <span style="color: green;">Dokumen BUMD</span></h1>
      </div>
    </div>
    <div v-if="loading" id="loading_container">
      <img class="loading_image" src="../assets/work-in-progress.gif" alt="Loading...">
    </div>
    <div v-else>
      <div id="form_container" class="fadeIn" v-if="!isSubmitted">
        <div id="form_app">
          <form @submit.prevent="handleSubmit" id="form_container">
            <div class="form-group">
              <label for="nama">Nama:</label>
              <input id="name" type="text" v-model="formData.name" placeholder="Contoh: PT. Wisma Sakti" required>
            </div>
            <div class="form-group">
              <label for="jenis">Jenis Peraturan:</label>
              <v-select v-model="formData.jenis" :options="['Peraturan Daerah', 'Peraturan Gubernur']"></v-select>
            </div>
            <div class="form-group">
              <label for="nomor">Nomor Peraturan:</label>
              <input id="nomor" type="number" v-model.number="formData.nomor" placeholder="Contoh: 2" required>
            </div>
            <div class="form-group">
              <label for="tahun">Tahun:</label>
              <input id="tahun" type="text" v-model="formData.tahun" placeholder="2001" required>
            </div>
            <div class="form-group">
              <label for="tujuan">Tujuan:</label>
              <textarea id="tujuan" v-model="formData.tujuan" placeholder="Contoh: ...." required></textarea>
            </div>
            <div class="form-group">
              <label for="ruang_lingkup">Ruang Lingkup:</label>
              <textarea id="ruang_lingkup" v-model="formData.ruang_lingkup"
                placeholder="Contoh: Pasal 1 &#10;        Dalam Peraturan Gubernur ini, ..." required>
              </textarea>
            </div>
            <button type="submit" id="submit_button">Submit</button>
            <button @click="backToList" id="back_button"> << Kembali </button>
          </form>
        </div>
      </div>
      <div v-if="isSubmitted" id="success_message">
        <h2>Dokumen berhasil disimpan</h2>
        <!-- <button @click="backToList" id="add_button"> << Kembali</button>
        <button @click="addNewForm" id="add_button">Tambahkan Dokumen Baru</button> -->
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { useRouter } from 'vue-router';

const formData = ref(dataDokumen());
const isSubmitted = ref(false);
const loading = ref(false);
const route = useRouter();

function dataDokumen() {
  return {
    name: '',
    jenis: '',
    nomor: '',
    tahun: '',
    tujuan: '',
    ruang_lingkup: '',
  };
}

async function handleSubmit() {
  if (validasiForm()) {
    try {
      loading.value = true;
      const response = await fetch('http://localhost:3000/admin/inputBumd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.value),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      loading.value = false;
      isSubmitted.value = true;
      backToList()
    } catch (error) {
      alert('Submit data gagal');
      loading.value = false;
    }
  } else {
    alert('Tolong isi semua form');
  }
}

function validasiForm() {
  return (
    formData.value.name &&
    formData.value.jenis &&
    formData.value.nomor &&
    formData.value.tahun &&
    formData.value.tujuan &&
    formData.value.ruang_lingkup
  );
}

function backToList() {
  route.push("/ListDokumenBUMD");
}

// function addNewForm() {
//   isSubmitted.value = false;
//   formData.value = dataDokumen();
// }
</script>

<style scoped>
#main_container {
  width: 100vw;
  min-height: 100vh;
  background-image: url("../assets/19449741.jpg");
  background-size: cover;
  background-repeat: repeat-x;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#title_container {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
}

h1.title {
  font-family: Helvetica;
  font-weight: lighter;
  font-size: 4em;
  margin: 0;
  padding: 0;
  text-align: end;
}

#form_container {
  margin-top: 30px;
  width: 1000px;
  display: flex;
  flex-direction: column;
}

#form_app {
  margin-top: 5px;
  justify-content: center;
  width: 1000px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

label {
  margin-bottom: 5px;
}

#submit_button {
  background-color: #4f8383;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  height: 55px;
  margin-top: 10px;
}

#add_button {
  background-color: #4f8383;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  height: 55px;
  margin-top: 10px;
}

#back_button {
  background-color: #77b7b7;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  height: 55px;
  margin-top: 10px;
}

#submit_button:hover,
#add_button:hover {
  background-color: #396060;
}

input,
textarea {
  width: 100%;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  padding-left: 10px;
}

textarea {
  height: 75px;
}

.loading-container {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100px;
}
.loading_image {
  margin-top: 50px;
  width: 200px;
}

#success_message {
  text-align: center;
  margin-top: 20px;
}

.fadeIn {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
