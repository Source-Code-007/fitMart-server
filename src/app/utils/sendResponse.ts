import { Response } from 'express'

interface ResponseFormat {
  success: boolean
  message: string
  data: any
  meta?: {
    page: number
    limit: number
    total: number
  }
}

const sendResponse = (
  res: Response,
  statusCode: number,
  format: ResponseFormat,
) => {
  res.status(statusCode).send({
    success: format?.success,
    message: format?.message,
    data: format?.data || null,
    meta: format?.meta || null,
  })
}

export default sendResponse
