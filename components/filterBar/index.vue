<template>
  <div class="h-[8rem] bg-[#f9fafa] py-[20px] w-full px-[20%]">
    <div class="w-full h-full flex items-center">
      <div class="flex-[1_1_0%] pr-[10px] border-x-[3px] border-[#E6EAEA] h-full px-[20px]">
        <p class="mb-[20px]">價格範圍</p>
        <RangeSlider
          @updateProducts="updateProducts($event, 'price')"
          :max="hotelFilterObj['price[lte]']!"
          :min="hotelFilterObj['price[gte]']!"
        />
      </div>
      <div class="flex-[1_1_0%] h-full flex items-center justify-between px-[20px]">
        <div class="w-[50%]">
          <p class="mb-[20px]">評分</p>
          <BaseSelect
            v-model="rateValue"
            :options="rateSelect"
            @change="updateProducts($event, 'rating')"
            class="w-full"
          />
        </div>
        <div class="w-[50%]">
          <p class="mb-[20px]">飯店等級</p>
          <BaseSelect
            v-model="starsValue"
            :options="hotelStars"
            @change="updateProducts($event, 'stars')"
            class="w-full"
          />
        </div>
      </div>
      <div class="filter-item flex-[1_1_0%] border-x-[3px] border-[#E6EAEA] h-full flex items-center px-[20px]">
        <div class="w-full">
          <p class="mb-[20px]">其他條件</p>
          <DropDownMenu>
            <template #trigger>
              <p>
                <span>已套用</span>
                <span>{{ chooseServiceArray.length }}</span>
                <span>條件</span>
              </p>
            </template>
            <template #dropDownList>
              <ul class="flex flex-wrap">
                <li v-for="(service, i) in services" :key="i" class="w-[50%] mb-[10px]">
                  <input
                    type="checkbox"
                    :id="`service${i}`"
                    :value="service"
                    v-model="chooseServiceArray"
                    @change="updateProducts($event, 'service')"
                  />
                  <label :for="`service${i}`">
                    <client-only>
                      <font-awesome-icon :icon="icon(service)" class="ml-[8px] mr-[4px]" />
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
  </div>
</template>

<script setup lang="ts">
import RangeSlider from './RangeSlider.vue';
import BaseSelect from '../form/BaseSelect.vue';
import DropDownMenu from '../DropDownMenu.vue';
import throttle from '~~/utils/throttle';
import icon from '~~/utils/icon';
import { useHotel } from '~~/store/hotel';
import { storeToRefs } from 'pinia';
// import { AllHoteFilterObj } from '~~/model/hotel';

const hotelStore = useHotel();
const { hotelFilterObj } = storeToRefs(hotelStore);
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

const rateValue = ref(0);
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
  },
  {
    value: 0,
    content: { text: '無限制' }
  }
]);

const starsValue = ref(0);

const services = ['游泳池', '健身房', '停車場', '機場接送', '酒吧', '溫泉', '禁菸房', '景觀', '提供早餐', '免費網路'];
const chooseServiceArray = ref<string[]>([]);

// const hotelFilterObj: AllHoteFilterObj = {
//   'price[gte]': 0,
//   'price[lte]': 20000,
//   'ratingAverage[gte]': 0,
//   'stars[gte]': 1,
//   'service[in]': [],
//   page: 1,
//   limit: 10
// };

const emit = defineEmits(['updageProducts']);

const updateProducts = throttle((price: { min: number; max: number }, type: string) => {
  console.log(chooseServiceArray.value);
  switch (type) {
    case 'price':
      hotelStore.$patch({
        hotelFilterObj: {
          'price[gte]': price.min,
          'price[lte]': price.max
        }
      });
      // hotelFilterObj['price[gte]'] = price.min;
      // hotelFilterObj['price[lte]'] = price.max;
      break;
    case 'rating':
      hotelStore.$patch({
        hotelFilterObj: {
          'ratingAverage[gte]': rateValue.value
        }
      });
      // hotelFilterObj.ratingAverage = rateValue.value;
      break;
    case 'stars':
      hotelStore.$patch({
        hotelFilterObj: {
          'stars[gte]': starsValue.value
        }
      });
      // hotelFilterObj.stars = starsValue.value;
      break;
    case 'service':
      hotelStore.$patch({
        hotelFilterObj: {
          'service[in]': chooseServiceArray.value.length > 0 ? chooseServiceArray.value : services
        }
      });
      // hotelFilterObj['service[in]'] = chooseServiceArray.value;
      break;

    default:
      break;
  }

  //   const queryStr = `price[gte]=${priceRange.min}&price[lte]=${priceRange.max}`;
  // getAllHotels();
  emit('updageProducts', true);
}, 800);
</script>
