export const fetchUsers = async () =>
  fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
