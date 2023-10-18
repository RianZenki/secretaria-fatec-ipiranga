
import { createTransport } from "nodemailer";
import { resolve } from "path";
import hbs from "nodemailer-express-handlebars";
import dotenv from 'dotenv'

import { host, port, user, pass } from "../config/smtp.js";

dotenv.config();
const transport = createTransport({
	host,
	port,
	secure: false,
	auth: {
		user,
		pass,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

transport.use(
	"compile",
	hbs({
		viewEngine: {
			defaultLayout: undefined,
			partialsDir: resolve("src/resources/mail"),
		},
		viewPath: resolve("src/resources/mail"),
		extName: ".html",
	})
);

export default transport;
