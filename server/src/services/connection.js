import { createPool } from "mysql";

const db = createPool({
	host: "localhost",
	user: "root",
	password: "admin",
	database: "Req",
});

export default db;
