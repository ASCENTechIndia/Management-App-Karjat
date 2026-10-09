require("dotenv").config();
const oracledb = require("oracledb");



const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SERVICE_NAME}`,
  poolAlias: "default",
  poolMin: 1,
  poolMax: 5,
  poolIncrement: 1
};
console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  service: process.env.DB_SERVICE_NAME,
  connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SERVICE_NAME}`
});
async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
    console.log("Oracle DB Connection Pool Initialized");
  } catch (err) {
    console.error("Oracle DB Connection Error:", err);
    process.exit(1);
  }
}

async function getConnection() {
   console.log("Getting Oracle connection from pool...");
  const conn = await oracledb.getConnection("default");
  console.log("Oracle connection acquired");
return conn; // <-- Now it references the pool alias
}

module.exports = {
  initialize,
  getConnection,
};
