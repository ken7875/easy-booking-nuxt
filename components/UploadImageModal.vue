<template>
  <ModalLayout v-model:isOpen="isOpen">
    <template #default>
      <div class="relative h-full">
        <div v-if="checkImg" class="h-[80%]">
          <img :src="(checkImg as string)" alt="" class="w-full h-full object-center" />
        </div>
        <div class="absolute bottom-0 w-full py-[15px] flex justify-center">
          <Button bg-color="button__secondary w-[30%]" @click="uploadPhoto">上傳</Button>
        </div>
      </div>
    </template>
  </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from './modal/index.vue';
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';
import Button from './Button.vue';
import { updateUserApi } from '~~/api/auth';

const { useAuth, useMessage } = useStore();
const authStore = useAuth();
const { checkImg, formData, userInfo } = storeToRefs(authStore);
const { getAvatar } = authStore;

const msgStore = useMessage();
const { openMsg } = msgStore;

const isOpen = defineModel({ default: false });
const { id } = userInfo.value!;

const uploadPhoto = async () => {
  if (!formData.value) {
    openMsg({
      title: '錯誤',
      content: '找不到檔案'
    });

    return;
  }

  try {
    await updateUserApi(id, formData.value);
    await getAvatar();

    openMsg({
      title: '訊息',
      content: '更換頭貼成功'
    });

    isOpen.value = false;
  } catch (error) {
    console.log(error);
    openMsg({
      title: '錯誤',
      content: '更換頭貼失敗'
    });
  }
};
</script>
