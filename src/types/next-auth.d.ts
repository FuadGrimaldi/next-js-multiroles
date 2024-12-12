import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      telp: string;
      role: string;
      [key: string]: string;
    };
  }
}
