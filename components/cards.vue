<template>
  <div class="rounded-[8px] border-1 overflow-hidden h-full bg-white flex flex-col">
    <div :class="headerHeight" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div :class="bodyHeight" v-if="$slots.body">
      <slot name="body"></slot>
    </div>
    <div :class="footerHeight" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
    <slot name="detail" v-if="$slots.detail"></slot>
  </div>
</template>

<script setup lang="ts">
const myprops = defineProps({
  isHorizontalCard: { type: Boolean, default: false },
  headerHeight: { type: String, default: 'h-[45%]' },
  bodyHeight: { type: String, default: 'h-[55%]' },
  footerHeight: { type: String, default: 'h-[10%]' }
});
const { isHorizontalCard } = toRefs(myprops);
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

<!-- <style lang="scss" scoped>
  .card, .horizontalCard{
    @include card;
    display: flex;
    flex-wrap: wrap;
  }
  .card{
    height: 100%;
    flex-direction: column;
  }
  .card-detail{
    padding: 20px 15px;
    border-top: 1px solid #CED4DA;
    width: 100%;
  }
</style> -->
