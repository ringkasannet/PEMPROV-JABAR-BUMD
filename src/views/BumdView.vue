<template>
  <div>
    <div class="flex_row padding20 flex_end max_width centered_div top_banner">
      <div>
        <h1 class="main_tittle">Matching <span class="green_color">BUMD </span></h1>
        <h2 class="main_tittle text_right">Pemetaan kesesuaian penugasan BUMD</h2>
      </div>
      <Transition name="rotate" appear>
        <img class="card_image" src="../assets/infographic.png" alt="" />
      </Transition>
    </div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <button @click="rubahUrutanKandidat">Rubah urutan</button>
    <Transition name="fade" appear>
      <div class="chat_container">
        <div class="chat-app">
          <div class="admin_container" style="">
            <div class="admin_item" style="display: flex; justify-content: flex-end">
              <div style="padding-top: 5px">Model:</div>
              <v-select v-model="aiModel" style="width: 200px" :options="['OpenAi', 'GeminiAi']"></v-select>
            </div>
            <div style="display: flex; justify-content: flex-end">
              <div style="padding-top: 5px">Jumlah Rekomendasi:</div>
              <v-select v-model="jumlahRekomendasi" style="width: 100px" :options="[1, 2, 3, 4, 5]"></v-select>
            </div>
          </div>

          <form @submit.prevent="processQuerry" class="form-container">
            <button class="button-ask margin_right" type="submit">
              Evaluasi Kesesuaian <br />
              Penugasan
            </button>
            <input type="text" v-model="message" placeholder="Kebutuhan penugasan..." />
          </form>
        </div>
        <div v-if="loading" class="loading-container">
          <img class="loading_image" src="../assets/work-in-progress.gif" />
        </div>

        <div class="candidate_container" style="display: flex; flex-direction: column; margin-top: 20px">
          <div v-for="(candidate,index) in bumdCandidate" :key="index">
            {{ candidate.score }}
            <Transition name="fade" appear>
              <itemRekomendasiBUMD @gotScore="prosesScore" :bumdId="candidate.id" :bumdName="candidate.name" :query="message" />
            </Transition>
          </div>
        </div>
        <!-- <div v-if="jawaban.length > 0">
          <div class="answer-font" v-for="(result, index) in jawaban" :key="index">
            <Transition name="fade" appear>
              <div class="penjelasan">
                <h1 class="card_title">{{ result?.name }} <br /></h1>
                <h2>
                  Persentase Kesesuaian: <span>{{ result?.score }}</span>
                </h2>
                <div v-if="result.desc">
                  <vue-markdown :source="result?.desc" />
                </div>
              </div>
            </Transition>
          </div>
        </div> -->
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VueMarkdown from "vue-markdown-render";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import itemRekomendasiBUMD from "../components/ItemRekomendasiBUMD.vue";
// const PulseLoader = require('vue-spinner/src/PulseLoader.vue');

// import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
// import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
function prosesScore(score:{id:string, score:number}) {
  console.log("dapat score:", score, "untuk id:", score.id);
  for (let i = 0; i < bumdCandidate.value.length; i++) {
    if (bumdCandidate.value[i].id === score.id) {
      bumdCandidate.value[i].score = score.score;
    }
  }
  // const cand=bumdCandidate.value.find((item) => item.id === score.id);
  // console.log("merubah BUMD: ",cand?.name," dengan skor: ",score.score)
  // if (cand) {
  //   cand.score = score.score;
  // }
  bumdCandidate.value.sort((a, b) => b.score - a.score);
}

function rubahUrutanKandidat() {
  console.log("rubah urutan kandidat");
  console.log("sebelum diurutkan:",JSON.stringify(bumdCandidate.value));

  bumdCandidate.value.sort((a, b) => b.score - a.score);
  console.log("diurutkan:",JSON.stringify(bumdCandidate.value));
  bumdCandidate.value.sort((a, b) => a.score - b.score);
  console.log("diurutkan:",JSON.stringify(bumdCandidate.value));

}

interface itemJawaban {
  name: string;
  id: string;
  score: string;
  desc: string;
  scoreNum: number;
}
interface bumdCandidateInterface {
  id: string;
  name: string;
  desc: string;
  perda: string;
  score: number;
}
const message = ref("");
const error = ref("");
const submittedMessage = ref("");
const jawaban = ref<itemJawaban[]>([]);
const streamingText = ref([]);
const responseError = ref(false);
const loading = ref(false);
const aiModel = ref("OpenAi");
const bumdCandidate = ref<bumdCandidateInterface[]>([]);
const jumlahRekomendasi = ref(3);


