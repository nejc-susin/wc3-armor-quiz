<template>
  <div class="question">
    <img :src="`./img/units/${unit.imgName}`" class="model-img">
    <h2 class="unit">{{unit.name}}</h2>
    <h4 class="race" :class="raceColor[unit.race]">{{unit.race}}</h4>
  </div>
</template>

<script>
import definitions from "@/utils/definitions";

export default {
  name: "Unit",
  props: ['unit'],
  data() {
    return{
      raceColor: definitions.RACE_COLORS,
    }
  }
}
</script>

<style scoped>

</style>