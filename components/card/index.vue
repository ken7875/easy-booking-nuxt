<template>
  <div class="rounded-[8px] border-1 overflow-hidden h-full bg-white">
    <div :class="['flex h-full w-full', { 'flex-col': !isHorizontal }]">
      <template v-if="$slots.header">
        <slot name="header"></slot>
      </template>
      <template v-if="$slots.body">
        <slot name="body"></slot>
      </template>
      <template v-if="$slots.footer">
        <slot name="footer"></slot>
      </template>
    </div>
    <template v-if="$slots.detail">
      <h3>{{ detailType.title }}</h3>
      <slot name="detail"></slot>
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  detailType?: {
    title: string;
  };
  isHorizontal?: boolean;
}

withDefaults(defineProps<Props>(), {
  detailType: () => ({
    title: ''
  }),
  isHorizontal: false
});

// watch(
//   detailType,
//   (val) => {
//     console.log(val, 'asdasdasdas');
//   },
//   { deep: true }
// );
// const myprops = defineProps({
//   isHorizontalCard: { type: Boolean, default: false },
//   headerHeight: { type: String, default: 'h-[45%]' },
//   bodyHeight: { type: String, default: 'h-[55%]' },
//   footerHeight: { type: String, default: 'h-[10%]' }
// });
// const card = props.isHorizontalCard ? 'horizontalCard' : 'card'

// export default {
//   setup (props, { slots }) {
//     const card = props.isHorizontalCard ? 'horizontalCard' : 'card'
//     const render = () => {
//       return <div class={ card }>
//         <div class='card-header'>
//           { slots.header ? slots.header() : '' }
//         </div>
//         <div class='card-body'>
//           { slots.content ? slots.content() : '' }
//         </div>
//         <div class={ slots.footer ? 'card-footer' : 'none' }>
//           { slots.footer ? slots.footer() : '' }
//         </div>
//         <div class={ slots.detail ? 'card-detail' : 'none' }>
//           { slots.detail ? slots.detail() : '' }
//         </div>
//       </div>
//     }
//     return render
//   }
// }
</script>
