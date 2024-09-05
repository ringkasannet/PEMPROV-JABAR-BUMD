<template>
  <div id="main_container">
    <div id="title_container" class="fadeIn">
      <div id="title">
        <h1 class="title">Form <span style="color: green;">DokumenASET</span></h1>
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
              <input id="nama" type="text" v-model="formData.nama"
                placeholder="Contoh: TATA CARA PENJUALAN KENDARAAN DINAS" required>
            </div>
            <div class="form-group">
              <label for="jenis">Jenis Peraturan:</label>
              <v-select v-model="formData.jenis" :options="['Peraturan Daerah', 'Peraturan Gubernur']"></v-select>
            </div>
            <div class="form-group">
              <label for="nomor">Nomor Peraturan:</label>
              <input id="perda" type="text" v-model.number="formData.nomor" placeholder="Contoh: 78" required>
            </div>
            <div class="form-group">
              <label for="tahun">Tahun:</label>
              <input id="perda" type="text" v-model="formData.tahun" placeholder="2014" required>
            </div>
            <div class="form-group">
              <label for="no_bab">Nomor Bab:</label>
              <input id="no_bab" type="text" v-model.number="formData.no_bab"
                placeholder="Gunakan angka latin, contoh: 1" required>
            </div>
            <div class="form-group">
              <label for="nama_bab">Nama Bab:</label>
              <input id="nama_bab" type="text" v-model="formData.nama_bab" placeholder="Contoh: KETENTUAN UMUM"
                required>
            </div>
            <div class="form-group">
              <label for="no_bagian">Nomor Bagian:</label>
              <input id="no_bagian" type="text" v-model="formData.no_bagian" @input="toUpperCase"
                placeholder="Contoh: KESATU">
            </div>
            <div class="form-group">
              <label for="nama_bagian">Nama Bagian:</label>
              <input id="nama_bagian" type="text" v-model="formData.nama_bagian" :disabled="!formData.no_bagian"
                placeholder="Wajib diisi jika form Nomor Bagian diisi" :required="formData.no_bagian">
            </div>
            <!-- <div class="form-group">
              <label for="no_paragraf">Nomor Paragraf:</label>
              <input id="no_paragraf" type="text" v-model.number="formData.no_paragraf"
                placeholder="Gunakan angka latin, contoh: 1">
            </div>
            <div class="form-group">
              <label for="nama_paragraf">Nama Paragraf:</label>
              <input id="nama_paragraf" type="text" v-model="formData.nama_paragraf" :disabled="!formData.no_paragraf"
                placeholder="Nomor Paragraf Harus Diisi" :required="formData.no_paragraf">
            </div> -->
            <div class="form-group">
              <label for="desc">Deskripsi:</label>
              <textarea id="desc" v-model="formData.desc"
                placeholder="Contoh: Pasal 1 &#10;        Dalam Peraturan Gubernur ini, ..." required></textarea>
            </div>
            <button type="submit" id="submit_button">Submit</button>
            <button @click="backToList" id="back_button"> << Kembali </button>
          </form>
        </div>
      </div>
    </div>
    <div v-if="isSubmitted" id="success_message">
      <h2>Dokumen berhasil disimpan</h2>
      <!-- <button @click="backToList" id="back_button"> << Kembali</button>
      <button @click="addNewForm" id="add_button">Tambahkan Dokumen Baru</button> -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import vSelect from 'vue-select';
import { useRouter } from 'vue-router';

const formData = reactive(dataDokumen());
const isSubmitted = ref(false);
const loading = ref(false)
const route = useRouter()

function dataDokumen() {
  return {
    nama: '',
    jenis: '',
    nomor: '',
    tahun: '',
    no_bab: '',
    nama_bab: '',
    no_bagian: '',
    nama_bagian: '',
    // no_paragraf: '',
    // nama_paragraf: '',
    desc: '',
  };
}

async function handleSubmit() {
  if (validasiForm()) {
    try {
      loading.value = true;
      const response = await fetch('http://localhost:3000/admin/inputAset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      loading.value = false;
      console.log(formData);
      isSubmitted.value = true;
      backToList();
    } catch (error) {
      alert('Failed to submit data');
    }
  } else {
    alert('Tolong isi semua form');
  }
}

function validasiForm() {
  return (
    formData.nama &&
    formData.jenis &&
    formData.nomor &&
    formData.tahun &&
    formData.no_bab &&
    formData.nama_bab &&
    formData.desc &&
    (!formData.no_bagian || formData.nama_bagian) &&
    (!formData.no_paragraf || formData.nama_paragraf)
  )
}

function backToList() {
  route.push("/ListDokumenAset")
}

function toUpperCase(event) {
  formData.no_bagian = event.target.value.toUpperCase();
}

// function addNewForm() {
//   Object.assign(formData, dataDokumen());
//   isSubmitted.value = false;
// }

watch(() => formData.no_bagian, (newVal) => {
  if (!newVal) {
    formData.nama_bagian = '';
  }
});

// watch(() => formData.no_paragraf, (newVal) => {
//   if (!newVal) {
//     formData.nama_paragraf = '';
//   }
// });
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
  margin-top: 10px;
  width: 1000px;
  display: flex;
  flex-direction: column;
}

#form_app {
  margin-top: 5px;
  justify-content: center;
  width: 1000px;
}

#form_container {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

input#no_bagian {
  text-transform: uppercase;
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

#submitted_data_container {
  margin-top: 20px;
  width: 1000px;
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
