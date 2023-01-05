const express = require('express')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const athleteRouter = require('./src/routes/athlete')

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path')

const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Cycling - Challenge',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:8000'
      }
    ]
  },
  apis: [`${path.join(__dirname, './src/routes/*.js')}`]
}

app.use('/', athleteRouter)
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

module.exports = app
