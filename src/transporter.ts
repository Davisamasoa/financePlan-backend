import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "financeplancodesender@gmail.com",
		pass: process.env.EMAIL_PASSW,
	},
});

export default transporter;

transporter.verify(function (error, success) {
	if (error) {
		console.log(error);
	} else {
		console.log("Server is ready to take our messages");
	}
});
