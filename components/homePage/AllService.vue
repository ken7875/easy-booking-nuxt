<template>
  <section
    class="bg-homeScrollImg relative bg-black overflow-hidden grid lg:grid-cols-5 grid-cols-3 rows-auto p-[1px] w-full py-[20px]"
  >
    <div
      :class="[' ml-[-1px] relative']"
      :style="isMobile ? { 'grid-column': `${i % 3}/${(i % 3) + 1}` } : { 'grid-column': `${i % 5}/${(i % 5) + 1}` }"
      v-for="i in 15"
      :key="i"
      @click="openServiceDetail(randomImgPosition.indexOf(i))"
    >
      <div v-border class="absolute top-0 left-0 w-full h-[0.5px] bg-white z-[2]"></div>
      <div v-border class="absolute top-0 left-0 w-[1px] h-full bg-white z-[2]"></div>
      <div class="flex">
        <div class="w-[25px] h-[25px] relative">
          <div v-border class="absolute bottom-0 left-0 w-full h-[0.5px] bg-white"></div>
          <div v-border class="absolute top-0 right-0 w-[1px] h-full bg-white"></div>
        </div>
        <p class="text-white" v-if="randomImgPosition.indexOf(i) > -1">
          {{ allServiceAry[randomImgPosition.indexOf(i)]?.title }}
        </p>
      </div>
      <div class="w-[calc(100%-24px)] ml-[24px] h-[calc(100%-26px)] relative group overflow-hidden">
        <div v-border class="absolute top-0 left-0 w-full h-[0.5px] bg-white z-[2]"></div>
        <div v-border class="absolute top-0 left-0 w-[1px] h-full bg-white z-[2]"></div>
        <img
          :src="`/img/${allServiceAry[randomImgPosition.indexOf(i)]?.img}.jpg`"
          alt=""
          class="w-full h-full group-hover:scale-110 duration-300 z-[1]"
          v-if="randomImgPosition.includes(i)"
        />
        <div
          class="absolute top-0 left-0 w-full h-full group-hover:flex hidden justify-center items-center bg-[rgba(0,0,0,0.3)]"
          v-if="randomImgPosition.indexOf(i) > -1"
        >
          <p class="lg:text-[1.8rem] text-[1rem] text-white">
            {{
              allServiceAry[randomImgPosition.indexOf(i)]?.modalName
                ? allServiceAry[randomImgPosition.indexOf(i)]?.title
                : '功能尚未開放'
            }}
          </p>
        </div>
      </div>
      <div
        v-border
        class="absolute bottom-0 left-0 w-full h-[0.5px] bg-white z-[2]"
        v-if="isMobile ? i / 12 > 1 : i / 8 > 1"
      ></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';

const { useModal, useMessage, useAuth } = useStore();
const modalStore = useModal();
const msgStore = useMessage();
const authStore = useAuth();

const { isMobile } = useDevice();

// 'B&B'
// 'AirTicket'
// 'AirTicketAndHotel'
// 'Rent'
const allServiceAry = ref([
  {
    title: '所有飯店',
    img: 'cars',
    modalName: 'Hotels',
    auth: false
  },
  {
    title: '私人民宿',
    img: 'villa',
    modalName: null,
    auth: false
  },
  {
    title: '機票',
    img: 'airplane',
    modalName: null,
    auth: true
  },
  {
    title: '機票 + 酒店',
    img: 'airplaneAndHotel',
    modalName: null,
    auth: true
  },
  {
    title: '月租住宿',
    img: 'monthlyRend',
    modalName: null,
    auth: false
  },
  {
    title: '機場接送',
    img: 'monthlyRend',
    modalName: 'AirportPickUp',
    auth: true
  },
  {
    title: '優惠活動',
    img: 'villa',
    modalName: null,
    auth: false
  }
]);

const randomImgPosition = computed(() => [1, 3, 5, 7, 9, 11, 15]);
const serviceModalType = ref('');

const { modalType, toggleModal } = modalStore;

const { openMsg } = msgStore;

const { token } = storeToRefs(authStore);

const router = useRouter();

const openServiceDetail = (idx: number) => {
  if (allServiceAry.value[idx]?.modalName === null) {
    openMsg({
      content: '此功能尚未開放'
    });
    return;
  }
  if (allServiceAry.value[idx]?.auth && !token.value) {
    openMsg({
      content: '請先登入'
    }).then(() => {
      router.push('/Login');
    });
    return;
  }
  serviceModalType.value = allServiceAry.value[idx]?.modalName as string;

  toggleModal(true);
  modalType({ components: serviceModalType.value });
};
</script>
