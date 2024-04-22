<template>
  <div class="chat-app">
    <form @submit.prevent="sendMessage" class="form-container">
      <button type="submit">Tanyakan Kebutuhan <br> Penugasan Disini</button>
      <input type="text" v-model="message" placeholder="Type your message here...">
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('');
const sendMessage = () => {
  if (message.value.trim() !== '') {
    message.value = '';
  }
};
</script>

<style scoped>
.chat-app {
  width: 100%;
  margin: 0 auto;
}

.form-container {
  display: flex;
  align-items: center;
}

input[type="text"], button {
  height: 50px;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

input[type="text"] {
  flex: 1;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0 20px;
  border-radius: 5px;
  cursor: pointer;
  width: auto;
}

button:hover {
  background-color: #0056b3;
}
</style>
