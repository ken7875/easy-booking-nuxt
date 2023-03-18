<template>
  <div>
    <ul>
      <li>{{ a }}</li>
      <!-- <li v-for="(review, i) in product.reviews" :key="i" class="border-bottom border-dark-light pb-2 mb-2">
        <div class="userInfo mb-2">
          <span>{{ review.user.name }}</span>
        </div>
        <span class="badge bg-success p-2">{{ review.rating }}</span>
        <span class="d-inline-block ms-2 mb-4">還不錯!</span>
        <p>{{ review.review }}</p>
        <p class="text-end">{{ review.createAt }}</p>
      </li> -->
    </ul>
  </div>
</template>

<script setup lang="ts">
const a = 'asdasdasdasd';
</script>
