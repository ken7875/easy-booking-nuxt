<template>
  <div class="w-full px-[20px] flex h-fit">
    <ul class="w-[50%] p-[20px]">
      <li v-for="(hotel, i) in loadedHotels" :key="i" :isHorizontal="true" class="mb-[20px]">
        <Card :detailType="detailType" class="border border-[#dee2e6]">
          <template #header>
            <img
              :src="hotel.images[0]"
              alt=""
              class="h-[8vw] w-[10vw] object-cover object-center"
              @click="checkProduct(hotel.id, '所有圖片')"
            />
          </template>
          <template #body>
            <div class="h-full w-full">
              <h2 class="font-bold text-[2rem] ml-[10px]">{{ hotel.name }}</h2>
              <div class="flex items-center ml-[10px] h-[18px] mb-[5px]">
                <div
                  class="mr-[8px] h-[18px] bg-contain bg-[url('/img/star.png')]"
                  :style="{ width: `${18 * hotel.stars}px` }"
                ></div>
                <span v-if="hotel.stars >= 3">{{ hotel.stars }}級飯店</span>
              </div>
              <div
                class="pl-[10px] py-[8px] border-y border-[#dee2e6] flex items-center"
                @click="checkProduct(hotel.id, '詳細介紹')"
              >
                <p class="block mr-[5px]">{{ hotel.locations.address }}</p>
                <font-awesome-icon :icon="['fa-solid', `angle-${detailType.title === '詳細介紹' ? 'up' : 'down'}`]" />
              </div>
              <div class="pl-[10px] py-[8px] flex items-center" @click="checkProduct(hotel.id, '所有評論')">
                <p class="mb-0 w-100 mr-[5px]">
                  <span class="badge bg-success">
                    {{ hotel.ratingAverage }}
                  </span>
                  ({{ hotel.ratingQuantity }} 則評論)
                </p>
                <font-awesome-icon :icon="['fa-solid', `angle-${detailType.title === '所有評論' ? 'up' : 'down'}`]" />
              </div>
            </div>
          </template>
          <template #footer>
            <div class="w-[40%] border-l border-[#dee2e6] p-[10px]">
              <div class="flex items-baseline justify-end">
                <p class="text-[1.7rem] text-end text-primary mr-[5px]">$ {{ hotel.price }}</p>
                <p class="leading-[1] text-[0.5rem] text-end">每晚</p>
              </div>
              <p class="text-end text-[0.8rem] my-[15px]">剩下x間空房</p>
              <!-- <button class="" @click="goDetail(hotel.id)">查看房間詳情></button> -->
              <router-link :to="`/hotel/Hotel-${hotel.id}`" class="button button__outline-primary"
                >查看房間詳情</router-link
              >
            </div>
          </template>
          <template #detail>
            <component :is="renderComp" />
          </template>
        </Card>
      </li>
    </ul>
    <Leaflet class="sticky top-0 right-0 self-start" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue-demi';
import { useHotel } from '@/store/hotel';
import { storeToRefs } from 'pinia';
import Card from '@/components/card/index.vue';
import Images from '@/components/productsPage/card/Images.vue';
import Introduce from '@/components/productsPage/card/Introduce.vue';
import Reviews from '@/components/productsPage/card/Reviews.vue';
import throttle from '~~/utils/throttle';
import Leaflet from '~~/components/Leaflet.vue';
import { Hotel } from '~~/model/hotel';

definePageMeta({
  layout: 'default'
});

let htmlDom: HTMLElement | null = null;

const pageData = reactive({
  page: 1,
  limit: 10
});

const loadedHotels = ref<Hotel[]>([]);
const hotelStore = useHotel();
const { getAllHotels } = hotelStore;
const { allHotels, hotelTotal } = storeToRefs(hotelStore);

// 取得所有飯店api
const getAllHotelsHandler = async (page: number, limit: number) => {
  await getAllHotels({ page, limit });
  loadedHotels.value.push(...allHotels.value);
};

const handleScroll = () => {
  if (loadedHotels.value.length >= hotelTotal.value) {
    window.removeEventListener('scroll', throttleScroll);
    htmlDom = null;
    return;
  }

  const { scrollTop, clientHeight, scrollHeight } = htmlDom!;

  if (scrollTop + clientHeight >= scrollHeight - 50 && loadedHotels.value.length < hotelTotal.value) {
    getAllHotelsHandler(++pageData.page, pageData.limit);
  }
};

const throttleScroll = throttle(handleScroll.bind(this, htmlDom), 500);

// TODO 懶加載待優化
onMounted(() => {
  getAllHotelsHandler(1, 10);
  if (process.client) {
    htmlDom = document.querySelector('html')!;
    window.addEventListener('scroll', throttleScroll);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', throttleScroll);
  htmlDom = null;
});
type CurComp = {
  所有圖片: ReturnType<typeof defineComponent>;
  所有評論: ReturnType<typeof defineComponent>;
  詳細介紹: ReturnType<typeof defineComponent>;
};

const curComp: CurComp = {
  所有圖片: Images,
  所有評論: Reviews,
  詳細介紹: Introduce
};

interface detailType {
  id: string;
  title: '所有圖片' | '所有評論' | '詳細介紹' | '';
}

const renderComp = shallowRef(null);

const detailType = ref<detailType>({
  id: '',
  title: ''
});

const checkProduct = (id: string, title: keyof CurComp): void => {
  renderComp.value = curComp[title];
  detailType.value = { id, title };
};
</script>
