<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Ref } from 'vue'

const a:Ref<string> = ref('')
a.value = '3'
</script>
