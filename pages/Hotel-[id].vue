<template>
  <div>
    <section class="lg:w-[1140px] w-full mx-auto">
      <ImageGroup :hotelDetailData="hotelDetailData || null" :height="'h-[450px]'" />
    </section>
    <section class="lg:w-[1140px] w-full mx-auto">
      <div class="w-full grid grid-cols-5 auto-rows-auto gap-x-[15px] gap-y-[15px]">
        <article class="lg:col-[1_/_4] col-[1_/_6] px-[20px] lg:px-0">
          <HotelInformation :hotelDetailData="hotelDetailData || null" />
          <template v-if="!isDesktop">
            <div class="mt-[20px] overflow-hidden">
              <h3 class="text-[1.3rem] mb-[8px]">所有評論</h3>
              <Reviews :reviews="hotelDetailData?.reviews || []"></Reviews>
            </div>
            <ul class="w-full flex h-[3rem] mt-[20px]">
              <li
                @click="openModal('map')"
                class="flex-[1_1_0] flex justify-center items-center h-full border border-darkLight"
              >
                地圖
              </li>
              <li
                @click="openModal('viewPorts')"
                class="flex-[1_1_0] flex justify-center items-center h-full border border-darkLight"
              >
                附近的景點
              </li>
            </ul>
          </template>
          <div class="my-[20px]">
            <!-- TODO 搜尋功能未完善 -->
            <searchBar
              :hasCountryInput="false"
              :datePickerWidth="'lg:w-[48%] w-[50%]'"
              class="w-full my-[30px]"
            ></searchBar>
            <ul class="flex">
              <li class="flex-[1_1_0] text-center">照片</li>
              <li class="flex-[1_1_0] text-center">房型</li>
              <li class="flex-[1_1_0] text-center">人數</li>
              <li class="flex-[1_1_0] text-center">價錢</li>
              <li class="flex-[1_1_0] text-center">訂房</li>
            </ul>
            <ul class="my-[15px]">
              <li
                v-for="(type, i) in hotelDetailData?.roomType"
                :key="i"
                :class="['font-bold mb-[15px] lg:h-[7rem] h-[6rem]', { 'mb-0': i === hotelDetailData?.roomType?.length! - 1 }]"
              >
                <Card :isHorizontal="true" :detailType="{ title: '所有服務' }" class="border border-darkLight">
                  <template #header>
                    <div class="flex-[1_1_0]">
                      <img
                        :src="img"
                        alt="product-img"
                        v-for="(img, i) in type.image"
                        :key="i"
                        class="w-full h-full"
                        @click="checkServiceHandler(type._id)"
                      />
                    </div>
                  </template>
                  <template #body>
                    <ul class="flex flex-[4_1_0]">
                      <li class="flex-[1_1_0] flex items-center justify-center">
                        <h5 class="font-bold">{{ type.name }}</h5>
                      </li>
                      <li class="flex items-center justify-center flex-[1_1_0]">
                        <client-only>
                          <font-awesome-icon icon="user-large" class="mr-1" v-for="i in type.person" :key="i" />
                        </client-only>
                        <!-- <font-awesome-icon icon="user-large" class="ms-1 text-sm-sm" v-for="i in type.person.child" :key="i"/> -->
                      </li>
                      <li class="flex items-center justify-center flex-[1_1_0]">
                        <h6 class="font-bold">{{ type.price }}</h6>
                      </li>
                      <li class="flex-[1_1_0] text-center flex justify-center items-center">
                        <Button class="w-[60px] h-[50px]" @click="openReserve(type)"> 訂房 </Button>
                      </li>
                    </ul>
                  </template>
                  <template #detail v-if="showServiceId.isShow && showServiceId.id === type._id">
                    <li class="flex-[1_1_0]">
                      <div class="text-[0.8rem] flex flex-wrap">
                        <p v-for="(service, i) in hotelDetailData?.service" :key="i" class="mb-[5px] w-[50%]">
                          <client-only>
                            <font-awesome-icon :icon="icon(service)" class="mr-[5px]" />
                          </client-only>
                          <span>{{ service }}</span>
                        </p>
                      </div>
                    </li>
                  </template>
                </Card>
              </li>
            </ul>
          </div>
        </article>
        <article class="col-[4_/_6] overflow-hidden" v-if="isDesktop">
          <Card>
            <template v-slot:header>
              <div class="h-[30%] relative hover:scale-110 duration-300" @click="openModal('map')">
                <div
                  class="bg-[rgba(0,0,0,0.2)] w-full h-full absolute top-0 left-0 flex justify-center items-center cursor-pointer"
                >
                  <p class="text-[2rem] text-white">查看地圖</p>
                </div>

                <img src="/img/checkMap.png" alt="map" class="object-cover object-top w-full h-full" />
              </div>
            </template>
            <template v-slot:body>
              <div class="border-b border-darkLight p-[1rem]">
                <h5 class="my-2 text-[1.8rem]">{{ hotelDetailData?.name }}</h5>
                <span class="bg-[#28A745] rounded-[8px] p-2 mr-2 text-white">{{ hotelDetailData?.ratingAverage }}</span>
                <span>超級讚</span>
              </div>
              <div class="border-b border-darkLight py-[15px]">
                <h5 class="text-[1.5rem] ml-[15px] mb-[10px]">住客評論</h5>
                <Reviews :reviews="hotelDetailData?.reviews || []"></Reviews>
              </div>
              <!-- border-top border-dark-light pt-3 px-4 -->
              <div class="border-b border-darkLight p-[1rem]">
                <p class="flex justify-between"><span>停車服務</span><span class="text-[#28A745]">免費</span></p>
                <p class="flex justify-between"><span>提供早餐</span><span class="text-[#28A745]">免費</span></p>
              </div>
            </template>
            <template v-slot:footer>
              <h5 class="mt-3 px-4">附近的景點</h5>
              <ViewPorts :viewPorts="hotelDetailData?.viewPorts || []" />
            </template>
          </Card>
        </article>
      </div>
    </section>
    <div
      :class="[
        'fixed lg:translate-y-[150px] z-[1000] translate-y-[250px] bottom-0 left-0 w-full h-auto bg-white py-[30px] shadow-[1px_-5px_3px_#CED4DA] duration-1000',
        { '!translate-y-0': barOpen }
      ]"
    >
      <div class="lg:w-[1140px] w-full px-[15px] mx-auto h-full flex flex-wrap items-center justify-between">
        <h5 class="lg:w-[40%] w-full text-[1.875rem] font-bold">{{ reserveHotelInfo.roomTypeInfo.name }}</h5>
        <p class="mb-1 pl-2 text-primary font-bold text-[0.875rem] lg:w-fit w-full">
          *僅剩{{ reserveHotelInfo.roomTypeInfo.remainRoom }}間空房
        </p>
        <div class="lg:flex lg:items-center w-full lg:w-fit">
          <div class="flex items-center justify-between">
            <p class="mx-2">{{ reserveHotelInfo.day }} 晚</p>
            <div class="mx-2 flex items-center">
              <Button
                class="button__none"
                @click="reserveHotelInfo.bookingNum--"
                :disabled="reserveHotelInfo.bookingNum <= 1"
              >
                -
              </Button>
              <p class="mb-0 mx-[15px]">{{ reserveHotelInfo.bookingNum }}</p>
              <Button
                class="button__none"
                @click="reserveHotelInfo.bookingNum++"
                :disabled="reserveHotelInfo.roomTypeInfo.roomNum <= reserveHotelInfo.bookingNum"
              >
                +
              </Button>
              <p class="mb-0 ml-[10px]">數量</p>
            </div>
            <h6 class="text-[1.5rem] font-bold mx-2">{{ reserveHotelInfo.roomTypeInfo.price }}</h6>
          </div>
          <div class="flex justify-between items-center mt-[10px] lg:mt-0">
            <Button class="button__outline-darkLight w-[100px] lg:ml-[15px]" @click="barOpen = false">取消</Button>
            <Button
              :class="['w-[100px] ml-[15px]', reserveHotelInfo.bookingNum <= 0 ? 'button__gray' : 'button__primary']"
              @click="reserve"
              :disabled="reserveHotelInfo.bookingNum <= 0"
            >
              預定
            </Button>
          </div>
        </div>
      </div>
      <LazyLeafletModal v-model:is-open="leafletModalStatus" v-if="leafletModalStatus" class="w-[80%]" />
      <LazyHotelDetailPageViewPortsModal
        v-model:is-open="ViewPortsModalStatus"
        v-if="ViewPortsModalStatus"
      ></LazyHotelDetailPageViewPortsModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProductApi } from '~~/api/hotel';
