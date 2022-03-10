import { ObjectId } from "mongodb";
import Person from "./person";
import Student from "./student"

export default class School {
    constructor (
        public name: string, // name of the school
        public contact: Person, // contact person
        public code: string, // school code
        public count: number, // amount of registrations under this school
	    public capacity: number, // defaults to 10. schools must email for more.
	    public students?: Array<Student>, // list of students registering under this school
        public id?: ObjectId
    ) {}
}