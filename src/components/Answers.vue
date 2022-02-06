<template>
  <div class="answers">
    <h3 class="mb-2">{{ title }}</h3>
    <div v-for="a in answers" :key="a.value" class="answercard" @click="$emit('guess', a.value)">
      <img :src="'img/' + a.icon">
      <div>{{ a.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
name: "Answers",
  props: {
    title: {
      type: String,
      default: 'Choose your answer:',
    },
    answers: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>

.answercard {
  min-width: 80px;
  display: inline-block;
  margin: 5px 0;
  cursor: pointer;
}
.answercard span {
  display: inline;
  position: absolute;
}
@media only screen and (max-width: 620px) {
  .answercard {
    margin: 5px 0;
  }
}
</style>