import { storeToRefs } from 'pinia';
import { useStore } from '~~/store/index';
import icon from '~~/utils/icon';
import { type RoomType, type ReserveHotelInfo } from '~~/model/hotel';
import Card from '~~/components/card/index.vue';
import Button from '~~/components/Button.vue';
import { useRouter, useRoute } from 'vue-router';
import { type Hotel } from '~~/model/hotel';
import Reviews from '~~/components/hotelDetailPage/Reviews.vue';
import ViewPorts from '~~/components/hotelDetailPage/ViewPorts.vue';
import ImageGroup from '~~/components/hotelDetailPage/ImageGroup.vue';
import HotelInformation from '~~/components/hotelDetailPage/HotelInformation.vue';
// import Leaflet from '~~/components/LeafletModal.vue';

const route = useRoute();
const router = useRouter();

const hotelId = ref<string>(route.params.id as string);
const { data: hotelDetail, pending } = await useAsyncData('hotelDetail', () => getProductApi<Hotel>(hotelId.value));

const hotelDetailData = ref(hotelDetail.value?.data?.data);

useHead({
  title: hotelDetailData?.value?.name,
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: hotelDetailData?.value?.description }
  ]
});

const device = useDevice();
const { isDesktop } = device;

const { useDatePicker, useBooking, useAuth, useLeaflet } = useStore();

