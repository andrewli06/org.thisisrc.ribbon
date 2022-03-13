import { ObjectId } from "mongodb";
import Person from "./person";

export default class Student {
    constructor (
        public type: string, // type of project
        public title: string, // title of project
        public description: string, // abstract
        public discipline: string[], // which discipline - array of length 1 or 2
        public identity: Person, // student info
        public school: string, // school info
        public id?: ObjectId
    ) {}
}