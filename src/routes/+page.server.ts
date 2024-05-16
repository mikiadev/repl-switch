import type { PageServerLoad } from './$types'
import { superValidate } from 'sveltekit-superforms/server'

export const load: PageServerLoad = async () => {
  // const form = await superValidate(schema)
  return { res: { opts: [ 'a', 'c' ]} }
}
