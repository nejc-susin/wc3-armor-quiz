<template>
<div>
    <div class="devtools order">
        <div v-for="unit in units" :key="unit.id">
            {{unit.name}}
        </div>
    </div>

    <div class="question">
        <img :src="current.model" class="model-img">
        <h2 class="unit">{{current.name}}</h2>
        <h4 class="race" :class="raceColor[current.race]">{{current.race}}</h4>
    </div>

    <div class="answers">
        <h3 class="mb-2">What is the Armor Type for this unit?</h3>
        <div class="armorcard" @click="guess('Unarmored')"><img src="../assets/img/Infocard-neutral-armor-unarmored.png"><div>unarmored</div></div>
        <div class="armorcard" @click="guess('Light')"><img src="../assets/img/Infocard-neutral-armor-small.png"><div>light</div></div>
        <div class="armorcard" @click="guess('Medium')"><img src="../assets/img/Infocard-neutral-armor-medium.png"><div>medium</div></div>
        <div class="armorcard" @click="guess('Heavy')"><img src="../assets/img/Infocard-neutral-armor-large.png"><div>heavy</div></div>
        <div class="armorcard" @click="guess('Hero')"><img src="../assets/img/Infocard-armor-hero.png"><div>hero</div></div>
        <div class="armorcard" @click="guess('Fortified')"><img src="../assets/img/Infocard-neutral-armor-fortified.png"><div>fortified</div></div>
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

export default {
    name: "Game",
    data() {
        return {
            current: undefined,
            units: [],
            history: [],
            raceColor: {'Human': 'blue', 'Orc': 'red', 'Night Elf': 'teal', 'Undead': 'purple'}
        }
    },
    mounted() {
        this.axios.get('data/units.csv')
        .then((response) => {
            this.units = response.data.split('\n').slice(1).map((unit, idx) => new Unit(unit, idx+1)).sort(() => Math.random() - 0.5)
            this.next();
        })
    },
    methods: {
        next() {
            this.current = this.units.shift();
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
.armorcard {
    display: inline-block;
    margin: 0 20px;
    cursor: pointer;
}
.armorcard span {
    display: inline-block;
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
