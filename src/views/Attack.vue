<template>
<div>
    <div class="devtools order">
        <div v-for="unit in units" :key="unit.id">
            {{unit.name}}
        </div>
    </div>

    <router-link :to="{name: 'Armor'}">Switch to Armor Practice</router-link>

    <div v-if="!gameover">
        <div class="question">
            <img :src="current.model" class="model-img">
            <h2 class="unit">{{current.name}}</h2>
            <h4 class="race" :class="raceColor[current.race]">{{current.race}}</h4>
        </div>
        <answers title="What is the Attack Type for this unit?" :answers="answers" @guess="guess"></answers>
    </div>
    <div v-else>
      <h2 class="mt-4">That's all of them!</h2>
      <router-link :to="{name: 'Armor'}" @click="$router.go()">Start over</router-link>
    </div>

    <div class="stats container-small">
        You answered correctly for <b>{{correctCount}}</b> of <b>{{history.length}}</b> units - <b>{{correctPct}}%</b>!
    </div>

    <div class="history container-small">
        <table>
            <thead>
                <th>Unit</th>
                <th>Race</th>
                <th>Attack</th>
                <th>Your Guess</th>
            </thead>
            <tbody>
                <tr v-for="entry in history" :key="entry.unit.id">
                    <td>{{entry.unit.name}}</td>
                    <td>{{entry.unit.race}}</td>
                    <td>{{entry.unit.attack}}</td>
                    <td class="incorrect" :class="{'correct': entry.unit.attack.includes(entry.guess)}">{{entry.guess}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import Unit from '../models/Unit'
import Answers from "@/components/Answers";
import definitions from '../utils/definitions';

export default {
    name: "Attack",
    components: {Answers},

    data() {
          return {
              gameover: false,
              current: undefined,
              units: [],
              history: [],
              raceColor: definitions.RACE_COLORS,
              answers: definitions.ATTACK_TYPES,
          }
      },
      mounted() {
          this.axios.get('data/units.csv')
          .then((response) => {
            const csvData = response.data.split('\n').slice(1);
            const allUnits = csvData.map((unit, idx) => new Unit(unit, idx+1));
            const filteredUnits = allUnits.filter(u => !['None', 'N/A'].includes(u.attack));
            this.units = filteredUnits.sort(() => Math.random() - 0.5);
            this.next();
          })
      },
      methods: {
          next() {
              if (this.units.length) {
                  this.current = this.units.shift()
              } else {
                  this.gameover = true
              }
          },
          guess(type) {
              this.history.unshift({unit: this.current, guess: type})
              this.next()
          }
      },
      computed: {
          correctCount() {
              return this.history.filter(e => e.unit.attack.includes(e.guess)).length
          },
          correctPct() {
              return this.history.length > 0 ? Math.round(100*this.correctCount/this.history.length) : 0
          }
      }
}
</script>

<style lang="scss">
.model-img {
    width: 200px;
    height: 300px;
    object-fit: contain;
}
.question {
    margin-bottom: 60px;
}
table {
    width: 100%;
    text-align: left;
    border: solid white 1px;
    border-collapse: collapse;
}
table td,
table th {
    border: solid white 1px;

}
.history .correct {
    color: green !important;
}
.history .incorrect {
    color: red;
}
</style>