async function processQuerry() {
  loading.value = true;
  bumdCandidate.value = [];
  if (!message.value) {
    console.log("query is empty, returning:");
  }
  console.log("query: ", message.value, "aiModel:", aiModel.value);
  try {
    const res = await getBUMDCandidate();
    bumdCandidate.value = res;
    console.log("bumdCandidate:", bumdCandidate.value);
  } catch (err) {
    console.log("error:", err);
    error.value = JSON.stringify(err);
    loading.value = false;
  }
  loading.value = false;
}
async function getBUMDCandidate() {
  console.log("in getBUMDCandidate");
  jawaban.value = [];
  error.value = "";

  // const query = await fetch("http://localhost:3000/askDummy/")
  // const query = await fetch("https://high-ace-421114.et.r.appspot.com/askQuestion/" + message.value + "/model=" + aiModel.value)
  if (!jumlahRekomendasi.value) {
    jumlahRekomendasi.value = 3;
  }
  const url = "http://localhost:3000/getBUMDCandidate/" + message.value + "/" + Number(jumlahRekomendasi.value);

  // const url = "https://ringkasan.net/getBUMDCandidate/" + message.value + "/" + Number(jumlahRekomendasi.value);
  // const url = "https://high-ace-421114.et.r.appspot.com/getBUMDCandidate/" + message.value + "/" + Number(jumlahRekomendasi.value);

  try {
    console.log("fetching url:", url);
    const query = await fetch(url);
    console.log("query:", query);
    if (query.status != 200) {
      error.value = `Error:  ${query.status}`;
      loading.value = false;
      throw new Error(String(query.status));
    }

    const candidate = await query.json();

    if (!candidate?.bumdCandidate) {
      console.log("Error no answer is given");
      throw new Error("Error no answer is given");
    }

    loading.value = false;
    return candidate.bumdCandidate.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        desc: item.desc,
        perda: item.perda,
        score: null,
      };
    });
  } catch (err) {
    console.log("error:", err);
    error.value = JSON.stringify(err);
    console.log(error.value);
    loading.value = false;

    throw new Error(JSON.stringify(err));
  }
}

</script>

<style scoped>
.chat-app {
  width: 100%;
  margin: 0 auto;
  position: relative;
}

.form-container {
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 20px;
}

input[type="text"],
button {
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

.button-ask {
  background-color: #4f8383;
  color: #fff;
  border: none;
  padding: 0 20px;
  border-radius: 5px;
  cursor: pointer;
  width: auto;
}

.button-ask:hover {
  background-color: #0056b3;
}

.error-message {
  margin-top: 20px;
  margin-left: 250px;
  background: red;
  text-align: center;
  font-size: larger;
  color: white;
  position: relative;
  bottom: -20px;
  width: 500px;
}

.submitted-message {
  position: absolute;
  bottom: -30px;
  left: 0;
  width: 100%;
  text-align: center;
  color: #007bff;
}

#answer {
  margin-top: 50px;
}

.answer-font {
  font-size: 20px;
  font-weight: normal;
  margin-bottom: 25px;
  border: 1px solid white;
  border-radius: 15px;
  /* padding: 20px; */
}

.penjelasan {
  font-size: 18px;
  margin-top: 10px;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 15px;
  /* background: rgb(39, 39, 46); */
}

.rotate-enter-active,
.rotate-leave-active {
  transition: transform 2s ease-in-out;
}

.rotate-enter-from,
.rotate-leave-to {
  transform: rotate(0deg);
}

.rotate-enter-to,
.rotate-leave-from {
  transform: rotate(360deg);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

h1.main_tittle {
  font-family: Helvetica;
  font-weight: lighter;
  font-size: 4em;
  margin: 0;
  padding: 0;
  text-align: right;
  /* margin: 15px; */
}
h2.main_tittle {
  font-family: Helvetica;
  font-weight: normal;
  font-size: 2em;
  margin: 0;
  padding: 0;
}

h1.card_title {
  color: rgb(0, 0, 79);
}
.flex_column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.flex_row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.flex_end {
  display: flex;
  justify-content: flex-end;
}
.card_image {
  width: 150px;
  margin-left: 40px;
}
.padding20 {
  padding: 40px;
}
.text_right {
  text-align: right;
}
.chat_container {
  margin: 50px;
  max-width: 860px;
  margin: 0 auto;
}
.max_width {
  max-width: 860px;
}
.centered_div {
  margin: 0 auto;
}
.top_banner {
  justify-content: center;
}
.margin_right {
  margin-right: 5px;
}
.loader {
  margin-top: 200px;
  margin-left: 450px;
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

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

p.blinking {
  animation: blink 1s infinite;
  color: #4f8383;
}
.admin_container {
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-right: 20px;
}

@media (max-width: 600px) {
  h1.main_tittle {
    font-family: Helvetica;
    font-weight: lighter;
    font-size: 2em;
    margin: 0;
    padding: 0;
    text-align: right;
    /* margin: 15px; */
  }
  h2.main_tittle {
    font-family: Helvetica;
    font-weight: normal;
    font-size: 1em;
    margin: 0;
    padding: 0;
  }

  h1.card_title {
    color: rgb(0, 0, 79);
  }
  .card_image {
    width: 100px;
    margin-left: 40px;
  }
  .admin_container {
    display: flex;
    flex-direction: column;
  }
  .admin_item {
    margin-bottom: 5px;
  }
}
</style>
