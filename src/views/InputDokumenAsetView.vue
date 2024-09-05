<template>
  <div class="min-h-screen p-10 bg-body bg-repeat-x bg-cover bg-top">
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

    <div v-if="!saving">
      <h1 class="text-6xl font-light text-center">
        Input <span class="text-green-700"> Aset Document </span>
      </h1>
      <div class="flex flex-col justify-center mt-8 p-4">
        <div class="justify-between bg-gray-300 p-4 flex">
          <div>
            <input type="file" id="file" name="file" @change="onFileSelected" />
          </div>
          <div v-if="extractedPerdaAset">
            <button
              class="bg-green-800 text-white m-2 p-1"
              @click="savePerdaAset"
            >
              Save
            </button>
            <button
              class="bg-green-800 text-white m-2 p-1"
              @click="extractPerdaAset"
            >
              Ekstrak ulang
            </button>
          </div>
        </div>
        {{ loading }}

        <div class="lg:flex">
          <div v-if="loading" class="text-center mt-4 lg:w-1/2">
            <span class="animate-pulse text-green-400">
              Extracting PDF Documents...
            </span>
            <div id="loading_container" class="flex flex-col items-center">
              <div>
                <img
                  class="w-48"
                  src="../assets/work-in-progress.gif"
                  alt="Loading..."
                />
              </div>
            </div>

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
          <div v-if="extractedPerdaAset" class="lg:w-1/2">
            <div class="bg-green-100 justify-between p-2 text-center">
              <div bg-green-100>
                <h1 class="font-bold">Ekstraksi Perda BUMD:</h1>
              </div>
            </div>
            <h1 class="m-2 text-4xl mt-2">
              {{ extractedPerdaAset.nomor_perda }}
            </h1>
            <h1 class="m-2 text-2xl mt-2">
              {{ extractedPerdaAset.judul_perda }}
            </h1>
            <div
              class="bg-green-50"
              v-for="(bab, index) in extractedPerdaAset.bab"
              :key="index"
            >
              <div @click="selectedBab = index">
                <h1 class="m-2 text-2xl mt-2 font-bold">{{ bab.nama_bab }}</h1>
              </div>
              <div v-if="selectedBab == index">
                <VueMarkdown :source="bab.isi_pasal" />
                <button
                  class="bg-green-300 m-2 p-1"
                  v-on:click="selectedBab = -1"
                >
                  close
                </button>
              </div>
            </div>
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
import VueMarkdown from "vue-markdown-render";

const pdfUrl = ref<string>();
const pdfFile = ref<File>();
const extractedPerdaAset = ref<any>();
const loading = ref(false);
const saving = ref(false);
const router = useRouter();
const selectedBab = ref<number>();

onMounted(() => {});
async function onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    pdfFile.value = file;
  }
  try {
    await extractPerdaAset();
  } catch (error) {
    alert("Failed to extract document");
  }
}

async function extractPerdaAset() {
  loading.value = true;
  extractedPerdaAset.value = null;
  const formData = new FormData();
  formData.append("file", pdfFile.value);
  const response = await fetch(`${baseUrl}/dms/extract-perda-aset`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to extract document");
  }
  const data = await response.json();
  console.log(data);
  extractedPerdaAset.value = data[0];
  loading.value = false;
}

