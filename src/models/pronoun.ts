export default class Pronoun { // This class exists but remains UNUSED
    constructor (
        public pronouns: string[]
    ) {}

    public returnPronouns = () => {
        return `${this.pronouns[0]}/${this.pronouns[1]}/${this.pronouns[2]}` || `${this.pronouns[0]}/${this.pronouns[1]}`
    }
}