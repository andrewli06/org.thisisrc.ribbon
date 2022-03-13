export default class Pronoun {
    constructor (
        public pronouns: Array<string>
    ) {}

    public returnPronouns = () => {
        return `${this.pronouns[0]}/${this.pronouns[1]}/${this.pronouns[2]}` || `${this.pronouns[0]}/${this.pronouns[1]}`
    }
}