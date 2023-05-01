<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-messageShadow"
    @click.stop.self.prevent="handleAction('cancel')"
  >
    <Card
      :class="[
        'fixed top-[27%] left-[50%] translate-x-[-50%] z-message lg:w-[35%] w-[80%] h-auto min-h-[30%] px-[2rem] py-[1rem]',
        type
      ]"
    >
      <template #header>
        <h3 class="font-bold text-[1.5rem] mb-[15px] border-b border-darkLight">{{ title }}</h3>
      </template>
      <template #body>
        <div>
          <div>
            <div @click="handleAction('cancel')" class="absolute top-[3%] right-[3%]">
              <font-awesome-icon :icon="['fas', 'xmark']" class="text-[1.5rem] cursor-pointer" />
            </div>
            <p class="text-[1.2rem]" ref="normalContent">
              {{ content }}
            </p>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="absolute bottom-0 w-[90%] p-[15px] flex justify-end border-t border-darkLight" v-if="hasBtn">
          <Button @click="handleAction('cancel')" class="w-[80px]" :bgColor="'button__secondary'" v-if="hasCancel"
            >取消</Button
          >
          <Button @click="handleAction('confirm')" class="w-[80px]">確認</Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';
import Button from '~~/components/Button';
import Card from '~~/components/card/index.vue';

const { useMessage } = useStore();
const msgStore = useMessage();
const { beforeClose } = msgStore;

const { title, content, hasBtn, type, contentVal, slot, hasCancel } = storeToRefs(msgStore);

const textSize = (len) => {
  return (len > 30 && (curLang.value !== 'ch' || curLang.value !== 'zhtw')) ||
    (len > 13 && (curLang.value === 'ch' || curLang.value === 'zhtw'))
    ? 'smallText'
    : 'bigText';
};

const handleAction = (action) => {
  if (action === 'confirm') {
    save();
  } else if (action === 'cancel') {
    close();
  }
  msgStore.$reset();
  // toggleModal(false)
};

const close = () => {
  beforeClose('cancel');
};

// const checkSound = ref(null);
const save = () => {
  beforeClose('confirm');
};
</script>
