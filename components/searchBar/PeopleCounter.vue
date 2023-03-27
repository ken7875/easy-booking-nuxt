<template>
  <DropDownMenu>
    <template #trigger>
      <div
        class="text-[.75rem] leading-[1.3] border border-darkLight flex pl-[10px] items-center lg:rounded-[8px] rounded-0 mr-[20px] bg-white h-full w-full"
      >
        <div>
          <p class="mb-0">{{ options.room }}間房</p>
          <div class="flex relative">
            <p class="mr-1 font-bold">{{ options.adult }}位大人</p>
            <p class="font-bold">{{ options.child }}位兒童</p>
          </div>
        </div>
      </div>
    </template>
    <template #dropDownList>
      <ul class="w-[250px]">
        <li class="flex justify-between items-center mb-[50px]">
          <p class="nowrap">成人</p>
          <div class="flex items-center justify-between w-[70%]">
            <button class="" @click.prevent="add('adult')">+</button>
            <input type="number" v-model="tempOptions.adult" class="w-[50px] text-center border-1 border-darkLight" />
            <button class="button__none" @click.prevent="minus('adult')">-</button>
          </div>
        </li>
        <li class="flex justify-between items-center mb-[50px]">
          <p class="nowrap">兒童</p>
          <div class="flex items-center justify-between w-[70%]">
            <button class="button__none" @click.prevent="add('child')">+</button>
            <input type="number" v-model="tempOptions.child" class="w-[50px] text-center border-1 border-darkLight" />
            <button class="button__none" @click.prevent="minus('child')">-</button>
          </div>
        </li>
        <li class="flex justify-between items-center mb-[50px]">
          <p class="nowrap">房間</p>
          <div class="flex items-center justify-between w-[70%]">
            <button class="button__none" @click.prevent="add('room')">+</button>
            <input type="number" v-model="tempOptions.room" class="w-[50px] text-center border-1 border-darkLight" />
            <button class="button__none" @click.prevent="minus('room')">-</button>
          </div>
        </li>
        <li>
          <button class="button__secondary w-full" @click.prevent="save">確定</button>
        </li>
      </ul>
    </template>
  </DropDownMenu>
</template>

<script setup lang="ts">
import DropDownMenu from '../DropDownMenu.vue';
interface Option {
  room: number;
  adult: number;
  child: number;
  people: number;
}

const options = reactive<Option>({
  room: 1,
  adult: 0,
  child: 0,
  people: 0
});

const tempOptions = reactive<Option>({ ...options });

const save = () => {
  // TODO 完善人數篩選
  options.room = tempOptions.room;
  options.adult = tempOptions.adult;
  options.child = tempOptions.child;
  options.people = tempOptions.adult + tempOptions.child;
};

const add = (type: keyof Option) => {
  switch (type) {
    case 'adult':
      tempOptions.adult++;
      break;
    case 'child':
      tempOptions.child++;
      break;
    case 'room':
      tempOptions.room++;
      break;
  }
};
const minus = (type: keyof Option) => {
  if (tempOptions[type] <= 0) {
    return;
  }
  switch (type) {
    case 'adult':
      tempOptions.adult--;
      break;
    case 'child':
      tempOptions.child--;
      break;
    case 'room':
      tempOptions.room--;
      break;
  }
};

defineExpose({
  options
});
</script>
