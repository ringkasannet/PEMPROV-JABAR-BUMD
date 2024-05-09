<template>
  <div class="outer-container">
    <div class="penjelasan">
      <h1 class="card_title">{{ bumdName }} <br /></h1>
      <!-- <h2>Skor kesesuaian: <span v-if="score">{{ score }}%</span></h2> -->
      <vue-markdown v-if="showReadMore" :source="penjelasanAi" />
      <vue-markdown  v-if="!showReadMore" :source="penjelasanAiShort" />
      <a v-if="!showReadMore && penjelasanAi" href="#" @click.prevent="showReadMore=!showReadMore">Read More...</a>
      <a v-if="showReadMore" href="#" style="color: brown" @click.prevent="showReadMore=!showReadMore">Close Read More</a>

      <div v-if="penjelasanAiShort.length < 1">
        <p class="blinking">processing...</p>
      </div>

      <!-- <div v-else>
        <div v-else>
          <vue-markdown :source="penjelasanAi" />
        </div> -->

      <!-- <vue-markdown :source="penjelasanAiResponse" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, nextTick, onDeactivated, onBeforeUnmount, watch, onMounted } from "vue";
import VueMarkdown from "vue-markdown-render";

// import type { nextTick } from "process";

const controller = new AbortController();
const signal = controller.signal;

async function changeReadMore() {
  await nextTick();
  await nextTick();

  readMore.value = !readMore.value;
}
interface bumdCandidateInterface {
  id: string;
  name: string;
  desc: string;
  perda: string;
  score: number;
}

const props = defineProps<{
  bumdId: string;
  bumdName: string;
  penjelasanAi: string;
  penjelasanAiShort: string;
  score:number;
  query?: string;
}>();

const emit = defineEmits(["gotScore"]);

const loading = ref(false);
const readMore = ref(false);
const showReadMore = ref(false);
const penjelasan=ref(props.penjelasanAi);
 
let scoreSent = false;


onMounted(async () => {
  console.log("mounted, with query:", props.query, "bumd:", props.bumdName);
});

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
