if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandling = require('./middleware/errorHandling.js')
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routing
app.use(routes)

// Error Handling
app.use(errorHandling)

app.listen(PORT, () => console.log('Server is running on port', PORT))