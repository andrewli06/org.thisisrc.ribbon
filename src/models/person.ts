import { ObjectId } from "mongodb";

export default class Person {
    constructor (
        public name: string, // name of person
        public email: string, // email, must match regex
        public pronouns?: string, // pronouns - he/him/his, she/her/hers, they/them/theirs, other
        public position?: string, // optional: position
        public id?: ObjectId, // uuid of person - randomly generate
    ) {}
}