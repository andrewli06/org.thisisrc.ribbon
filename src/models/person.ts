import { ObjectId } from "mongodb";

export default class Person {
    constructor (
        public name: string, // name of person
        public email: string, // email, must match regex
        public position?: string, // optional: position
        public id?: ObjectId, // uuid of person - randomly generate
    ) {}
}