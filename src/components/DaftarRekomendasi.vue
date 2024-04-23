<template>
  <div id="main_container">
     <ItemBUMD namaBUMD="Nama BUMD" :desc="cobaDesc" urlLogo="/agency-logo.png"/>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import ItemBUMD from './ItemBUMD.vue';

const cobaDesc = ref(`
  ## BUMD Bidang Minyak dan Gas Bumi Lingkup Kegiatan Usaha Hulu (Perseroan Terbatas)

**Tujuan Pendirian dan Ruang Lingkup Usaha:**

BUMD ini dibentuk untuk mengelola dan memanfaatkan potensi sumber daya alam minyak dan gas bumi di Provinsi Jawa Barat melalui kegiatan usaha hulu, meliputi eksplorasi dan eksploitasi. Tujuannya adalah:

-   Memanfaatkan dan mengoptimalkan potensi sumber daya alam minyak dan gas bumi secara berkelanjutan dan berwawasan lingkungan.
    
-   Mengembangkan investasi daerah.
    
-   Memberikan kontribusi terhadap Pendapatan Asli Daerah.
    
-   Menggerakkan perekonomian daerah.
    

**Dasar Hukum:**

Nama Peraturan Daerah: **Peraturan Daerah Provinsi Jawa Barat Nomor 14 Tahun 2013 tentang Pembentukan Badan Usaha Milik Daerah Bidang Minyak dan Gas Bumi Lingkup Kegiatan Usaha Hulu**

**Pasal\-pasal terkait:**

**Pasal 2**

> Maksud pembentukan BUMD bidang minyak dan gas bumi lingkup kegiatan usaha hulu adalah untuk mengusahakan potensi sumberdaya alam minyak dan gas bumi di Daerah dan mengoptimalkan peluang pengusahaan pada kegiatan usaha hulu minyak dan gas bumi.

**Pasal 3**

> Tujuan pembentukan BUMD bidang minyak dan gas bumi lingkup kegiatan usaha hulu adalah :
> 
> a. memanfaatkan dan mengoptimalkan potensi sumberdaya alam minyak dan gas bumi yang dikelola secara berkelanjutan dan berwawasan lingkungan;
> 
> b. mengembangkan investasi Daerah;
> 
> c. memberikan kontribusi terhadap Pendapatan Asli Daerah; dan
> 
> d. menggerakkan perekonomian Daerah.

**Pasal 9**

> (1) Bidang kegiatan usaha Perseroan adalah kegiatan usaha hulu minyak dan gas bumi mencakup :
> 
> a. eksplorasi; dan
> 
> b. eksploitasi.
> 
> (2) Perseroan dapat mendirikan Anak Perusahaan untuk pengembangan kegiatan usaha sebagaimana dimaksud pada ayat (1), sesuai ketentuan peraturan perundang\-undangan.
> 
> (3) Pendirian Anak Perusahaan sebagaimana dimaksud pada ayat (2) diusulkan oleh Direksi Perseroan dan selanjutnya ditelaah oleh Dewan Komisaris, sebagai bahan saran dan pertimbangan yang diajukan dalam RUPS untuk mendapat persetujuan.
> 
> (4) Dalam hal RUPS menyetujui pendirian Anak Perusahaan sebagaimana dimaksud pada ayat (2) dan ayat (3), maka Direksi Perseroan memproses pendirian Anak Perusahaan, sesuai ketentuan peraturan perundang\-undangan.

  `);
  
</script>
  
  <style scoped>
  #main_container{
    background-color: #313131;
    padding:20px;
    margin:20px 0;
  }
  .horizontal_container {
    display: flex;
    flex-direction: row;
  }
  .rekomendasi-app {
    background: grey;
    margin: 5px;
    margin-top: 20px;
    width: auto;
    height: auto;
  }
  #document_container {
    margin: 10px;
  }
  </style>
  