import express, { Request, Response } from "express";
import Student from "../models/student"
import School from "../models/school"
import Person from "../models/person"

const router = express.Router();
const dbo = require("../db/conn");

const genCode = () => {
    let numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L"];
    let letters = ["7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    return `${letters[Math.floor(Math.random()*27)]}${letters[Math.floor(Math.random()*27)]}${letters[Math.floor(Math.random()*27)]}-${numbers[Math.floor(Math.random()*18)]}${numbers[Math.floor(Math.random()*18)]}${numbers[Math.floor(Math.random()*18)]}`;
}

router.route("/api/test").get(function (req: Request, res: Response) {
  res.json({api: true});
});

//schools
router.route("/schools/add").post(function (req: Request, res: Response) {
    let db_connect = dbo.getDb();
    let code = genCode();

    let contact: Person = {
        name: req.body.contact_name,
        email: req.body.contact_email,
        position: req.body.contact_position
    }

    let school: School = {
        name: req.body.name,
        contact: contact,
        code: code,
        count: 0,
        capacity: 10,
        students: []
    }

    db_connect.collection("schools").insertOne(school, function (err: Error, resp: Response) {
        if (err) throw err;
        res.json({response: resp, code: code});
    });
});

router.route("/schools/:code").get(function (req: Request, res: Response) {
    let db_connect = dbo.getDb();
    let query = { code: req.params.code };
    db_connect
    .collection("schools")
    .findOne(query, function (err: Error, result: Response) {
        if (err) throw err;
        res.json(result)
    });
});

//students
const getSchool = async (code: string) => {
    let db_connect = dbo.getDb();

    let query = { code: code };
    db_connect
    .collection("schools")
    .findOne(query, function (err: Error, result: Response) {
        if (err) throw err;
        return result;
    });
}

router.route("/students/add").post(async function (req: Request, res: Response) {
    let db_connect = dbo.getDb();

    let id: Person = {
        name: req.body.contact_name,
        email: req.body.contact_email,
        position: req.body.contact_position
    }

    let student: Student = {
        type: req.body.project_type,
        title: req.body.project_title,
        description: req.body.project_description,
        discipline: req.body.project_discipline,
        identity: id,
        school: req.body.school
    }

    db_connect.collection("schools").insertOne(student, function (err: Error, resp: Response) {
        if (err) throw err;
        res.json({response: resp});
    });
});

router.route("/students/:id").get(function (req: Request, res: Response) {
    let db_connect = dbo.getDb();
    let query = { code: req.params.code };
    db_connect
        .collection("students")
        .findOne(query, function (err: Error, result: Response) {
            if (err) throw err;
            res.json(result);
    });
});

module.exports = router;