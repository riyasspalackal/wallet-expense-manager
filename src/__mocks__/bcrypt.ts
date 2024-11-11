// src/__mocks__/bcrypt.ts

const bcrypt = {
  hash: jest
    .fn()
    .mockImplementation(async (password: string, saltRounds: number) => {
      return `hashed_${password}`;
    }),

  compare: jest
    .fn()
    .mockImplementation(async (password: string, hashedPassword: string) => {
      return hashedPassword === `hashed_${password}`;
    }),
};

export default bcrypt;
