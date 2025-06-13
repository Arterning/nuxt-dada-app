<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../lib/supabaseClient'

const clothes = ref([])
const searchQuery = ref('')
const isModalOpen = ref(false)
const currentClothe = ref(null)

// 表单数据
const formData = ref({
  name: '',
  category_name: '',
  category: '',
  image_url: '',
  purchase_date: '',
  price: '',
  purchase_link: '',
  washing_method: '',
  status: '已购买'
})

async function getClothes() {
  const { data } = await supabase.from('clothes').select()
  clothes.value = data
}

const filteredClothes = computed(() => {
  return clothes.value.filter(clothe => 
    clothe.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 打开模态框
function openModal(clothe = null) {
  if (clothe) {
    currentClothe.value = clothe
    formData.value = { ...clothe }
  } else {
    currentClothe.value = null
    formData.value = {
      name: '',
      category_name: '',
      category: '',
      image_url: '',
      purchase_date: '',
      price: '',
      purchase_link: '',
      washing_method: '',
      status: '已购买'
    }
  }
  isModalOpen.value = true
}

// 关闭模态框
function closeModal() {
  isModalOpen.value = false
}

// 保存服装信息
async function saveClothe() {
  if (currentClothe.value) {
    // 更新现有服装
    await supabase.from('clothes').update(formData.value).eq('id', currentClothe.value.id)
  } else {
    // 创建新服装
    await supabase.from('clothes').insert(formData.value)
  }
  await getClothes()
  closeModal()
}

// 删除服装
async function deleteClothe(clothe) {
  await supabase.from('clothes').delete().eq('id', clothe.id)
  await getClothes()
}

onMounted(async () => {
  await getClothes()
})
</script>

<template>
  <div class="p-4">
    <div class="flex mb-4">
      <input 
        v-model="searchQuery" 
        placeholder="搜索服装..." 
        class="w-full p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      <button 
        @click="openModal()" 
        class="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
      >
        创建服装
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div 
        v-for="clothe in filteredClothes" 
        :key="clothe.id" 
        class="bg-gray-800/50 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
      >
        <img 
          :src="clothe.image_url" 
          alt="{{ clothe.name }}" 
          v-if="clothe.image_url" 
          class="w-full h-60 object-cover"
        />
        <div class="flex gap-2 p-2 items-center">
          <h3 class="text-lg font-semibold text-gray-800">{{ clothe.name }}</h3>
          <p class="text-gray-600">类别: {{ clothe.category_name || clothe.category }}</p>
          <p class="text-gray-600">价格: {{ clothe.price }}</p>
          <p class="text-green-500 font-semibold">状态: {{ clothe.status }}</p>

          <div class="flex justify-end space-x-2">
            <button 
              @click="openModal(clothe)" 
              class="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
            >
              编辑
            </button>
            <button 
              @click="deleteClothe(clothe)" 
              class="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 模态框 -->
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
      <div class="bg-slate-600 p-6 rounded-lg z-10 w-1/2">
        <h2 class="text-xl font-semibold mb-4">{{ currentClothe ? '编辑' : '创建' }}服装</h2>
        <form @submit.prevent="saveClothe">
          <div class="mb-4">
            <label class="block mb-1">名称:</label>
            <input v-model="formData.name" class="w-full p-2 border border-gray-300 rounded">
          </div>
          <div class="mb-4">
            <label class="block mb-1">类别名称:</label>
            <input v-model="formData.category_name" class="w-full p-2 border border-gray-300 rounded">
          </div>
          <div class="mb-4">
            <label class="block mb-1">类别:</label>
            <input v-model="formData.category" class="w-full p-2 border border-gray-300 rounded">
          </div>
          <div class="mb-4">
            <label class="block mb-1">图片 URL:</label>
            <input v-model="formData.image_url" class="w-full p-2 border border-gray-300 rounded">
          </div>
          <div class="mb-4">
            <label class="block mb-1">购买日期:</label>
            <input v-model="formData.purchase_date" type="date" class="w-full p-2 border border-gray-300 rounded">
          </div>
          <div class="mb-4">
            <label class="block mb-1">价格:</label>
            <input v-model="formData.price" type="number" step="0.01" class="w-full p-2 border border-gray-300 rounded">
          </div>
          <div class="mb-4">
            <label class="block mb-1">购买链接:</label>
            <input v-model="formData.purchase_link" class="w-full p-2 border border-gray-300 rounded">
          </div>
          <div class="mb-4">
            <label class="block mb-1">洗涤方法:</label>
            <textarea v-model="formData.washing_method" class="w-full p-2 border border-gray-300 rounded"></textarea>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeModal" class="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
              取消
            </button>
            <button type="submit" class="bg-green-500 text-white p-2 rounded hover:bg-green-600">
              {{ currentClothe ? '更新' : '创建' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 可以移除原有的样式，因为现在使用 Tailwind 类名 */
</style>