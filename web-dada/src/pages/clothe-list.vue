<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../lib/supabaseClient'

const clothes = ref([])
const searchQuery = ref('')

async function getClothes() {
  const { data } = await supabase.from('clothes').select()
  clothes.value = data
}

const filteredClothes = computed(() => {
  return clothes.value.filter(clothe => 
    clothe.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

onMounted(async () => {
  await getClothes()
})
</script>

<template>
  <div>
    <input v-model="searchQuery" placeholder="搜索服装..." />
    <div class="card-container">
      <div v-for="clothe in filteredClothes" :key="clothe.id" class="card">
        <img :src="clothe.image_url" alt="{{ clothe.name }}" v-if="clothe.image_url" />
        <h3>{{ clothe.name }}</h3>
        <p>类别: {{ clothe.category_name || clothe.category }}</p>
        <p>价格: {{ clothe.price }}</p>
        <p>状态: {{ clothe.status }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card img {
  max-width: 100%;
  height: auto;
}
</style>