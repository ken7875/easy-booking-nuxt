<template>
  <div class="flex items-center h-[8rem]">
    <RangeSlider @updateProducts="updateProducts" :max="priceRange.max" :min="priceRange.min" class="flex-[1_1_0%]" />
    <div class="flex-[1_1_0%]">
      <p>評分</p>
      <!-- <BaseSelect v-model="rateValue" :options="rateSelect" @change="updateProducts($event, 'rating')" /> -->
    </div>
    <div>
      <p>飯店等級</p>
      <!-- <BaseSelect v-model="starsValue" :options="hotelStars" @change="updateProducts($event, 'stars')" /> -->
    </div>
    <div class="filter-item flex-[1_1_0%]">
      <div class="otherWrap">
        <p for="other">其他條件</p>
        <DropDownMenu>
          <template #trigger>
            <p>
              <span>已套用</span>
              <span>{{ chooseArray.length }}</span>
              <span>條件</span>
            </p>
          </template>
          <template #dropDownList>
            <ul class="selectList">
              <li v-for="(service, i) in services" :key="i" class="selectItem">
                <input type="checkbox" :id="`service${i}`" :value="service" v-model="chooseArray" />
                <label :for="`service${i}`">
                  <client-only>
                    <font-awesome-icon :icon="icon(service)" class="me-1" />
                  </client-only>
                  <span>{{ service }}</span>
                </label>
              </li>
            </ul>
          </template>
        </DropDownMenu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RangeSlider from './RangeSlider.vue';
import BaseSelect from '../form/BaseSelect.vue';
import DropDownMenu from '../DropDownMenu.vue';
import throttle from '~~/utils/throttle';
import { useStore } from '@/store/index';
import icon from '~~/utils/icon';

const { useHotel } = useStore();
const { getAllHotels } = useHotel();

const priceRange = reactive({
  min: 5000,
  max: 15000
});

const updateProducts = throttle((e: any) => {
  //   const queryStr = `price[gte]=${priceRange.min}&price[lte]=${priceRange.max}`;
  const queryStr = {
    'price[gte]': e.min,
    'price[lte]': e.max
  };
  console.log(e, 'asdasdasdasd');
  getAllHotels(queryStr);
}, 800);

const rateSelect = ref([
  {
    value: 4.5,
    content: { rate: 4.5, text: '非常好' }
  },
  {
    value: 3.5,
    content: { rate: 3.5, text: '很好' }
  },
  {
    value: 2.5,
    content: { rate: 2.5, text: '還可以' }
  },
  {
    value: 0,
    content: { rate: 0, text: '一般' }
  }
]);

const rateValue = ref(4.5);
const hotelStars = ref([
  {
    value: 5,
    content: { text: '5星飯店' }
  },
  {
    value: 4,
    content: { text: '4星飯店' }
  },
  {
    value: 3,
    content: { text: '3星飯店' }
  },
  {
    value: 2,
    content: { text: '2星飯店' }
  },
  {
    value: 1,
    content: { text: '1星飯店' }
  }
]);

const starsValue = ref(5);

const services = ['游泳池', '健身房', '停車場', '機場接送', '酒吧', '溫泉', '禁菸房', '景觀', '提供早餐', '免費網路'];
const chooseArray = ref([]);
</script>
