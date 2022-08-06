import axios from 'axios'
jest.mock('axios')

import { Client } from '../src/Client'
import { Charges } from '../src/resources/Charges'
import { Customers } from '../src/resources/Customers'
import { Schedules } from '../src/resources/Schedules'

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Client', () => {
  test('initializes resources', () => {
    const omise = new Client({ apiSecretKey: 'secret-key' })
    expect(omise.charges).toBeInstanceOf(Charges)
    expect(omise.customers).toBeInstanceOf(Customers)
    expect(omise.schedules).toBeInstanceOf(Schedules)
  })

  test('ensures a secret key is provided', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => new Client({})).toThrow(Error)
  })

  describe('request function', () => {
    const omise = new Client({
      apiSecretKey: 'secret-key',
      omiseAPIVersion: 'version-1',
    })

    beforeEach(() => {
      mockedAxios.get.mockClear()
      mockedAxios.get.mockResolvedValue({ data: {} })
    })

    test('makes a HTTP request', () => {
      omise.request({
        method: 'get',
        path: '/test',
      })
      expect(mockedAxios.request).toHaveBeenCalledTimes(1)
    })

    test('makes a request with the correct method', () => {
      omise.request({
        method: 'get',
        path: '/test',
      })
      expect(mockedAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'get',
        })
      )
      omise.request({
        method: 'post',
        path: '/test',
      })
      expect(mockedAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'post',
        })
      )
    })

    test('makes a request with the correct headers', () => {
      omise.request({
        method: 'get',
        path: '/test',
      })
      const authToken = Buffer.from('secret-key').toString('base64')
      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            'Omise-Version': 'version-1',
            Authorization: `Basic ${authToken}`,
          }),
        })
      )
    })
  })
})
