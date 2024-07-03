<template>
  <div class="h-[8rem] bg-[#f9fafa] pt-[20px] pb-[4px] w-full px-[20%] hidden lg:block">
    <div class="w-full h-full flex items-center">
      <div class="flex-[1_1_0%] pr-[10px] border-x-[3px] border-[#E6EAEA] h-full px-[20px]">
        <p class="mb-[10px]">價格範圍</p>
        <RangeSlider
          @updateProducts="updateProducts($event, 'price')"
          :max="hotelFilterObj['price[lte]']!"
          :min="hotelFilterObj['price[gte]']!"
        />
      </div>
      <div class="flex-[1_1_0%] h-full flex items-top justify-between px-[20px]">
        <div class="w-[50%] mr-[15px]">
          <p class="mb-[27px]">評分</p>
          <BaseSelect
            v-model="rateValue"
            :options="rateSelect"
            @change="updateProducts(rateValue, 'rating')"
            class="w-full"
          />
        </div>
        <div class="w-[50%]">
          <p class="mb-[27px]">飯店等級</p>
          <BaseSelect
            v-model="starsValue"
            :options="hotelStars"
            @change="updateProducts(starsValue, 'stars')"
            class="w-full"
          />
        </div>
      </div>
      <div class="flex-[1_1_0%] border-x-[3px] border-[#E6EAEA] h-full flex items-top px-[20px]">
        <div class="w-full">
          <p class="mb-[27px]">其他條件</p>
          <DropDownMenu>
            <template #trigger>
              <p class="input">
                <span>已套用</span>
                <span>{{ chooseServiceArray.length }}</span>
                <span>條件</span>
              </p>
            </template>
            <template #dropDownList>
              <ul class="flex flex-wrap">
                <li v-for="(service, i) in baseServices" :key="i" class="w-[50%] mb-[10px]">
                  <input
                    type="checkbox"
                    :id="`service${i}`"
                    :value="service"
                    v-model="chooseServiceArray"
                    @change="updateProducts(chooseServiceArray, 'service')"
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
import icon from '~~/utils/icon';
import { useHotel } from '~~/store/hotel';
import { storeToRefs } from 'pinia';

const hotelStore = useHotel();
const { filterHandler } = hotelStore;
const { hotelFilterObj, baseServices } = storeToRefs(hotelStore);
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

const chooseServiceArray = ref<string[]>([]);

// const options = reactive<OptionsType>({
//   price: {
//     max: hotelFilterObj.value['price[lte]']!,
//     min: hotelFilterObj.value['price[gte]']!
//   },
//   ratingAverage: 0,
//   stars: 0,
//   service: []
// });

// const emit = defineEmits(['updateProducts']);

const updateProducts = useThrottle((value: any, type: string) => {
  console.log(type, value);
  filterHandler(type, value);

  // emit('updateProducts', true);
}, 800);
</script>
