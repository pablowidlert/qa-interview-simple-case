import { faker } from '@faker-js/faker'
import { User } from '../src/types/User'

/**
 * Generates user data.
 * @returns {User} The generated user data.
 */
export function generateUserData(): User {
  return {
    email: faker.internet.email(),
    password: faker.string.alphanumeric(9),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }
}
