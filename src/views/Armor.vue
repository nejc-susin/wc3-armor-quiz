<template>
<div>
    <div class="devtools order">
        <div v-for="unit in units" :key="unit.id">
            {{unit.name}}
        </div>
    </div>

    <router-link :to="{name: 'Attack'}">Switch to Attack Practice</router-link>

    <div v-if="!gameover">
        <div class="question">
            <img :src="current.model" class="model-img">
            <h2 class="unit">{{current.name}}</h2>
            <h4 class="race" :class="raceColor[current.race]">{{current.race}}</h4>
        </div>
        <answers title="What is the Armor Type for this unit?" :answers="answers" @guess="guess"></answers>
    </div>
    <div v-else>
      <h2 class="mt-4">That's all of them!</h2>
      <a href="#" @click="$router.go()">Start over</a>
    </div>

    <div class="stats">
        You answered correctly for <b>{{correctCount}}</b> of <b>{{history.length}}</b> units - <b>{{correctPct}}%</b>!
    </div>

    <div class="history container-small">
        <table>
            <thead>
                <th>Unit</th>
                <th>Race</th>
                <th>Armor</th>
                <th>Your Guess</th>
            </thead>
            <tbody>
                <tr v-for="entry in history" :key="entry.unit.id">
                    <td>{{entry.unit.name}}</td>
                    <td>{{entry.unit.race}}</td>
                    <td>{{entry.unit.armor}}</td>
                    <td class="incorrect" :class="{'correct': entry.guess === entry.unit.armor}">{{entry.guess}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import Unit from '../models/Unit'
import definitions from "@/utils/definitions";
import Answers from "@/components/Answers";

export default {
    name: "Armor",
  components: {Answers},
  data() {
        return {
            gameover: false,
            current: undefined,
            units: [],
            history: [],
            raceColor: definitions.RACE_COLORS,
            answers: definitions.ARMOR_TYPES,
        }
    },
    mounted() {
      this.axios.get('data/units.csv')
      .then((response) => {
        const csvData = response.data.split('\n').slice(1);
        const allUnits = csvData.map((unit, idx) => new Unit(unit, idx+1));
        const filteredUnits = allUnits.filter(u => u.armor !== 'Invulnerable');
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
            return this.history.filter(e => e.unit.armor === e.guess).length
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
.container,
.container-small {
    width: 800px;
    margin: 60px auto;
}
.container-small {
    width: 600px;
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
.stats {
    margin: 60px 0;
}
.history .correct {
    color: green !important;
}
.history .incorrect {
    color: red;
}
</style>
