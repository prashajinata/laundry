const express = require("express");
const app = express();
const { auth } = require("./login");

app.use(express.json());
app.use(auth);

const models = require("../models/index");

const paket = models.paket;

app.get("/", async (request, response) => {
  let dataPaket = await paket.findAll();
  return response.json(dataPaket);
});

app.post("/", (request, response) => {
  let newPaket = {
    jenis_paket: request.body.jenis_paket,
    harga: request.body.harga,
  };

  paket
    .create(newPaket)
    .then((result) => {
      response.json({
        message: "Data Berhasil Dibuat",
        data: result,
      });
    })
    .catch((error) => {
      response.json({
        message: error.message,
      });
    });
});

app.put("/:id_paket", (request, response) => {
  let data = {
    jenis_paket: request.body.jenis_paket,
    harga: request.body.harga,
  };

  let parameter = {
    id_paket: request.params.id_paket,
  };

  paket
    .update(data, { where: parameter })
    .then((result) => {
      return response.json({
        message: "data sukses diubah",
        data: data,
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
});

app.delete("/:id_paket", (request, response) => {
  let parameter = {
    id_paket: request.params.id_paket,
  };

  paket
    .destroy({ where: parameter })
    .then((result) => {
      return response.json({
        message: "Data sukses dihapus",
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
});

module.exports = app;