const datePickerStore = useDatePicker();
const { date } = storeToRefs(datePickerStore);

const bookingStore = useBooking();
const { setReserHotelInfo } = bookingStore;

const authStore = useAuth();
const { token } = storeToRefs(authStore);

// const { toggleModal, modalType } = useModal();

const leafletStore = useLeaflet();
const { setCenterMarker, setMarkers } = leafletStore;

const showServiceId = ref({
  id: '',
  isShow: false
});

const checkServiceHandler = (id: string) => {
  // 若點擊相同id的型號，則關閉service頁面。
  showServiceId.value.isShow && showServiceId.value.id === id
    ? (showServiceId.value.isShow = false)
    : (showServiceId.value.isShow = true);

  showServiceId.value.id = id;
};

const barOpen = ref(false);
const dayTotal = (+new Date(date.value.isoDate[1]) - +new Date(date.value.isoDate[0])) / 86400 / 1000;
const reserveHotelInfo = reactive<ReserveHotelInfo>({
  productId: '',
  bookingNum: 1,
  discount: 100,
  roomTypeInfo: {
    remainRoom: 0,
    name: '',
    image: [],
    person: 0,
    service: [],
    price: 0,
    roomNum: 0,
    _id: ''
  },
  day: dayTotal,
  date: {
    checkinTime: date.value.isoDate[0],
    checkoutTime: date.value.isoDate[1]
  },
  paid: 0
});

const openReserve = (productInfo: RoomType) => {
  barOpen.value = true;
  reserveHotelInfo.productId = hotelId.value;
  reserveHotelInfo.roomTypeInfo = productInfo;
  reserveHotelInfo.date = {
    checkinTime: date.value.isoDate[0],
    checkoutTime: date.value.isoDate[1]
  };
};

const reserve = () => {
  reserveHotelInfo.paid = reserveHotelInfo.roomTypeInfo.price * reserveHotelInfo.bookingNum;
  setReserHotelInfo(reserveHotelInfo);
  let path = token.value ? '/Booking/Form' : '/Login';
  // JSON.stringify(reserveHotelInfo)
  router.push(path);
};

const leafletModalStatus = ref(false);
const ViewPortsModalStatus = ref(false);
const openModal = (type: string) => {
  if (type === 'map') {
    const coordinates = hotelDetailData.value?.locations?.coordinates;
    const [lng, lat] = coordinates!;
    setMarkers([[lat, lng]]);
    leafletModalStatus.value = true;
    console.log(leafletModalStatus.value, 'leafletModalStatus');
  } else if (type === 'viewPorts') {
    ViewPortsModalStatus.value = true;
  }
};
</script>

<style scoped>
.slide-move {
  transition: transform 0.2s;
}
</style>
