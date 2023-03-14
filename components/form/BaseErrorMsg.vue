<template>
  <p v-if="error" class="error">{{ error }}</p>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.75rem;
  font-weight: 600;
}
</style>
