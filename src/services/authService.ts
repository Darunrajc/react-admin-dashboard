export const login = async (username: string, password: string) => {
  if (username && password) {
    return { token: 'fake-token' };
  }
  throw new Error('Invalid credentials');
};
