<template>
  <div>
    <div id="main_container" class="fadeIn">
      {{ paginatedList.length }}
      <div class="header_title_container">
        <h1 class="header_title_container">Dokumen BUMD</h1>
      </div>
      <div v-if="errorMessage" class="error_message">{{ errorMessage }}</div>
      <div v-if="paginatedList.length" class="table_container">
        <div class="optionButton">
          <button class="plusButton" @click="navigateToFormDokumen">
            Tambahkan Dokumen
          </button>
          <button
            class="deleteButton"
            v-if="!showCheckboxes"
            @click="showCheckboxes = true"
          >
            Hapus Dokumen
          </button>
          <div v-if="showCheckboxes">
            <button class="deleteButton" @click="confirmDelete">
              Delete Selected
            </button>
            <button class="cancelButton" @click="cancelSelection">
              Batalkan
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Perda</th>
              <th>Deskripsi</th>
              <th v-if="showCheckboxes">
                <input
                  type="checkbox"
                  @change="selectAll"
                  class="select_all_checkbox"
                />
                Select All
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in paginatedList" :key="index">
              <td class="kolomNama">{{ item.name }}</td>
              <td class="kolomPerda">{{ item.perda }}</td>
              <td>
                <div class="kolomDeskripsi">
                  <VueMarkdown
                    v-if="!item.showMore"
                    :source="descPendek(item.desc)"
                  />
                  <VueMarkdown v-else :source="item.desc" />
                  <div class="showmore" @click="toggleShowMore(index)">
                    {{ item.showMore ? "Show Less" : "Show More" }}
                  </div>
                </div>
              </td>
              <td v-if="showCheckboxes">
                <input
                  type="checkbox"
                  v-model="selectedItems"
                  :value="item"
                  class="row_checkbox"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button
            class="paginationButton"
            @click="prevPage"
            :disabled="currentPage === 1"
          >
            <<
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            class="paginationButton"
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >
            >>
          </button>
        </div>
      </div>
      <div v-else class="no-documents">
        Belum ada dokumen apapun <br />
        <button class="plusButton mr-2" @click="navigateToFormDokumen">
          Tambahkan Dokumen
        </button>
      </div>
    </div>
    <div v-if="showConfirmDialog" class="confirm_dialog">
      <div class="confirm_content">
        <p>Apakah anda yakin ingin menghapus dokumen ini?</p>
        <button @click="deleteDokumen">Ya</button>
        <button @click="showConfirmDialog = false">Tidak</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import VueMarkdown from "vue-markdown-render";
import { baseUrl } from "@/BaseUrl";

const currentList = ref([]);
const selectedItems = ref([]);
const errorMessage = ref("");
const currentPage = ref(1);
const itemsPerPage = 4;
const showCheckboxes = ref(false);
const showConfirmDialog = ref(false);
const router = useRouter();

const fetchBumdList = async () => {
  try {
    currentList.value = [];
    const response = await fetch(`${baseUrl}/bumd/all`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    currentList.value = data.map((item) => {
      return { ...item, showMore: false };
    });
    selectedItems.value = [];
  } catch (error) {
    console.error("Failed to fetch BUMD list:", error);
    errorMessage.value = "Periksa Koneksi Internet Anda";
  }
};

onMounted(async () => {
  await fetchBumdList();
  console.log("input dokumen bumd");
  console.log(import.meta.env.MODE);
  console.log(import.meta.env);
});

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return currentList.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(currentList.value.length / itemsPerPage);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const deleteDokumen = async () => {
  try {
    const selectedIds = selectedItems.value.map((item) => item._id);
    console.log(selectedIds);
    const response = await fetch(`${baseUrl}/dms/perda-bumd`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedIds),
    });
    if (!response.ok) {
      alert("Failed to delete selected items");
      return;
    }
    currentList.value = await Promise.all(
      currentList.value.filter((item) => !selectedIds.includes(item._id)),
    );
    console.log(currentList.value);
    if (currentPage.value>totalPages.value) currentPage.value=1;
    selectedItems.value = [];
    showCheckboxes.value = false;
    errorMessage.value = "";
    showConfirmDialog.value = false;
  } catch (error) {
    showConfirmDialog.value = false;
    errorMessage.value = "Terjadi kesalahan saat menghapus data";
    alert("Failed to delete selected items");
  }
};

const confirmDelete = () => {
  showConfirmDialog.value = true;
};

const selectAll = (event) => {
  if (event.target.checked) {
    selectedItems.value = [...paginatedList.value];
  } else {
    selectedItems.value = [];
  }
};

const toggleShowMore = (index) => {
  const actualIndex = (currentPage.value - 1) * itemsPerPage + index;
  currentList.value[actualIndex].showMore =
    !currentList.value[actualIndex].showMore;
};

const descPendek = (desc) => {
  return desc.length > 75 ? desc.substring(0, 75) + "..." : desc;
};

const cancelSelection = () => {
  showCheckboxes.value = false;
  selectedItems.value = [];
};

function navigateToFormDokumen() {
  router.push("/inputDokumenBumd");
}
</script>

<style scoped>
#main_container {
  background-image: url("../assets/19449741.jpg");
  background-repeat: repeat-x;
  background-size: cover;
  min-height: 90vh;
  padding: 0 40px 0 40px;
  text-align: left;
}

.header_title_container {
  padding-top: 20px;
  /* margin-bottom: 20px; */
  text-align: center;
}

h1.header_title_container {
  font-family: Helvetica;
  font-weight: lighter;
  font-size: 3em;
  margin: 0;
  padding: 0;
}

.optionButton {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  height: 60px;
}

.no-documents {
  text-align: center;
  font-size: 1.5em;
  margin-top: 100px;
  color: #333;
}

.plusButton {
  height: 50px;
  max-width: 200px;
  margin-right: 2px;
}

.deleteButton {
  background-color: red;
  height: 50px;
  margin-right: 2px;
}

.cancelButton {
  background-color: gray;
  height: 50px;
}

.table_container {
  margin: 5px auto;
  width: 90%;
  max-width: 1500px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 15px;
  text-align: left;
}

th {
  background-color: #4f8383;
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.kolomNama {
  width: 250px;
  height: 150px;
}

.kolomPerda {
  width: 200px;
  height: 150px;
}

.kolomDeskripsi {
  max-width: 700px;
  height: auto;
}

button {
  background-color: #4f8383;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #396060;
}

.showmore {
  color: #4f8383;
  cursor: pointer;
}

.select_all_checkbox,
.row_checkbox {
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.paginationButton {
  margin: -3px 8px;
}

.error_message {
  color: red;
  font-size: 1.2em;
  margin: 10px 0;
}

.fadeIn {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.confirm_dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm_content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.confirm_content p {
  margin-bottom: 20px;
}

.confirm_content button {
  margin: 0 10px;
  padding: 10px 20px;
  cursor: pointer;
}

.confirm_content button:first-of-type {
  background-color: red;
}

.confirm_content button:last-of-type {
  background-color: gray;
}
</style>
