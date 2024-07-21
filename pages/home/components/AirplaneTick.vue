<template>
  <div class="h-screen w-full flex items-center justify-center relative" ref="airplaneTickWrapRef">
    <h3 class="absolute top-[4%] lg:left-[15%] left-[50%] translate-x-[-50%] text-[5rem] whitespace-nowrap text-black">
      超值機票
    </h3>
    <h3
      class="absolute bottom-[5%] lg:left-[85%] left-[50%] translate-x-[-50%] text-[5rem] whitespace-nowrap text-black"
    >
      Hot Hotel
    </h3>
    <main class="grid grid-cols-3 gap-8 w-[90%] h-[70%]">
      <div v-for="ticket in airplaneTickets" :key="ticket._id" class="flex items-center" ref="card">
        <Card :isHorizontal="true" class="w-full h-[150px] card">
          <template #header>
            <div class="w-[25%] h-full flex justify-center items-center">
              <p>{{ ticket.airline }}</p>
            </div>
          </template>
          <template #body>
            <div class="w-[50%] flex items-center">
              <div class="w-full">
                <div class="flex justify-between items-center mb-[10px]">
                  <p class="font-[600]">{{ ticket.from }}</p>
                  <svg
                    class="svg-inline--fa fa-plane-departure text-[1.5rem] text-[#e5e7eb]"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="plane-departure"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path
                      fill="currentColor"
                      d="M381 114.9L186.1 41.8c-16.7-6.2-35.2-5.3-51.1 2.7L89.1 67.4C78 73 77.2 88.5 87.6 95.2l146.9 94.5L136 240 77.8 214.1c-8.7-3.9-18.8-3.7-27.3 .6L18.3 230.8c-9.3 4.7-11.8 16.8-5 24.7l73.1 85.3c6.1 7.1 15 11.2 24.3 11.2H248.4c5 0 9.9-1.2 14.3-3.4L535.6 212.2c46.5-23.3 82.5-63.3 100.8-112C645.9 75 627.2 48 600.2 48H542.8c-20.2 0-40.2 4.8-58.2 14L381 114.9z"
                    ></path>
                  </svg>
                  <p class="font-[600]">{{ ticket.to }}</p>
                </div>
                <div class="w-[calc(100%-22px)] border-2 line mb-[8px]"></div>
                <div class="flex justify-between">
                  <p class="text-[15px] font-[600] text-primary">{{ ticket.boardTime }}</p>
                  <p class="text-[12px]">
                    <span class="mr-[5px]">總時長:</span>
                    <span v-if="ticket.totalTime.days">{{ ticket.totalTime.days }}天</span>
                    <span v-if="ticket.totalTime.hours">{{ ticket.totalTime.hours }}小時</span>
                    <span v-if="ticket.totalTime.minutes">{{ ticket.totalTime.minutes }}分</span>
                  </p>
                  <p class="text-[15px] font-[600] text-secondary">{{ ticket.arriveTime }}</p>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="w-[25%] flex justify-center items-center">
              <p class="text-[600] text-[20px]">${{ ticket.paid }}</p>
            </div>
          </template>
        </Card>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { apiMethods } from '@/api/index';
import moment from 'moment';
import type { AirplaneTicket } from '~/model/airplane';
import { useDateFormat } from '@vueuse/core';
import gsap from 'gsap';

type AirplaneTicketWithFormatTotalTime = Omit<AirplaneTicket, 'totalTime'> & {
  totalTime: { days: number; hours: number; minutes: number };
};

const card = ref<HTMLElement[]>([]);
const airplaneTickWrapRef = ref<HTMLElement>();

const airplaneTickets = ref<AirplaneTicketWithFormatTotalTime[]>([]);

const { data, error } = await useAsyncData('airplaneTicket', () => apiMethods.airplane.getAllAirplaneTicket());

if (data.value) {
  airplaneTickets.value = data.value.data.data.map((ticket) => {
    const totalDiff = moment.duration(ticket.totalTime);

    return {
      ...ticket,
      boardTime: useDateFormat(ticket.boardTime, 'HH:mm').value,
      arriveTime: useDateFormat(ticket.arriveTime, 'HH:mm').value,
      totalTime: {
        days: Math.floor(totalDiff.days()),
        hours: Math.floor(totalDiff.hours()),
        minutes: Math.floor(totalDiff.minutes())
      }
    };
  });
}

let tl = null;
const flipCardAnimate = () => {
  const cardArray = gsap.utils.toArray(card.value);
  tl = useScrollAnimation({
    trigger: airplaneTickWrapRef.value
  });

  tl?.fromTo(cardArray, { rotateX: 0 }, { rotateX: 720, stagger: 0.1, duration: 1.2 });
};

// await getAirplaneTick();

watch(
  card,
  (val) => {
    if (val.length >= airplaneTickets.value.length) {
      flipCardAnimate();
    }
  },
  {
    deep: true
  }
);
</script>

<style>
.line {
  position: relative;
}
.line::after {
  content: '';
  position: absolute;
  right: -22px;
  bottom: -2px;
  background: #e5e7eb;
  width: 22px;
  height: 22px;
  clip-path: polygon(0 54%, 0% 100%, 70% 100%);
}

.card {
  transform-style: preserve-3d;
}
</style>
