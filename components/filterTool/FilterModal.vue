<template>
  <div>
    <ModalLayout>
      <template #title>
        <p>篩選條件</p>
      </template>
      <template #default>
        <div class="pr-[10px] mb-[40px] border-y border-[#E6EAEA] px-[1.5rem] py-[10px]">
          <p class="mb-[20px]">價格範圍</p>
          <RangeSlider
            @updateProducts="updateProducts($event, 'price')"
            :max="hotelFilterObj['maxPrice']!"
            :min="hotelFilterObj['minPrice']!"
          />
        </div>
        <div class="flex items-center justify-between mb-[40px] border-y border-[#E6EAEA] px-[1.5rem] py-[10px]">
          <div class="w-[50%] border-r border-[#E6EAEA]">
            <p class="mb-[20px]">評分</p>
            <BaseSelect
              v-model="rateValue"
              :options="rateSelect"
              @change="updateProducts(rateValue, 'rating')"
              class="w-full"
            />
          </div>
          <div class="w-[50%] ml-[1.5rem]">
            <p class="mb-[20px]">飯店等級</p>
            <BaseSelect
              v-model="starsValue"
              :options="hotelStars"
              @change="updateProducts(starsValue, 'stars')"
              class="w-full"
            />
          </div>
        </div>
        <div class="filter-item flex items-center border-y border-[#E6EAEA] px-[1.5rem] py-[10px]">
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
      </template>
    </ModalLayout>
  </div>
</template>

<script setup lang="ts">
import ModalLayout from '~~/components/modal/index.vue';
import RangeSlider from './RangeSlider.vue';
import BaseSelect from '../form/BaseSelect.vue';
import DropDownMenu from '../DropDownMenu.vue';
import icon from '~~/utils/icon';
import { useHotel } from '~~/store/hotel';
import { storeToRefs } from 'pinia';
import { type OptionsType } from '~~/model/hotel';

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

const options = reactive<OptionsType>({
  price: {
    max: hotelFilterObj.value['maxPrice']!,
    min: hotelFilterObj.value['minPrice']!
  },
  ratingAverage: 0,
  stars: 0,
  service: []
});

const updateProducts = useThrottle((value: any, type: string) => {
  filterHandler(type, value);
}, 800);
</script>
