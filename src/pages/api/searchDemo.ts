import faker from 'faker'

const makeSearchResults = (num: number): any => {
  let res = [];
  for (let i = 0; i < num; i++) {
    res[i] = {
      id: faker.datatype.number(),
      name: faker.name.title(),
      url: faker.internet.url(),
      desc: faker.lorem.paragraph(),
      keywords: faker.random.words(faker.datatype.number({ min: 1, max: 4 }))
    }
  }

  return res;
}

export default function handler(req: any, res: any) {
  const fakeResults = makeSearchResults(faker.datatype.number({ min: 1, max: 4 }));

  if (req.method === 'GET') {
    res.status(200).json(fakeResults)
  }
  else {
    console.log('not a GET');
  }
}

