const express = require('express')
const [UserDAL, SurveyDAL] = require('./dal/dal')
const dalService = express.Router()

dalService('/user')