async function savePerdaAset() {
  //upload extractedPerdaAset to server
  saving.value = true;
  const conf = confirm("Are you sure you want to save this document?");
  if (!conf) return;
  console.log("saving: ", extractedPerdaAset.value);
  const response = await fetch(`${baseUrl}/dms/save-perda-aset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(extractedPerdaAset.value),
  });
  if (!response.ok) {
    alert("Fail saving document, try again");
  } else {
    alert("Document saved successfully");
    saving.value = false;
    router.push("/list-aset");
  }
}

const asetDescriptionDummy = {
  bab: [
    {
      isi_pasal:
        "Pasal 1\nDalam Peraturan Gubernur ini, yang dimaksud dengan:\n1. Daerah Provinsi adalah Daerah Provinsi Jawa Barat.\n2. Pemerintah Daerah Provinsi adalah Gubernur sebagai unsur penyelenggara Pemerintahan Daerah yang memimpin pelaksanaan urusan pemerintahan yang menjadi kewenangan daerah otonom.\n3. Gubernur adalah Gubernur Jawa Barat.\n4. Sekretaris Daerah Provinsi adalah Sekretaris Daerah Provinsi Jawa Barat.\n5. Badan adalah Badan Pengelolaan Keuangan dan Aset Daerah Provinsi Jawa Barat.\n6. Kepala Badan adalah Kepala Badan Pengelolaan Keuangan dan Aset Daerah Provinsi Jawa Barat.\n7. Unit Pelaksana Teknis Daerah Pengamanan dan Pemanfaatan Aset yang selanjutnya disebut UPTD adalah Unit Pelaksana Teknis Daerah yang secara struktur organisasi berada di bawah dan bertanggungjawab kepada Kepala Badan Pengelolaan Keuangan dan Aset Daerah Provinsi Jawa Barat.\n8. Kepala Unit Pelaksana Teknis Daerah Pengamanan dan Pemanfaatan Aset yang selanjutnya disebut Kepala UPTD adalah Kepala Unit Pelaksana Teknis Daerah yang secara struktur organisasi berada di bawah dan bertanggungjawab kepada Kepala Badan Pengelolaan Keuangan dan Aset Daerah Provinsi Jawa Barat.\n9. Kepala UPTD adalah Kepala Unit Pelaksana Teknis Daerah Pengamanan dan Pemanfaatan Aset pada Badan Pengelolaan Keuangan dan Aset Daerah Provinsi Jawa Barat.\n10. Pengelola Barang adalah pejabat yang berwenang dan bertanggung jawab melakukan koordinasi pengelolaan Barang Milik Daerah.\n11. Pengguna Barang adalah pejabat pemegang kewenangan penggunaan Barang Milik Daerah.\n12. Kuasa Pengguna Barang adalah kepala unit kerja atau pejabat yang ditunjuk oleh Pengguna Barang untuk menggunakan Barang Milik Daerah yang berada dalam penguasaannya dengan sebaik-baiknya.\n13. Anggaran Pendapatan dan Belanja Daerah Provinsi adalah rencana keuangan tahunan daerah yang ditetapkan dengan Peraturan Daerah.\n14. Barang Milik Daerah adalah semua barang yang dibeli atau diperoleh atas beban APBD atau berasal dari perolehan lainnya yang sah.\n15. Pengelolaan Barang Milik Daerah adalah keseluruhan kegiatan yang meliputi perencanaan kebutuhan dan penganggaran, pengadaan, penggunaan, pemanfaatan, pengamanan dan pemeliharaan, penilaian, pemindahtanganan, pemusnahan, penghapusan, penatausahaan dan pembinaan, pengawasan dan pengendalian.\n16. Penyertipikatan adalah pengamanan hukum terhadap barang milik daerah berupa tanah melalui penerbitan sertipikat oleh Badan Pertanahan Nasional sebagai bukti bahwa tanah yang bersangkutan merupakan milik/dikuasai Pemerintah Daerah Provinsi, sesuai ketentuan peraturan perundang-undangan.",
      nama_bab: "Bab I Ketentuan Umum",
      nomor_bab: "1",
    },
    {
      isi_pasal:
        "Pasal 2\nRuang lingkup pengaturan dalam Peraturan Gubernur ini, meliputi:\na. penyertipikatan tanah;\nb. tim percepatan penyertipikatan tanah;\nc. pembinaan, pengawasan dan pengendalian;\nd. pelaporan; dan\ne. pembiayaan.",
      nama_bab: "Bab II Penyertipikatan Tanah Pemerintah Daerah Provinsi",
      nomor_bab: "2",
    },
    {
      isi_pasal:
        "Pasal 3\n(1) Kepala Badan menyusun daftar barang milik daerah berupa tanah yang akan disertipikatkan dalam rangka pengamanan hukum.\n(2) Dalam melaksanakan penyusunan daftar barang milik daerah berupa tanah yang akan disertipikatkan sebagaimana dimaksud pada ayat (1), Kepala Badan dibantu oleh Kepala UPTD.\n(3) Daftar barang milik daerah sebagaimana dimaksud pada ayat (1), merupakan target penyertipikatan tanah yang dilaksanakan oleh UPTD secara periodik.\n(4) Dalam upaya percepatan penyertipikatan tanah sebagaimana dimaksud pada ayat (4), Kepala UPTD berkoordinasi dengan Pejabat Kantor Wilayah Badan Pertanahan Nasional Provinsi Jawa Barat dan/atau Kantor Pertanahan Kabupaten/Kota yang melaksanakan penyertipikatan tanah milik/dikuasai Pemerintah Daerah, sesuai ketentuan peraturan perundang-undangan.\n(5) Tanah milik/dikuasai Pemerintah Daerah Provinsi, tercantum dalam Lampiran sebagai bagian tidak terpisahkan dari Peraturan Gubernur ini.",
      nama_bab: "Bab III Pembentukan Tim",
      nomor_bab: "3",
    },
    {
      isi_pasal:
        "Pasal 4\n(1) Gubernur membentuk tim dalam rangka akselerasi dan penyelesaian permasalahan sertipikat tanah milik/dikuasai Pemerintah Daerah Provinsi.\n(2) Keanggotaan tim sebagaimana dimaksud pada ayat (1), terdiri atas:\na. unsur Pengelola Barang;\nb. unsur Pengguna Barang;\nc. unsur Perangkat Daerah yang terkait dengan tugas dan fungsi pengamanan barang milik daerah;\nd. unsur Kantor Badan Pertanahan Nasional; dan\ne. unsur lainnya sesuai kebutuhan.\n(3) Tim sebagaimana dimaksud pada ayat (1), ditetapkan dengan Keputusan Gubernur.",
      nama_bab: "Bab IV Pembinaan, Pengawasan Dan Pengendalian",
      nomor_bab: "4",
    },
    {
      isi_pasal:
        "Pasal 5\n(1) Gubernur melaksanakan pembinaan, pengawasan dan pengendalian terhadap pelaksanaan penyertipikatan tanah milik/dikuasai Pemerintah Daerah Provinsi.\n(2) Pembinaan, pengawasan dan pengendalian bertujuan untuk:\na. memberikan arah kebijakan dalam rangka optimalisasi pencapaian target penyertipikatan tanah milik/dikuasai Pemerintah Daerah Provinsi;\nb. memperoleh informasi terkait progres/perkembangan penyertipikatan tanah milik/dikuasai Pemerintah Daerah Provinsi;\nc. mengawasi dan mengendalikan pelaksanaan kegiatan penyertipikatan tanah milik/dikuasai Pemerintah Daerah Provinsi; dan\nd. mengukur kinerja pelaksanaan penyertipikatan tanah milik/dikuasai Pemerintah Daerah Provinsi.",
      nama_bab: "Bab V Pelaporan",
      nomor_bab: "5",
    },
    {
      isi_pasal:
        "Pasal 6\n(1) Kepala UPTD melaporkan hasil penyertipikatan tanah milik/dikuasai Pemerintah Daerah Provinsi kepada Kepala Badan secara periodik dan/atau sewaktu-waktu apabila diperlukan.\n(2) Kepala Badan melaporkan progres/perkembangan penyertipikatan tanah milik/dikuasai Pemerintah Daerah Provinsi kepada Gubernur melalui Sekretaris Daerah Provinsi setiap akhir tahun anggaran.\n(3) Setiap akhir tahun anggaran, Kepala Badan menyampaikan laporan tahunan kepada Gubernur melalui Sekretaris Daerah Provinsi mengenai penyertipikatan tanah milik/dikuasai Pemerintah Daerah Provinsi.",
      nama_bab: "Bab VI Pendanaan",
      nomor_bab: "6",
    },
    {
      isi_pasal:
        "Pasal 7\nPendanaan penyertipikatan tanah milik/dikuasai Pemerintah Daerah bersumber dari Anggaran Pendapatan dan Belanja Daerah Provinsi.",
      nama_bab: "Bab VII Ketentuan Lain-Lain",
      nomor_bab: "7",
    },
    {
      isi_pasal:
        "Pasal 8\n(1) Tanah milik/dikuasai Pemerintah Daerah Provinsi sebagaimana dimaksud dalam Pasal 3 ayat (5), termasuk tanah yang telah disertipikatkan.\n(2) Dalam hal terdapat tanah milik/dikuasai Pemerintah Daerah Provinsi yang belum terakomodasi dalam Lampiran sebagaimana dimaksud pada ayat (1), maka dapat dilakukan Perubahan atas Peraturan Gubernur ini.",
      nama_bab: "Bab VIII Ketentuan Penutup",
      nomor_bab: "8",
    },
    {
      isi_pasal:
        "Pasal 9\nPeraturan Gubernur ini mulai berlaku pada tanggal diundangkan. Agar setiap orang mengetahuinya, memerintahkan pengundangan Peraturan Gubernur ini dengan penempatannya dalam Berita Daerah Provinsi Jawa Barat.",
      nama_bab: "Bab IX Ketentuan Penutup",
      nomor_bab: "9",
    },
  ],
  judul_perda:
    "PERATURAN GUBERNUR JAWA BARAT\nNOMOR 11 TAHUN 2021\nTENTANG\nPENGAMANAN BARANG MILIK DAERAH BERUPA TANAH\nPEMERINTAH DAERAH PROVINSI JAWA BARAT",
  nomor_perda: "Peraturan Gubernur Jawa Barat Nomor 11 Tahun 2021",
};
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
