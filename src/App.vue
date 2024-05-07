<template>
  <div id="outer_container">
    <div id="main_container">
      <HeaderContainer />
      <div id="body_container">
        <RouterView />

        <!-- <UserInputChat /> -->
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import HeaderContainer from "./components/HeaderContainer.vue";
// import UserInputChat from './components/UserInputChat.vue';
import Footer from "./components/Footer.vue";
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
}
#outer_container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;
  /* padding:40px; */
}

#main_container {
  width: 100%;
}

#chat_container {
  margin-top: 50px;
}

#answer_container {
  background: red;
  width: 1000px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
