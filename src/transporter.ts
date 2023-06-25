import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: "smtp-mail.outlook.com",
	service: "hotmail",
	secure: false, // upgrade later with STARTTLS
	auth: {
		user: "financePlanSite@outlook.com",
		pass: process.env.EMAIL_PASSW,
	},
});

export default transporter;
