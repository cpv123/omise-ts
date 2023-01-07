import type { NextApiRequest, NextApiResponse } from 'next'
import OmiseClient from 'omise-ts'

type Data = {
  success: boolean
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(500).send({
      success: false,
      message: 'Unsupported HTTP method, this API only accepts POST requests',
    })
  }
  const { customerId } = req.query
  const Omise = new OmiseClient({
    apiSecretKey: process.env.OMISE_SECRET_KEY as string,
  })
  await Omise.customers.destroySchedules(customerId as string)
  return res.status(200).json({
    success: true,
    message: `Delete all charge schedules for customer ${customerId}`,
  })
}
