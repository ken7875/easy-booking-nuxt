<template>
  <div class="flex items-center justify-center bg-[#F9FAFA]">
    <BaseInput v-model="destrict" placeholder="請輸入地區" class="w-[250px] h-[3rem]" />
    <Datepicker class="w-[25%] h-[3rem] mx-[20px]" />
    <PeopleCounter />
    <Button class="w-[100px] h-[3rem]">搜尋</Button>
  </div>
</template>

<script setup ts="lang">
import Datepicker from '@/components/datepicker/DatePicker.vue';
import BaseInput from '../form/BaseInput.vue';
import PeopleCounter from './PeopleCounter.vue';
import Button from '../Button.vue';
import { ref } from 'vue-demi';

const destrict = ref('');
</script>
