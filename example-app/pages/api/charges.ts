import type { NextApiRequest, NextApiResponse } from 'next'
import OmiseClient from '../../../build/src/index'

type Data = {
  success: boolean
  message?: string
  data?: {
    id: string
  }
}

interface RequestWithBody extends NextApiRequest {
  body: {
    amount: number
    customerId: string
  }
}

export default async function handler(
  req: RequestWithBody,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(500).send({
      success: false,
      message: 'Unsupported HTTP method, this API only accepts POST requests',
    })
  }

  const { amount, customerId } = req.body
  const amountToCharge = amount * 100

  const Omise = new OmiseClient({
    apiSecretKey: process.env.OMISE_SECRET_KEY as string,
  })

  const charge = await Omise.charges.create({
    amount: amountToCharge,
    customer: customerId,
    currency: 'THB',
  })

  return res.status(200).json({
    success: true,
    data: { id: charge.id },
  })
}
