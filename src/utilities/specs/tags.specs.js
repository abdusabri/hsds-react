import { createSpec, faker } from '@helpscout/helix'

export default createSpec({
  color: faker.random.arrayElement([
    'blue',
    'green',
    'grey',
    'orange',
    'purple',
    'red',
  ]),
  id: faker.random.uuid(),
  filled: faker.random.boolean(),
  value: faker.lorem.sentence(),
  children: faker.lorem.word(),
})
