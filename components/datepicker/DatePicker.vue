<template>
  <div class="border border-[#dee2e6] lg:rounded-[8px] rounded-none bg-white z-[50]">
    <div class="flex border-1 border-[#dee2e6] h-full w-full">
      <div
        :class="['dateInput border-r border-[#dee2e6]', { 'bg-darkLight': dateOrder === 'from' && openCalendar }]"
        @click="openCalendarHandler('from')"
      >
        <p v-timeFormat="showDateRange.star"></p>
      </div>
      <div
        :class="['dateInput', { 'bg-darkLight': dateOrder === 'to' && openCalendar }]"
        @click="openCalendarHandler('to')"
      >
        <p v-timeFormat="showDateRange.end"></p>
      </div>
    </div>
    <div
      class="absolute shadow-[0px_1px_2px_3px_rgba(0,0,0,0.2)] bg-white datepicker"
      v-if="openCalendar"
      ref="datepicker"
    >
      <!-- 三角形指標 -->
      <div
        :class="[
          'lg:block hidden w-0 absolute top-[-3%] duration-300 ease-linear border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-b-[11px] border-b-[#000]',
          dateOrder === 'from' ? 'lg:left-[10%] left-[5%]' : 'lg:left-[35%] left-[20%]'
        ]"
      ></div>
      <div>
        <div class="pl-[5px] border-b border-darkLight py-[10px]">
          <p class="font-bold ml-[15px]">請選擇入住日期</p>
        </div>
        <div class="flex">
          <Panel
            :calendarDateProps="firstCalendarDate"
            v-model:dateOrder="dateOrder"
            adjustBtn="prev"
            @adjustDate="adjustDateStrategy['goPrevDate']()"
            class="lg:mr-[15px]"
          />
          <Panel
            :calendarDateProps="secondCalendarDate"
            v-model:dateOrder="dateOrder"
            adjustBtn="next"
            @adjustDate="adjustDateStrategy['goNextDate']()"
            v-if="isDesktop"
          />
        </div>
      </div>
      <div class="flex items-center mt-[8px] border-t border-darkLight p-[8px]">
        <p
          class="border border-darkLight rounded-[15px] px-[8px] py-[4px] text-[0.9rem] mr-[10px]"
          @click="setSpecifyDate('tonight')"
        >
          今晚
        </p>
        <p
          class="border border-darkLight rounded-[15px] px-[8px] py-[4px] text-[0.9rem] mr-[10px]"
          @click="setSpecifyDate('tomorrow night')"
        >
          明晚
        </p>
        <p
          class="border border-darkLight rounded-[15px] px-[8px] py-[4px] text-[0.9rem] mr-[10px]"
          @click="setSpecifyDate('this week')"
        >
          這週末
        </p>
        <p
          class="border border-darkLight rounded-[15px] px-[8px] py-[4px] text-[0.9rem] mr-[10px]"
          @click="setSpecifyDate('next week')"
        >
          下週末
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 兩個日曆拆分為兩個元件做
import { ref, watch, reactive, nextTick } from 'vue';
import Panel from './DatePanel.vue';
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';

const device = useDevice();
const { isDesktop } = device;

const { useDatePicker } = useStore();
const datePickerStore = useDatePicker();

const { getDate } = datePickerStore;
const { date: dateRange } = storeToRefs(datePickerStore);

const date = new Date();
const firstCalendarDate = reactive({
  year: date.getFullYear(),
  month: date.getMonth(),
  date: date.getDate(),
  day: date.getDay(),
  hour: date.getHours()
});

const secondCalendarDate = reactive({ ...firstCalendarDate, month: firstCalendarDate.month + 1 });

const adjustDateStrategy = {
  goPrevDate: () => {
    firstCalendarDate.month = (firstCalendarDate.month + 11) % 12;
    firstCalendarDate.year -= firstCalendarDate.month === 11 ? 1 : 0;

    secondCalendarDate.month = (secondCalendarDate.month + 11) % 12;
    secondCalendarDate.year -= secondCalendarDate.month === 11 ? 1 : 0;
  },
  goNextDate: () => {
    firstCalendarDate.month = (firstCalendarDate.month + 1) % 12;
    firstCalendarDate.year += firstCalendarDate.month === 0 ? 1 : 0;

    secondCalendarDate.month = (secondCalendarDate.month + 1) % 12;
    secondCalendarDate.year += secondCalendarDate.month === 0 ? 1 : 0;
  }
};

const openCalendar = ref(false);
const dateOrder = ref('from');
const datepicker = ref<HTMLElement | null>(null);
// 預設時間為今天到昨天
// const arrowPos = ref('20%');

const openCalendarHandler = (option: string) => {
  openCalendar.value = true;
  nextTick(() => {
    if (option === 'from') {
      dateOrder.value = option;
    } else {
      dateOrder.value = option;
    }
  });
};

const getSpecifyDate = (dateType: string) => {
  let oneDayMillisecond = 86400000;
  const defaultDate = new Date().setHours(0, 0, 0, 0);

  let date = [new Date(defaultDate), new Date(defaultDate + oneDayMillisecond)];

  switch (dateType) {
    case 'tomorrow night':
      date = [new Date(defaultDate + oneDayMillisecond), new Date(defaultDate + oneDayMillisecond * 2)];
      break;

    case 'this week':
      date = [new Date(defaultDate + oneDayMillisecond * 7), new Date(defaultDate + oneDayMillisecond * 8)];
      break;

    case 'next week':
      date = [new Date(defaultDate + oneDayMillisecond * 14), new Date(defaultDate + oneDayMillisecond * 15)];
      break;
  }

  return date;
};

const setSpecifyDate = (dateType: string) => {
  const date: Date[] = getSpecifyDate(dateType);

  getDate({ dateRangeISO: date[0], openCalendar: true, dateOrder: 'from' });
  getDate({ dateRangeISO: date[1], openCalendar: false, dateOrder: 'to' });
};

const closeDatepicker = (e: Event) => {
  if (!(e.target as HTMLElement)?.closest('.dateInput') && !(e.target as HTMLElement)?.closest('.datepicker')) {
    openCalendar.value = false;
  }
};

watch(openCalendar, (val) => {
  if (val) {
    document.addEventListener('click', closeDatepicker);
  }
  if (!val) {
    document.removeEventListener('click', closeDatepicker);
  }
});

const showDateRange = ref({
  star: dateRange.value.isoDate[0],
  end: dateRange.value.isoDate[1]
});
watch(
  dateRange,
  (val) => {
    openCalendar.value = val.openCalendar;
    showDateRange.value.star = val.isoDate[0];
    showDateRange.value.end = val.isoDate[1];
  },
  {
    deep: true,
    immediate: true
  }
);
</script>
