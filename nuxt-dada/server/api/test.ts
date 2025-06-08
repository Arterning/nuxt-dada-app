import { defineEventHandler } from 'h3';
import { createUser } from '../../drizzle/user';

export default defineEventHandler(async (event) => {
  try {
    const newUser = {
      name: 'John Doe',
      age: 30,
      email: 'john@ok.com'
    }
    await createUser(newUser);
  } catch (error) {
    console.error('出错:', error);
    return {
      code: 500,
      message: '出错',
    };
  }

  return {
    code: 200,
    message: 'Hello from the test API!'
  }
});

    