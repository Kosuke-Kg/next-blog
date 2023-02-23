import * as process from 'process'
import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  // @ts-ignore
  serviceDomain: process.env.SERVICE_DOMAIN,
  // @ts-ignore
  apiKey: process.env.API_KEY,
})
