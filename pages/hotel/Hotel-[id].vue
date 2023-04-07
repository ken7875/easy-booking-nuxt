<template>
  <div>
    <section class="lg:w-[1140px] w-full mx-auto">
      <div
        v-if="isDesktop"
        class="w-full grid grid-cols-5 auto-rows-auto gap-x-[15px] gap-y-[15px] h-[450px] my-[50px]"
      >
        <div
          class="bg-center bg-cover bg-no-repeat col-[1_/_4] row-[1_/_5]"
          :style="{ backgroundImage: `url(${hotelDetailData?.images[0]})` }"
        ></div>
        <div
          class="bg-center bg-cover bg-no-repeat col-[4_/_6] row-[1_/_3]"
          :style="{ backgroundImage: `url(${hotelDetailData?.images[1]})` }"
        ></div>
        <div
          class="bg-center bg-cover bg-no-repeat col-[4_/_5] row-[3_/_4]"
          :style="{ backgroundImage: `url(${hotelDetailData?.images[2]})` }"
        ></div>
        <div
          class="bg-center bg-cover bg-no-repeat col-[5_/_6] row-[3_/_4]"
          :style="{ backgroundImage: `url(${hotelDetailData?.images[3]})` }"
        ></div>
        <div
          class="bg-center bg-cover bg-no-repeat col-[4_/_5] row-[4_/_5]"
          :style="{ backgroundImage: `url(${hotelDetailData?.images[4]})` }"
        ></div>
        <div
          class="bg-center bg-cover bg-no-repeat col-[5_/_6] row-[4_/_5] relative hover:pointer"
          :style="{ backgroundImage: `url(${hotelDetailData?.images[5]})` }"
        >
          <div
            class="flex items-center justify-center absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] h-full w-full hover:cursor-pointer"
          >
            <p class="text-[1.25rem] text-white">查看更多</p>
          </div>
        </div>
      </div>
      <div class="overflow-hidden" v-else>
        <Slider
          :data="hotelDetailData?.images"
          :slide-item-width="'flex-[calc(100%)_0_0]'"
          :spacing="'ml-[-200%]'"
          :buttonPosition="'top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'"
          :buttonWidth="'w-full'"
          class="h-[250px]"
        >
          <template #swiperItem="{ slideItem, index }">
            <img :src="slideItem.item" :alt="`${hotelDetailData?.name}${index}`" class="w-[100%] h-full" />
            <!-- <p>{{ slideItem }} {{ index }}</p> -->
          </template>
        </Slider>
      </div>
    </section>
    <section class="lg:w-[1140px] w-full mx-auto">
      <div class="w-full grid grid-cols-5 auto-rows-auto gap-x-[15px] gap-y-[15px]">
        <article class="lg:col-[1_/_4] col-[1_/_6] px-[20px] lg:px-0">
          <div class="lg:flex lg:items-center">
            <h2 class="mr-3 text-[2rem]">{{ hotelDetailData?.name }}</h2>
            <div class="flex items-center">
              <div
                class="mr-[8px] h-[18px] bg-contain bg-[url('/img/star.png')]"
                :style="{ width: `${hotelDetailData?.stars ? 18 * hotelDetailData?.stars : 0}px` }"
              ></div>
              <span>({{ hotelDetailData?.ratingAverage }})</span>
            </div>
          </div>
          <span v-textSlice:[sliceNum]="hotelDetailData?.description"></span>
          <span v-show="!isTextShow">...</span>
          <span class="text-secondary ml-[5px] cursor-pointer" @click="seeMore">{{
            !isTextShow ? '閱讀更多' : '隱藏內容'
          }}</span>
          <div class="border border-darkLight px-[15px] mt-[20px]">
            <h3 class="text-[1.3rem] mb-[8px]">免費設施</h3>
            <div class="flex flex-wrap">
              <p v-for="(service, i) in hotelDetailData?.service" :key="i" class="mb-0 mr-[20px]">
                <client-only>
                  <font-awesome-icon :icon="icon(service)" class="mr-2" />
                </client-only>
                <span>{{ service }}</span>
              </p>
            </div>
          </div>
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
              <!-- TODO 新增幾晚價錢 -->
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
                          <font-awesome-icon icon="user-large" class="me-1" v-for="i in type.person" :key="i" />
                        </client-only>
                        <!-- <font-awesome-icon icon="user-large" class="ms-1 text-sm-sm" v-for="i in type.person.child" :key="i"/> -->
                      </li>
                      <li class="flex items-center justify-center flex-[1_1_0]">
                        <h6 class="font-bold">{{ type.price }}</h6>
                      </li>
                      <li class="flex-[1_1_0] text-center flex justify-center items-center">
                        <Button class="button__secondary w-[60px] h-[50px]" @click="openReserve(type)"> 訂房 </Button>
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
              <div class="h-[30%]">
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
              <h5 class="mt-3">附近的景點</h5>
              <ViewPorts :viewPorts="hotelDetailData?.viewPorts || []" />
            </template>
          </Card>
        </article>
      </div>
    </section>
    <div
      :class="[
        'fixed lg:translate-y-[150px] translate-y-[250px] bottom-0 left-0 w-full h-auto bg-white py-[30px] shadow-[1px_-5px_3px_#CED4DA] duration-1000',
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
            <p class="mx-2">2 晚</p>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProductApi } from '@/api/hotel';
