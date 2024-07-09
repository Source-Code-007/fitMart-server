import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'

const server: Server = app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log(`😀 Database connected at port ${process.env.PORT}`)
  } catch (e: any) {
    console.log(`😡 Failed to connect with db - ${e.message}`)
  }
})

// stop server when async errors
process.on('unhandledRejection', () => {
  console.log('😡 UNHANDLED REJECTION! Shutting down...')
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
})

// stop server when sync errors
process.on('uncaughtException', () => {
  console.log('😡 UNCAUGHT EXCEPTION! Shutting down...')
  process.exit(1)
})
