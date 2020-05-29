const express = require('express')
const nodemailer = require('nodemailer')

const testEmailRoute = require('./routes/test-email')
const keys = require('./keys/index')

const app = express()

app.use('/api/calendar', testEmailRoute)
