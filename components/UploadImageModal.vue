<template>
  <div>
    <ModalLayout>
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
  </div>
</template>

<script setup lang="ts">
import ModalLayout from './modal/ModalLayout.vue';
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';
import Button from './Button.vue';
import { updateUserApi } from '~~/api/auth';

const { useAuth, useMessage, useModal } = useStore();

const authStore = useAuth();
const { checkImg, formData, userInfo } = storeToRefs(authStore);
const { getAvatar } = authStore;

const msgStore = useMessage();
const { openMsg } = msgStore;

const modalStore = useModal();
const { toggleModal } = modalStore;

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
  } catch (error) {
    console.log(error);
  } finally {
    toggleModal(false);
  }
};
</script>
