<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class App extends Vue {}
</script>

<style lang="scss">
  body {
    background-color: black;
    color: #dedede;
    text-align: center;
    font-family: sans-serif;
    min-width: 250px;
    padding: 0;
    margin: 0;
  }
  #app {
    padding: 0 5px;
  }
  .devtools {
    display: none;
  }
  .mb-2 {
    margin-bottom: 20px;
  }
  .mt-4 {
    margin-top: 40px;
  }
  h1, h2, h3, h4 {
    margin: 0;
  }
  h2 {
    font-size: 2em;
  }
  h3 {

  }
  h4 {
    font-weight: 100;
  }
  .blue {
    color: blue;
  }
  .purple {
    color: purple;
  }
  .red {
    color: red;
  }
  .teal {
    color: teal;
  }

  .container {
    width: 800px;
    margin: 60px auto;
  }
  .container-small {
    width: 600px;
    margin: 30px auto;
  }

  @media only screen and (max-width: 620px) {
    .container,
    .container-small {
      width: 100%;
    }
  }
</style>
