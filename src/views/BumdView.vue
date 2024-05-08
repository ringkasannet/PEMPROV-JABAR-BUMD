<template>
  <div>
    <div class="flex_row padding20 flex_end max_width centered_div top_banner">
      <div>
        <h1 class="main_tittle">Matching <span class="green_color">BUMD </span></h1>
        <h2 class="text_right">Pemetaan kesesuaian penugasan BUMD</h2>
      </div>
      <Transition name="rotate" appear>
        <img class="card_image" src="../assets/infographic.png" alt="" />
      </Transition>
    </div>
    <div v-if="error" class="error-message">{{ error }}</div>

    <Transition name="fade" appear>
      <div class="chat_container">
        <div class="chat-app">
          <div style="display: flex; flex-direction: row; justify-content: end">
            <div style="display: flex; justify-content: flex-end; margin-right: 10px">
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
          <div v-for="(candidate, index) in bumdCandidate" :key="index">
            <Transition name="fade" appear>
              <itemRekomendasiBUMD :bumd="candidate" :query="message" />
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

interface itemJawaban {
  name: string;
  id: string;
  score: string;
  desc: string;
  scoreNum: number;
}
interface bumdCandidate {
  id: string;
  name: string;
  desc: string;
  perda: string;
}
const message = ref("");
const error = ref("");
const submittedMessage = ref("");
const jawaban = ref<itemJawaban[]>([]);
const streamingText = ref([]);
const responseError = ref(false);
const loading = ref(false);
const aiModel = ref("OpenAi");
const bumdCandidate = ref<bumdCandidate[]>([]);
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
  const url="http://localhost:3000/getBUMDCandidate/" + message.value + "/"+Number(jumlahRekomendasi.value)
  // const url = "https://high-ace-421114.et.r.appspot.com/getBUMDCandidate/" + message.value + "/" + Number(jumlahRekomendasi.value);

  try {
    console.log("url:", url);
    const query = await fetch(url);
    if (query.status != 200) {
      error.value = `Error:  ${query.status}`;
      loading.value = false;
      return;
      throw new Error(String(query.status));
    }

    const candidate = await query.json();

    if (!candidate?.bumdCandidate) {
      console.log("Error no answer is given");
      throw new Error("Error no answer is given");
    }

    loading.value = false;

    return candidate.bumdCandidate;
  } catch (err) {
    console.log("error:", err);
    error.value = JSON.stringify(err);
    console.log(error.value);
    loading.value = false;
    throw new Error(JSON.stringify(err));
  }
}
const sendMessage = async () => {
  console.log(error.value);

  console.log("in sendMessage");
  jawaban.value = [];
  error.value = "";
  if (message.value != "") {
    message.value;
    console.log("query:", message.value);
    console.log("error:", error.value);

    // const query = await fetch("https://high-ace-421114.et.r.appspot.com/askQuestion/" + message.value);

    console.log(error.value);
    loading.value = true;

    // const query = await fetch("http://localhost:3000/askDummy/")
    // const query = await fetch("https://high-ace-421114.et.r.appspot.com/askQuestion/" + message.value + "/model=" + aiModel.value)
    const query = await fetch("https://high-ace-421114.et.r.appspot.com/askQuestion/" + message.value + "/" + aiModel.value)
      .then(async (query) => {
        if (query.status != 200) {
          console.log("Error: ", query.status);
          error.value = `Error:  ${query.status}`;
          return;
        }
        console.log("query:", query);
        const answers = await query.json();
        console.log("answers:", JSON.stringify(answers));
        // score: answer.penjelasan.match(/\*\* Skor \*\*:(.+?)\*\*/)[1]

        if (answers?.length < 1) {
          console.log("Error no answer is given");
          error.value = `Error no answer is given`;
          return;
        }
        const convertedAnswers = answers.map((answer: any) => {
          const regexScore = /(\d+)%/;
          const cobaExtractScore = answer.penjelasan.match(regexScore);
          // console.log("scoreExtracted:", cobaExtractScore);
          let scoreExtracted;
          if (cobaExtractScore) {
            scoreExtracted = cobaExtractScore[1];
          } else {
            scoreExtracted = "Not Found";
          }
          // D. Penjelasan:
          // const regexPenjelasan = /D\.\s*Penjelasan:\s*(.*)/i;
          // const regexPenjelasan = /D\. Penjelasan:\s(.*)/;
          // const cobaExtractPenjelasan = answer.penjelasan.match(regexPenjelasan);
          // console.log("Penjelasan asli:", answer.penjelasan);
          // let penjelasanExtracted;
          // if (cobaExtractPenjelasan) {
          //   penjelasanExtracted = cobaExtractPenjelasan[1];
          //   console.log("Penjelasan Extracted:", cobaExtractPenjelasan[1]);
          // } else {
          //   penjelasanExtracted = "Not Found";
          //   console.log("Penjelasan Extracted not found");
          // }

          const targetString = "D. Penjelasan:";
          const startIndex = answer.penjelasan.indexOf(targetString) + targetString.length;
          const penjelasanExtracted = answer.penjelasan.substring(startIndex).trim();

          console.log("penjelasan extracted: ", penjelasanExtracted); // Output: This is the explanation text.
          // const searchStringPenjelasan = "D. Penjelasan: ";
          // console.log('answer.penjelasan:', answer.penjelasan)
          // const indexPenjelasan = answer.penjelasan.indexOf(searchStringPenjelasan);
          // console.log('indexPenjelasan:', indexPenjelasan)
          // let penjelasanText
          // if (indexPenjelasan !== -1) {
          //    penjelasanText = text.substring(index + searchString.length); // Extract from after "D. Penjelasan: "
          // } else {
          //   console.log('"D. Penjelasan: " not found in the text.');
          // }
          const scoreNum = parseInt(scoreExtracted);

          return {
            name: answer.name,
            _id: answer._id,
            score: `${scoreExtracted}%`,
            desc: penjelasanExtracted,
            scoreNum: scoreNum ? scoreNum : 0,
          };
        });
        const sortedAnswers = convertedAnswers.sort((a: any, b: any) => b.scoreNum - a.scoreNum);
        loading.value = false;

        jawaban.value = sortedAnswers;
      })
      .catch((err) => {
        console.log("oops error: ", err.message);
        error.value = err;
        console.log(error.value);
        loading.value = false;

        return;
      });

    // startStreaming();
  } else {
    // error.value = "Input tidak boleh kosong";
  }
};

// const startStreaming = () => {
//   jawaban.value.forEach((result, index) => {
//     const words = result.penjelasan.split(' ');
//     let currentText = '';
//     words.forEach((word, wordIndex) => {
//       setTimeout(() => {
//         currentText += word + ' ';
//         streamingText.value[index] = currentText;
//       }, wordIndex * 65);
//     });
//   });
// };

// const startStreaming = () => {
//   jawaban.value.forEach((result, index) => {
//     const words = result.penjelasan.split(" ");
//     let currentText = "";
//     words.forEach((word, wordIndex) => {
//       setTimeout(() => {
//         currentText += word + " ";
//         streamingText.value[index] = currentText.replace(/\*\* Skor \*\*:.+?\*\* Penjelasan \*\*:/, "").replace(/\*\*[\w\s]+?\*\*/, "");
//       }, wordIndex * 65);
//     });
//   });
// };
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
  font-size: 4em;
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
</style>
