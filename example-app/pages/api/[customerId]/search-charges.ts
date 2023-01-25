import type { NextApiRequest, NextApiResponse } from 'next'
import OmiseClient from 'omise-ts'

type Data = {
  success: boolean
  message?: string
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { customerId } = req.query
  const Omise = new OmiseClient({
    apiSecretKey: process.env.OMISE_SECRET_KEY as string,
  })

  const searchCharges = await Omise.search.list({
    scope: 'charge',
    query: customerId as string,
    filters: {
      voided: false,
      reversed: false,
      refund_amount: 0,
    },
  })

  return res.status(200).json({
    success: true,
    data: searchCharges,
  })
}
