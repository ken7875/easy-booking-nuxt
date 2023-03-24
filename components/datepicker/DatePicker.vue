<template>
  <div class="border border-[#dee2e6] rounded-[8px] bg-white">
    <div class="flex border-1 border-[#dee2e6] h-full w-full">
      <div class="dateInput" @click="openCalendarHandler('from')">
        <p v-timeFormat="showDateRange.star"></p>
      </div>
      <div class="dateInput" @click="openCalendarHandler('to')">
        <p v-timeFormat="showDateRange.end"></p>
      </div>
    </div>
    <div class="flex absolute bg-white datepicker" v-if="openCalendar" ref="datepicker">
      <!-- 三角形指標 -->
      <div
        :class="[
          'w-0 absolute top-[-3%] duration-300 ease-linear border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-b-[11px] border-b-[#000]',
          dateOrder === 'from' ? 'left-[10%]' : 'left-[60%]'
        ]"
      ></div>
      <Panel
        :calendarDateProps="firstCalendarDate"
        v-model:dateOrder="dateOrder"
        adjustBtn="prev"
        @adjustDate="adjustDate"
      />
      <Panel
        :calendarDateProps="secondCalendarDate"
        v-model:dateOrder="dateOrder"
        adjustBtn="next"
        @adjustDate="adjustDate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// 兩個日曆拆分為兩個元件做
import { ref, watch, reactive, nextTick } from 'vue';
import Panel from './DatePanel.vue';
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';

const { useDatePicker } = useStore();
const datePickerStore = useDatePicker();
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

const adjustDate = (methods: string) => {
  if (methods === 'prev') {
    if (firstCalendarDate.month > 0) {
      firstCalendarDate.month--;
    } else {
      firstCalendarDate.month = 11;
      firstCalendarDate.year -= 1;
    }
    if (secondCalendarDate.month > 0) {
      secondCalendarDate.month--;
    } else {
      secondCalendarDate.month = 11;
      secondCalendarDate.year -= 1;
    }
  } else {
    if (firstCalendarDate.month < 11) {
      firstCalendarDate.month++;
    } else {
      firstCalendarDate.month = 0;
      firstCalendarDate.year += 1;
    }
    if (secondCalendarDate.month < 11) {
      secondCalendarDate.month++;
    } else {
      secondCalendarDate.month = 0;
      secondCalendarDate.year += 1;
    }
  }
};

const openCalendar = ref(false);
const dateOrder = ref('from');
const datepicker = ref<HTMLElement | null>(null);
// 預設時間為今天到昨天
const arrowPos = ref('20%');

const openCalendarHandler = (option: string) => {
  openCalendar.value = true;
  nextTick(() => {
    if (option === 'from') {
      arrowPos.value = '20%';
      datepicker.value?.style?.setProperty('--pos', arrowPos.value);
      dateOrder.value = option;
    } else {
      arrowPos.value = '60%';
      datepicker.value?.style?.setProperty('--pos', arrowPos.value);
      dateOrder.value = option;
    }
  });
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
    arrowPos.value = val.arrowPos;
    openCalendar.value = val.openCalendar;
    showDateRange.value.star = val.isoDate[0];
    showDateRange.value.end = val.isoDate[1];
    console.log(showDateRange.value, 'outer value');
  },
  {
    deep: true,
    immediate: true
  }
);
</script>