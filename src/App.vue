<template>
  <div id="app">
    <game></game>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Game from './components/Game.vue';

@Component({
  components: {Game},
})
export default class App extends Vue {}
</script>

<style lang="scss">
			body {
				background-color: black;
				color: #dedede;
				text-align: center;
				font-family: sans-serif;
			}
      .devtools {
        display: none;
      }
      .mb-2{
        margin-bottom: 20px;
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
      .teal {
        color: teal;
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
</style>
