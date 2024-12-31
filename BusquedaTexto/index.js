const express = require('express')
const { BooksRouter, UsersRouter } = require('./router')
const { errorHandler } = require('./middlewares')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/books", BooksRouter)
app.use("/users", UsersRouter)

/**
 * Error Handler
 */
app.use(errorHandler)


app.listen(PORT, console.log(`App running on port ${PORT}`))