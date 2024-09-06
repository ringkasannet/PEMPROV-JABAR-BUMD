<template>
  <div class="min-h-screen p-10 bg-body bg-repeat-x bg-cover bg-top">
    <div>
      <h1 class="text-6xl font-light text-center">
        Input <span class="text-green-700"> Document </span>
      </h1>
      <div class="flex flex-col justify-center mt-8 p-4">
        <div class="justify-between bg-gray-300 p-4 flex">
          <div>
            <input type="file" id="file" name="file" @change="onFileSelected" />
          </div>
          <div v-if="extractedPerdaBUMD">
            <button
              class="bg-green-800 text-white m-2 p-1"
              @click="savePerdaBUMD"
            >
              Save
            </button>
            <button
              class="bg-green-800 text-white m-2 p-1"
              @click="extractPerdaBUMD"
            >
              Ekstrak ulang
            </button>
          </div>
        </div>
        <div
          v-if="saving"
          id="loading_container"
          class="flex flex-col items-center"
        >
          <div>Saving document ...</div>
          <div>
            <img
              class="w-48"
              src="../assets/work-in-progress.gif"
              alt="Loading..."
            />
          </div>
        </div>

        <div class="lg:flex">
          <div v-if="loading" class="text-center mt-4 lg:w-1/2">
            <span class="animate-pulse text-green-400">
              Extracting PDF Document...
            </span>
            <div
              v-if="loading"
              id="loading_container"
              class="flex flex-col items-center"
            >
              <div>
                <img
                  class="w-48"
                  src="../assets/work-in-progress.gif"
                  alt="Loading..."
                />
              </div>
            </div>
          </div>

          <div v-if="extractedPerdaBUMD && !loading" class="flex-1 lg:w-1/2">
            <div class="bg-green-100 justify-between p-2 text-center">
              <div bg-green-100>
                <h1 class="font-bold">Ekstraksi Perda BUMD:</h1>
              </div>
            </div>

            <h1 class="m-2 text-4xl mt-2">{{ extractedPerdaBUMD.name }}</h1>
            <h2 class="m-2 text-2xl mt-2">{{ extractedPerdaBUMD.perda }}</h2>
            <div class="border-t mt-2 p-2">
              <div class="text-center">
                <h2 class="m-2 text-2xl mt-2 font-bold">
                  Pasal Terkait Tujuan Pendirian dan Ruang Lingkup BUMD
                </h2>
              </div>
              <div class="flex">
                <div class="flex-1 font-bold bg-gray-50 p-2">Pasal</div>
                <div class="flex-1 font-bold bg-gray-50 p-2">Keterkaitan</div>
              </div>
            </div>
            <div
              class="border-t mt-2 p-2"
              v-for="pasal in extractedPerdaBUMD.pasal_terkait_tujuan"
            >
              <div class="flex">
                <div class="flex-1 mr-2">{{ pasal.pasal }}</div>
                <div class="flex-1 ml-2">{{ pasal.alasan }}</div>
              </div>
            </div>
            <div class="flex justify-center"></div>
          </div>
          <div v-if="pdfFile" class="lg:w-1/2">
            <div
              class="bg-green-100 border-l border-gray-400 justify-between p-2 text-center"
            >
              <div><h1 class="font-bold">Preview PDF</h1></div>
            </div>

            <PdfDisplay class="mt-4 p-2" :pdfFile="pdfFile" nama="ini nama" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as pdfjsLib from "pdfjs-dist";
import PdfDisplay from "@/components/PdfDisplay.vue";
import { baseUrl } from "../BaseUrl";

const pdfUrl = ref<string>();
const pdfFile = ref<File>();
const extractedPerdaBUMD = ref<any>();
const loading = ref(false);
const saving = ref(false);
const router = useRouter();

onMounted(() => {});
async function onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    pdfFile.value = file;
  }
  try {
    await extractPerdaBUMD();
  } catch (error) {
    alert("Failed to extract document");
  }
}

async function extractPerdaBUMD() {
  loading.value = true;
  extractedPerdaBUMD.value = null;
  let response: Response;
  const name = pdfFile.value?.name;
  response = await fetch(`${baseUrl}/dms/extract-perda-bumd-in-gemini`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  });
  if (!response.ok) {
    const formData = new FormData();
    formData.append("file", pdfFile.value as Blob);
    response = await fetch(`${baseUrl}/dms/extract-perda-bumd-file`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      alert("Failed to extract document");
      return;
    }
  }
  const data = await response.json();
  console.log(data);
  extractedPerdaBUMD.value = data[0];
  loading.value = false;
}

async function savePerdaBUMD() {
  //upload extractedPerdaBUMD to server
  saving.value = true;
  const conf = confirm("Are you sure you want to save this document?");
  if (!conf) return;
  console.log("saving: ", extractedPerdaBUMD.value);
  const response = await fetch(`${baseUrl}/dms/save-perda-bumd`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(extractedPerdaBUMD.value),
  });
  if (!response.ok) {
    alert("Fail saving document, try again");
  } else {
    alert("Document saved successfully");
    router.push("/list-bumd");
  }
}
</script>

<style>
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
