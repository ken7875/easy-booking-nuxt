<template>
  <div :class="['w-[350px] bg-white px-[1px]']">
    <div class="h-[2.5rem] mt-[5px] pl-[5px] border-b border-darkLight">
      <p class="font-bold" v-if="adjustBtn === 'prev'">請選擇入住日期</p>
    </div>
    <div class="text-center pb-[20px] px-0 flex jusitfy-center items-center">
      <button
        :class="[
          'adjust bg-transparent border-0 p-0 text-[1.25rem]',
          adjustBtn === 'prev' ? 'ml-[15px]' : 'order-2 mr-[15px]'
        ]"
        @click.prevent="emit('adjustDate', adjustBtn)"
      >
        <font-awesome-icon :icon="['fa-solid', 'angle-left']" v-if="adjustBtn === 'prev'" />
        <font-awesome-icon :icon="['fa-solid', 'angle-right']" v-else />
      </button>
      <p class="mx-auto">{{ `${calendarDateProps.year}年${calendarDateProps.month + 1}月` }}</p>
      <!-- 此為手機板型next按鈕 -->
      <button
        :class="['adjust bg-transparent border-0 p-0 text-[1.25rem] block lg:hidden mr-[15px]']"
        @click.prevent="emit('adjustDate', 'next')"
      >
        <font-awesome-icon :icon="['fa-solid', 'angle-right']" />
      </button>
    </div>
    <div class="flex">
      <p v-for="date in dates" :key="date" class="grow text-center">{{ date }}</p>
    </div>
    <div class="w-full flex justify-center flex-wrap">
      <div
        v-for="(date, idx) in renderDate"
        :key="idx"
        @click="getDateRange(date, idx)"
        :class="[
          'flex-[2_2_14.2%] px-[10px] py-[10px] text-center',
          { 'cursor-pointer': choosableDate(date.fdate) },
          {
            '!bg-darkLight text-white': disableDate(date.fdate)
          },
          { 'bg-secondary-light': duringRange(date.fdate) && choosableDate(date.fdate) },
          { 'bg-secondary': targetDate(date.fdate) && choosableDate(date.fdate) }
        ]"
      >
        {{ choosableDate(date.fdate) ? date.date : '' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '~~/store/index';
import { DateType } from './type';
import { storeToRefs } from 'pinia';

const { useDatePicker } = useStore();
const datePickerStore = useDatePicker();
const { getDate } = datePickerStore;
const { date: dateData } = storeToRefs(datePickerStore);

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
  const firstDate = ref(new Date(calendarDateProps.value.year, calendarDateProps.value.month, 1, 0, 0, 0));
  const date = new Date(
    calendarDateProps.value.year,
    calendarDateProps.value.month,
    1 - firstDate.value.getDay(),
    0,
    0,
    0
  );

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
    const date = new Date(firstDay.value.year, firstDay.value.month, firstDay.value.date + i, 0, 0, 0);

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

const getDateRange = (date: RenderDate, idx: number) => {
  if (calendarDateProps.value.month !== date.fdate.getMonth()) {
    return;
  }

  const dateOrderReverse = dateOrder.value === 'from' ? 'to' : 'from';
  emit('update:dateOrder', dateOrderReverse);
  getDate({
    dateRangeISO: date.fdate,
    openCalendar: true,
    dateOrder: dateOrder.value
  });
};

// 1-30/31 日都為可選範圍
const choosableDate = (date: Date) => calendarDateProps.value.month === date.getMonth();

// 今天前範圍與不在此日曆當月範圍內的日期都不可選並且標為灰色(只需判斷當前月份)
const disableDate = (date: Date) => +date < new Date().setHours(0, 0, 0, 0) && choosableDate(date);

// 選擇範圍內配色
const duringRange = (date: Date) => +dateData.value.isoDate[0] < +date && +dateData.value.isoDate[1] > +date;

// 被選擇的日期配色
const targetDate = (date: Date) => +dateData.value.isoDate[0] === +date || +dateData.value.isoDate[1] === +date;
</script>
