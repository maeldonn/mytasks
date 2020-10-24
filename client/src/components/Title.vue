<template>
  <div>
    <h3>{{ content }}</h3>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    content: { type: String, required: true },
  },
};
</script>

<style scoped>
div {
  width: 50%;
  padding: 15px 0;
  text-align: center;
  background-color: #293156;
  margin: 2rem;
  border: #dea90f 3px solid;
}

h3 {
  color: #ffffff;
  letter-spacing: 2px;
  font-size: 1.3em;
}
</style>
