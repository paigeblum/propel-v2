import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials){
        const users = [
          { id: "u1", name: "Demo Donor", email: "donor@propel.org", password: "donor123", role: "donor" },
          { id: "u2", name: "Demo Student", email: "student@propel.org", password: "student123", role: "student", studentId: "s1" }
        ];
        const { email, password } = credentials || {};
        const u = users.find(x=>x.email===email && x.password===password);
        if(!u) return null;
        return { id: u.id, name: u.name, email: u.email, role: u.role, studentId: u.studentId || null };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }){
      if(user){
        token.role = user.role;
        token.studentId = user.studentId || null;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }){
      session.user.role = token.role;
      session.user.studentId = token.studentId || null;
      session.user.name = token.name || session.user.name;
      session.user.email = token.email || session.user.email;
      return session;
    }
  },
  pages: { signIn: "/signin" }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };