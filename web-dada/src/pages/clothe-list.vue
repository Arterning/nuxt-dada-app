<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

const instruments = ref([])

async function getInstruments() {
  console.log("hhhfjfs")
  const { data } = await supabase.from('clothes').select()
  console.log("data",data)
  instruments.value = data
}

onMounted(async () => {
   await getInstruments()
})
</script>

<template>
    <div>Test</div>
  <ul>
    <li v-for="instrument in instruments" :key="instrument.id">{{ instrument.name }}</li>
  </ul>
</template>