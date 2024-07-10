import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './app/routes'
import {
  globalErrHandler,
  notFoundErrHandler,
} from './app/middleware/errHandler'
dotenv.config()

const app = express()


// parser
app.use(cors({ origin: '*', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({extended:true}));

// Router
app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.status(200).send('Hello World')
})

// error handler
app.use(notFoundErrHandler)
app.use(globalErrHandler)

export default app
