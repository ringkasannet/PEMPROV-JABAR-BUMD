<template>
  <div id="main_container">
    <div class="header_container">
      <img src="Logo Pemprov Jabar.png" alt="Logo Pemprov Jabar">
    </div>
    <div id="input_container"></div>
    <div id="rekomendasi_container">
      <div v-for="item in rekomendasi" :key="item.id" id="rekomendasi_item">
        {{ item.teks }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rekomendasi: [
        { id: 1, teks: 'Rekomendasi 1' },
        { id: 2, teks: 'Rekomendasi 2' },
        { id: 3, teks: 'Rekomendasi 3' },
      ],
    };
  },
};
</script>