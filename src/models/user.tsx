export interface User {
  id?: number;
  username: string;
  password: string;
  email?: string;
  name?: string;
  role?: string; //admin or user
}

export const dummyUsers: User[] = [
  {
    id: 1,
    name: "User 1",
    username: "user1",
    password: "password1",
    email: "user1@example.com",
    role: "admin",
  },
  {
    id: 2,
    username: "user2",
    password: "password2",
    email: "user2@example.com",
    role: "user",
  },
];
