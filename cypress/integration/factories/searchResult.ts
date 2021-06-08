import faker from 'faker'
import { SearchResults } from '../../../src/App'

export const makeSearchResults = (): SearchResults => {
  return {
    id: faker.datatype.number(),
    name: faker.random.words(),
    url: faker.internet.url(),
    desc: faker.lorem.paragraph()    
  }
}