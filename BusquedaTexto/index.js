const express = require('express')
const { BooksRouter, UsersRouter } = require('./router')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/books", BooksRouter)
app.use("/users", UsersRouter)

app.listen(PORT, console.log(`App running on port ${PORT}`))