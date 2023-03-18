<template>
  <div class="w-[350px] border border-black shadow-[2px_2px_2px_2px_rgba(0,0,0,0.2)]">
    <div class="datePicker-head">
      <button
        :class="[
          'adjust bg-transparent bg-transparent border-0 p-0 text-[1.25rem]',
          adjustBtn === 'prev' ? 'mr-[15px]' : 'order-2 ml-[15px]'
        ]"
        @click.prevent="emit('adjustDate', adjustBtn)"
      >
        <font-awesome-icon :icon="['fa-solid', 'angle-left']" v-if="props.adjustBtn === 'prev'" />
        <font-awesome-icon :icon="['fa-solid', 'angle-right']" v-else />
      </button>
      <p>{{ `${calendarDateProps.year}年${calendarDateProps.month + 1}月` }}</p>
    </div>
    <div class="flex">
      <p v-for="date in dates" :key="date" class="grow text-center">{{ date }}</p>
    </div>
    <div class="w-full flex justify-center flex-wrap">
      <div
        v-for="(date, idx) in renderDate"
        :key="idx"
        @click="getDateRange(date)"
        class="flex-[2_2_14.2%] px-[10px] py-[10px] text-center cursor-pointer"
      >
        {{ date.date }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '@/store/index';
import { DateType } from './type';

const { useDatePicker } = useStore();
const datePickerStore = useDatePicker();
const { getDate } = datePickerStore;

interface Props {
  adjustBtn: string;
  calendarDateProps: DateType;
  dateOrder: string;
}

const props = withDefaults(defineProps<Props>(), {
  dateOrder: 'from'
});
const { adjustBtn, calendarDateProps, dateOrder } = toRefs(props);

const dates = ref(['日', '一', '二', '三', '四', '五', '六']);

// 每個月的第一天
const firstDay = computed(() => {
  const mDate = new Date(calendarDateProps.value.year, calendarDateProps.value.month, 1);
  const date = new Date(calendarDateProps.value.year, calendarDateProps.value.month, 1 - mDate.getDay());

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    day: date.getDay()
  };
});

type RenderDate = DateType & { fdate: Date };

const renderDate = computed<RenderDate[]>(() => {
  const allDate = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(firstDay.value.year, firstDay.value.month, firstDay.value.date + i);
    allDate.push({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      day: date.getDay(),
      fdate: date
    });
  }

  return allDate;
});

const emit = defineEmits<{
  (e: 'adjustDate', adjustBtn: string): void;
  (e: 'update:dateOrder', dateOrderReverse: string): void;
}>();

const getDateRange = (date: RenderDate) => {
  const dateOrderReverse = dateOrder.value === 'from' ? 'to' : 'from';
  emit('update:dateOrder', dateOrderReverse);
  getDate({
    dateRangeISO: date.fdate,
    openCalendar: true,
    dateOrder: dateOrder.value
  });
};
</script>
