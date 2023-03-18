<template>
  <div class="relative dropdownWrap" @click="openOption = true">
    <slot name="trigger" />
    <div
      class="bg-white py-[20px] px-[15px] absolute top-[115%] left-0 z-[10] shadow-[3px_3px_15px_#CED4DA]"
      v-show="openOption"
    >
      <slot name="dropDownList" />
    </div>
  </div>
</template>

<script setup lang="ts">
const openOption = ref(false);

watch(openOption, (val) => {
  if (!val) {
    window.removeEventListener('click', () => {
      console.log('remove click listener');
    });
  }
});

onMounted(() => {
  window.addEventListener('click', (e: Event) => {
    // if (e.target.closest('.dropdownWrap') && !e.target.classList.contains('button__primary')) {
    //   return
    // }
    if (!(e.target as HTMLElement)?.closest('.dropdownWrap')) {
      openOption.value = false;
    }
  });
});
</script>
