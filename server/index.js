import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import {keys} from "./keys.js";
import pkg from "pg";

const app = express();
const middleware = cors();
app.use(middleware);
app.use(bodyParser.json());

// Postgres client setup
const { Pool } = pkg;
const pgClient = new Pool({
	user: keys.pgUser,
	host: keys.pgHost,
	database: keys.pgDatabase,
	password: keys.pgPassword,
	port: keys.pgPort
});

pgClient.on("connect", client => {
	client
		.query("CREATE TABLE IF NOT EXISTS values (number INT)")
		.catch(err =>console.log("PG ERROR", err));
});

// Express route definitions
app.get("/", (req, res)=>{
	res.send("Hi");
});

// GET all
app.get("/values/all", async(req, res) => {
	const values = await pgClient.query("SELECT * FROM values");
	res.send(values);
});

// POST
app.post("/values", async(req, res) => {
	if(!req.body.value) res.send({working: false});
	pgClient.query("INSERT INTO values(number) VALUES($1)", [req.body.value]);
	res.send({working: true});
});

app.listen(3001, () => {
	console.log("Listening");
});