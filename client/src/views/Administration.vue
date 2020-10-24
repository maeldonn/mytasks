<template>
  <section class="administration">
    <Title content="Admin" />
  </section>
</template>

<script>
import Title from '@/components/Title.vue';

export default {
  name: 'Administration',
  components: {
    Title,
  },
};
</script>

<style scoped>
.administration {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
