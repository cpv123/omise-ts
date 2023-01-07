import { useState } from 'react'
import type { GetStaticProps } from 'next'
import OmiseClient, { Omise } from 'omise-ts'

type Props = {
  customers: Omise.Customers.ICustomerList['data']
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const omise = new OmiseClient({
    apiSecretKey: process.env.OMISE_SECRET_KEY as string,
  })
  const customersList = await omise.customers.list()
  return {
    props: {
      customers: customersList?.data || [],
    },
  }
}

export default function Home({ customers }: Props) {
  const [loadingCreateCharge, setLoadingCreateCharge] = useState(false)
  const [loadingDeleteSchedules, setLoadingDeleteSchedules] = useState(false)
  const [amount, setAmount] = useState<string>('')
  const [customerId, setCustomerId] = useState('')

  const handleCreateCharge = async () => {
    setLoadingCreateCharge(true)
    await fetch(`/api/${customerId}/create-charge`, {
      method: 'POST',
      body: JSON.stringify({
        amount: Number(amount),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setAmount('')
    setCustomerId('')
    setLoadingCreateCharge(false)
  }

  const handleDeleteCustomerSchedules = async (customerId: string) => {
    setLoadingDeleteSchedules(true)
    await fetch(`/api/${customerId}/delete-schedules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setLoadingDeleteSchedules(false)
  }

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-xl font-bold mb-6">Create a charge with Omise</h1>
      <div className="flex flex-col sm:flex-row mb-10">
        <input
          className="mb-6 sm:mb-0 mr-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Amount (THB)"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <button
          disabled={loadingCreateCharge || !amount || !customerId}
          onClick={handleCreateCharge}
          type="button"
          className="w-60 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Charge
        </button>
      </div>
      <table className="table-auto">
        <tbody>
          {customers?.slice(0, 3)?.map((customer) => (
            <tr key={customer.id}>
              <td>
                <input
                  type="checkbox"
                  value={customer.id}
                  checked={customer.id === customerId}
                  onChange={() => setCustomerId(customer.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                {customer.id}
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                {customer.email}
              </td>
              <td>
                <button
                  className=" cursor-pointer text-red-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleDeleteCustomerSchedules(customer.id)}
                  disabled={loadingDeleteSchedules}
                >
                  Delete Schedules
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
