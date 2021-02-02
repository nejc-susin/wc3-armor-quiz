export default class Unit {
    public id: number;
    public name: string;
    public race: string;
    public portrait: string;
    public model: string;
    public armor: string;
    public attack: string;

    constructor(line: string, id: number) {
        const raw = line.split(';')
        this.id = id
        this.name = raw[0]
        this.race = raw[24]
        this.portrait = raw[26]
        this.model = raw[25]
        this.armor = raw[6]
        this.attack = raw[13]
    }
}