// this file contains functions to send emails
import nodemailer from "nodemailer";
import Student from "./models/student";
import School from "./models/school";
import dotenv from "dotenv";

// global variables
dotenv.config();
const [username, password]: [string, string] = [process.env.EMAIL_USERNAME || "", process.env.EMAIL_PASSWORD || ""];

// email account
const transporter = nodemailer.createTransport({
    host: "smtp.mxhichina.com",
    port: 465,
    secure: true,
    auth: { user: username, pass: password },
});

// funcs
export const sendSchoolReceipt = async (data: School) => { // sends receipt of the form to user
    transporter.sendMail({
        from: `"Research Conference" <${process.env.EMAIL_USERNAME}>`, // sender address
        to: `"Research Conference" <${process.env.EMAIL_USERNAME}>`, // list of receivers
        cc: process.env.EMAIL_CC,
        subject: `New Form Submission from ${data.name}`, // Subject line
        html: `<b>New Form Submission. Below are the contents of the form:</b>
            <p>School Name: ${data.name}</p>
            <p>School Code: ${data.code}</p>
            <p>Contact: ${data.contact.name}, ${data.contact.position} (<a href="mailto:${data.contact.email}">${data.contact.email}</a>)</p>
        `, // html body
    }).then(() => {
        return 1;
    }).catch((error: Error) => {
        onError(error, new Date());
        return -1;
    });
}

export const sendSchoolCodeEmail = async (school: School) => { // sends school code to the provided email
    transporter.sendMail({
        from: `"Research Conference" <${process.env.EMAIL_USERNAME}>`, // sender address
        to: `${school.contact.name} <${school.contact.email}>`, // list of receivers
        cc: `"Research Conference" <${process.env.EMAIL_USERNAME}>`,
        subject: "THIS ISRC - Payment Received", // Subject line
        html: `<div style="font-family: sans-serif"><p>Dear ${school.contact.name},</p>

            <p>We have received your payment for the 2022 Tsinghua International School Research Conference. Your students can now register. Your school code for registration purposes is</p>
            <b style="font-size: 4rem, font-weight: 800">${school.code}</b>
            <p>Feel free to reach out if you have any questions!</p>

            <p>Sincerely,<br/>Tsinghua International School</p></div>
        `, // html body
    }).then(() => {
        return 1;
    }).catch((error: Error) => {
        onError(error, new Date(), school.contact.email);
        return -1;
    });
}

export const sendRegistrationEmail = async (student: Student) => { // sends registration confirmation to the student
    transporter.sendMail({
        from: `"Research Conference" <${process.env.EMAIL_USERNAME}>`, // sender address
        to: `${student.identity.name} <${student.identity.email}>`, // list of receivers
        cc: `"Research Conference" <${process.env.EMAIL_USERNAME}>`,
        subject: "THIS ISRC - Registration Confirmation", // Subject line
        html: `<p>Dear ${student.identity.name},</p>
            <p>We have received your submission for the 2022 Tsinghua International School Research Conference. If you have any questions or would like to make any changes, please respond to this email!</p>
            <p>Sincerely,<br/>Tsinghua International School</p>
        `, // html body
    }).then(() => {
        return 1;
    }).catch((error: Error) => {
        onError(error, new Date(), student.identity.email);
        return -1;
    });
}

export const sendStudentReceipt = async (student: Student) => {
  transporter.sendMail({
        from: `"Research Conference" <${process.env.EMAIL_USERNAME}>`, // sender address
        to: `"Research Conference" <${process.env.EMAIL_USERNAME}>`, // list of receivers
        cc: process.env.EMAIL_CC,
        subject: `New Form Submission`, // Subject line
        html: `<b>New Form Submission. Until the backend is formally fixed, please check the database manually.</p>
        `, // html body
    }).then(() => {
        return 1;
    }).catch((error: Error) => {
        onError(error, new Date());
        return -1;
    });
}

const onError = async (error: Error, timestamp: Date, targetEmail?: string) => {
    transporter.sendMail({
        from: `"Research Conference" <${process.env.EMAIL_USERNAME}>`, // sender address
        to: `Andrew Li <andrew_li22@this.edu.cn>`,
        subject: "THIS ISRC API Error", // Subject line
        html: `
            <b>${error}</b> occured at <b>${timestamp.toISOString}</b>. Original email was to be sent to ${targetEmail || "yourself"}.
        `, // html body
    }).then(() => {
        return 1;
    }).catch((e: Error) => {
        return -1;
    });
}

module.exports = {
    sendSchoolReceipt,
    sendSchoolCodeEmail,
    sendRegistrationEmail,
    sendStudentReceipt
}