import { storeToRefs } from 'pinia';
import { useStore } from '~~/store/index';
import icon from '~~/utils/icon';
import SearchBar from '~~/components/searchBar/index.vue';
import { RoomType, ReserveHotelInfo } from '~~/model/hotel';
import Card from '~~/components/card/index.vue';
import Slider from '~~/components/slider/slider.vue';
import Button from '~~/components/Button.vue';
import { useRouter, useRoute } from 'vue-router';
import { Hotel } from '~~/model/Hotel';
import Reviews from '~~/components/hotelDetailPage/Reviews.vue';
import ViewPorts from '~~/components/hotelDetailPage/ViewPorts.vue';

const device = useDevice();
const { isDesktop } = device;

const route = useRoute();
const router = useRouter();

const { useDatePicker, useBooking, useAuth, useModal } = useStore();

const datePickerStore = useDatePicker();
const { date } = storeToRefs(datePickerStore);

const bookingStore = useBooking();
const { setReserHotelInfo } = bookingStore;

const authStore = useAuth();
const { token } = storeToRefs(authStore);

const { toggleModal, modalType } = useModal();

const hotelId = ref<string>(route.params.id as string);
const { data: hotelDetail, pending } = await useAsyncData('hotelDetail', () => getProductApi<Hotel>(hotelId.value), {
  initialCache: false
});

const hotelDetailData = ref(hotelDetail.value?.data?.data);
const PeopleCounterInstance = ref();

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
  date: {
    checkinTime: date.value.isoDate[0],
    checkoutTime: date.value.isoDate[1]
  }
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
  setReserHotelInfo(reserveHotelInfo);
  let path = token.value ? '/booking/reserveForm' : '/auth/login';
  console.log(token.value, 'token token token');
  router.push(path);
};

const sliceNum = ref(315);
const isTextShow = ref(false);
const seeMore = () => {
  isTextShow.value = !isTextShow.value;
  if (isTextShow.value) {
    sliceNum.value = hotelDetailData.value?.description?.toString()?.length as number;
  } else {
    sliceNum.value = 315;
  }
};

const openModal = (type: string) => {
  toggleModal(true);
  if (type === 'map') {
    modalType('Leaflet');
  } else if (type === 'viewPorts') {
    modalType('ViewPortsModal');
  }
};
</script>

<style scoped>
.slide-move {
  transition: transform 0.2s;
}
</style>
