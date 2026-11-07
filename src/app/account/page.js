import AuthForm from "../components/auth/AuthForm";


export const metadata = { title: "Sign in | Scriptorium" };

export default async function AccountPage({ searchParams }) {
  const { redirect } = await searchParams;

  return (
    <main className="flex min-h-dvh items-center justify-center bg-bg px-4 pb-12 pt-28 sm:px-6 sm:pt-32">
      <AuthForm redirectTo={redirect || "/"} />
    </main>
  );
}