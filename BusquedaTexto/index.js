const express = require('express')
const { BooksRouter, UsersRouter, PurchasesRouter, SessionsRouter } = require('./router')
const { errorHandler } = require('./middlewares')
const cookieParser = require('cookie-parser')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cookieParser())
app.use(express.json())

app.use("/books", BooksRouter)
app.use("/users", UsersRouter)
app.use("/purchases", PurchasesRouter)
app.use("/auth", SessionsRouter)

/**
 * Error Handler
 */
app.use(errorHandler)


app.listen(PORT, console.log(`App running on port ${PORT}`))