const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())

const member = require("./routers/member")
const users = require("./routers/users")
const paket = require("./routers/paket")
const transaksi = require("./routers/transaksi")
const { login } = require ("./routers/login")

app.use("/api/member", member)
app.use("/api/users", users)
app.use("/api/paket", paket)
app.use("/api/transaksi", transaksi)
app.use("/api/auth", login)

app.listen(8001,() => {
    console.log(`Server run on port 8001`);
})