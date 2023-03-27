<template>
  <div
    class="lg:w-full lg:bg-[#f9fafa] lg:h-[5rem] lg:border-b-2 lg:border-[#E6EAEA] lg:pl-[20%] lg:rounded-0 lg:shadow-none bg-white w-[90%] mx-auto shadow-[0_4px_16px_rgba(0,0,0,0.3)] rounded-[8px]"
  >
    <div class="flex items-center w-full flex-wrap">
      <BaseInput v-model="country" placeholder="請輸入地區" class="lg:w-[250px] h-[3rem] px-[10px] lg:mb-0" />
      <Datepicker class="lg:w-[30%] w-[50%] h-[3rem] lg:mx-[20px] lg:mb-0" />
      <PeopleCounter ref="PeopleCounterInstance" class="lg:mb-0 lg:w-[10rem] w-[50%] h-[3rem]" />
      <Button class="lg:w-[100px] lg:rounded-t-[8px] lg:ml-[10px] w-full h-[3rem] rounded-t-none" @click="search"
        >搜尋</Button
      >
    </div>
  </div>
</template>

<script setup ts="lang">
import Datepicker from '~~/components/datepicker/DatePicker.vue';
import BaseInput from '../form/BaseInput.vue';
import PeopleCounter from './PeopleCounter.vue';
import Button from '../Button.vue';
import { ref } from 'vue-demi';
import { useStore } from '~~/store';
import { storeToRefs } from 'pinia';

const { useDatePicker, useHotel } = useStore();

const datepickerStore = useDatePicker();
const { date } = storeToRefs(datepickerStore);

const hotelStore = useHotel();

const country = ref('');
const PeopleCounterInstance = ref(null);

const emit = defineEmits(['updateProducts']);

const search = () => {
  // TODO 資料篩選，補上時間篩選、飯店名稱可優化為(地區、名稱)
  const people = PeopleCounterInstance.value.options.people;
  // const date = {
  //   starttime: date.value.isoDate[0],
  //   endtime: date.value.isoDate[1]
  // };
  hotelStore.$patch({
    hotelFilterObj: {
      country: country.value,
      people,
      starttime: date.value.isoDate[0],
      endtime: date.value.isoDate[1]
    }
  });
  emit('updateProducts', true);
};
</script>
