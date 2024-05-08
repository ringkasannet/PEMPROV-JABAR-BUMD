<template>
  <div class="outer-container">
    <div class="penjelasan">
      <h1 class="card_title">{{ bumd?.name }} <br /></h1>
      <div v-if="loading">
        <p class="blinking">processing...</p>
      </div>
      <div v-else>
        <div v-if="!readMore">
          <vue-markdown :source="penjelasanAiShort" />
          <a v-if="showReadMore" href="#" @click="readMore = !readMore">Read More</a>
        </div>
        <div v-else>
          <vue-markdown :source="penjelasanAiResponse" />
          <a href="#" style="color: brown" @click="readMore = !readMore">Close Read More</a>
        </div>

        <!-- <vue-markdown :source="penjelasanAiResponse" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import VueMarkdown from "vue-markdown-render";

interface bumdCandidate {
  id: string;
  name: string;
  desc: string;
  perda: string;
}

const props = defineProps<{
  bumd: bumdCandidate;
  query?: string;
}>();

const loading = ref(true);
const penjelasanAiResponse = ref("");
const penjelasanAiShort = ref("");
const readMore = ref(false);
const showReadMore = ref(false);

onMounted(async () => {
  evaluasiBUMD(props.bumd, props.query ?? "");
});

async function evaluasiBUMD(bumd: bumdCandidate, query: string) {
  const data = {
    bumd: bumd,
    query: query,
  };
  console.log("about to evaluate bumd:", bumd, "query:", query);
  try {
    // if (evaluationQuery.status != 200) {
    //   error.value = `Error:  ${evaluationQuery.status}`;
    //   loading.value = false;
    //   return;
    //   throw new Error(evaluationQuery.status);
    // }
    // const url = `https://high-ace-421114.et.r.appspot.com/evaluasiBUMD/${bumd.id}/${query}`;
    const url = `http://localhost:3000/evaluasiBUMD/${bumd.id}/${query}`;

    console.log("fetching data from:", url);
    const evaluationQuery = fetch(url)
      .then((response) => {
        console.log("response:", response);
        loading.value = false;
        if (!response.body) {
          console.error("No response body");
          penjelasanAiResponse.value = "No response body";
          penjelasanAiShort.value = "No response body";
        } else {
          const reader = response.body.getReader();
          const decoder = new TextDecoder(); // Assuming text data

          const readChunk = async () => {
            const { value, done } = await reader.read();
            if (done) return;
            const chunkString = decoder.decode(value);
            console.log(chunkString); // Process the chunk
            penjelasanAiResponse.value += chunkString;
            if (penjelasanAiShort.value.length < 700) {
              penjelasanAiShort.value += chunkString;
            } else {
              showReadMore.value = true;
            }

            readChunk(); // Read the next chunk
          };
          readChunk();
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } catch (err) {
    console.log("error:", err);
    loading.value = false;
    throw new Error(JSON.stringify(err));
  }
}
</script>

<style scoped>
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

.outer-container {
  border: 1px solid #4f8383;
  padding: 20px;
  margin-bottom: 5px;
}
</style>
