<template>
  <div class="">
    <div v-if="!pdfRenderer?.file">Provide PDF File</div>

    <div v-if="pdfRenderer?.file" class="flex flex-row justify-center">
      <div v-if="pdfRenderer?.totalPages > 0" class="">
        <button
          @click="pdfRenderer.zoomOut"
          class="mr-2 px-3 py-2 m-0 rounded-md bg-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition duration-200"
          :disabled="pdfRenderer.currentZoom <= pdfRenderer.minZoom"
        >
          -
        </button>
        <button
          @click="pdfRenderer.previousPage"
          class="px-2 py-2 rounded-md bg-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition duration-200"
        >
          < Previous
        </button>
        <span class="text-gray-700 mr-2">
          Page {{ pdfRenderer.currentPage }} of {{ pdfRenderer.totalPages }}
        </span>
        <button
          @click="pdfRenderer.nextPage"
          :disabled="pdfRenderer.currentPage === pdfRenderer.totalPages"
          class="mr-2 px-2 py-2 rounded-md bg-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition duration-200"
        >
          Next >
        </button>
        <button
          @click="pdfRenderer.zoomIn"
          class="px-3 py-2 rounded-md bg-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition duration-200"
          :disabled="pdfRenderer.currentZoom >= pdfRenderer.maxZoom"
        >
          +
        </button>
      </div>
    </div>
    <div class="mt-4 flex justify-center overflow-hidden">
      <canvas ref="pdfCanvas" v-show="props.pdfFile"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, reactive } from "vue";
import * as pdfjsLib from "pdfjs-dist";
import { PdfRenderer } from "../services/pdfRenderer";

const pdfCanvas = ref<HTMLCanvasElement | null>(null);
const pdfRenderer = ref<PdfRenderer | null>(null);

onMounted(() => {
  console.log("onMounted, pdfFile::", props.pdfFile);
  pdfRenderer.value = new PdfRenderer(pdfCanvas.value);
  if (props.pdfFile) {
    pdfRenderer.value.loadFile(props.pdfFile);
  }
});

const props = defineProps({
  pdfFile: File,
});

watch(
  () => props.pdfFile,
  (newVal) => {
    console.log("watching pdfFile:", newVal);
    pdfRenderer.value.loadFile(newVal);
  },
);
</script>
