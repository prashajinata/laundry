const express = require("express")
const app = express()

app.use(express.json())

const models = require("../models/index")

const member = models.member

const {auth} = require("./login")

app.use(auth)

app.get("/", async (request, response) => {
    let dataMember = await member.findAll()
    return response.json(dataMember)
})

app.post("/", (request, response) => {
    let newMember = {
        nama: request.body.nama,
        alamat: request.body.alamat,
        jenis_kelamin: request.body.jenis_kelamin,
        telpon: request.body.telpon
    }

    member.create(newMember)
        .then(result => {
            response.json({
                message: "Data Berhasil Dibuat"
            })
        })
        .catch(error => {
            response.json({
                message: error.message
            })
        })
})

app.put("/:id_member", (request, response) => {
    let data = {
        nama: request.body.nama,
        alamat: request.body.alamat,
        telpon: request.body.telpon,
        jenis_kelamin: request.body.jenis_kelamin
    }

    let parameter = {
        id_member: request.params.id_member
    }

    member.update(data, { where: parameter })
        .then(result => {
            return response.json({
                message: "data sukses diubah",
                data: data
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
})

app.delete("/:id_member", (request, response) => {
    let parameter = {
        id_member: request.params.id_member
    }

    member.destroy({ where: parameter })
        .then(result => {
            return response.json({
                message: "Data sukses dihapus"
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
})

module.exports = app