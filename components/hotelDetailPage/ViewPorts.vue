<template>
  <div class="border-top border-dark-light p-4 w-100">
    <p v-for="(viewPort, i) in viewPorts" :key="i" class="flex justify-between mb-[10px]">
      <span class="font-bold mr-[14px]">{{ viewPort.name }}</span>
      <span>{{ viewPort.distance.toFixed(1) }} km</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { type ViewPorts } from '~~/model/hotel';

interface Props {
  viewPorts: ViewPorts[];
}

defineProps<Props>();
</script>
