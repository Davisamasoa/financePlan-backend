import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: "smtp-mail.outlook.com",
	port: 587,

	secure: false, // upgrade later with STARTTLS
	auth: {
		user: "financePlanSite@outlook.com",
		pass: process.env.EMAIL_PASSW,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

export default transporter;
