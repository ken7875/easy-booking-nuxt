<template>
  <div class="relative py-[20px] px-0 mb-[50px]">
    <ul class="w-full flex justify-between items-center">
      <li
        :class="[
          'w-[60px] h-[60px] rounded-[50%] border-2 border-black bg-white',
          curStep === i ? 'bg-[#00FF00] shadow-[1px_1px_15px_#00FF00]' : curStep > i ? 'bg-[#00DD00]' : ''
        ]"
        v-for="(step, i) in steps"
        :key="i"
      >
        <div class="flex flex-col items-center justify-center whitespace-nowrap translate-y-[17px]">
          <p>step {{ i + 1 }}</p>
          <p class="mt-[20px]">{{ step }}</p>
        </div>
      </li>
    </ul>
    <div
      class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[-1] w-[98%] h-[10px] border-2 border-black"
    >
      <div class="h-[7px] bg-[#00DD00]" :style="{ width: `${finishBarWidth}%` }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  steps: string[];
  curStep: number;
  finishBarWidth: number;
}

defineProps<Props>();
</script>
