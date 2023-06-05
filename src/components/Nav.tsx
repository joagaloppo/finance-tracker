import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const Nav: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <nav className="w-full border-b">
      <div className="mx-auto flex min-h-[40px] max-w-screen-md flex-wrap items-center justify-between p-4">
        <Link href="/" passHref className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-black" />
          <h1 className="text-lg font-bold tracking-tight">Financy</h1>
        </Link>
        <Auth />
        {sessionData?.user && !sessionData?.user && (
          <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-sticky"
          ></div>
        )}
      </div>
    </nav>
  );
};

const Auth: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex items-center justify-center gap-4">
      {sessionData?.user?.image && <img src={sessionData?.user?.image} className="h-8 w-8 rounded-lg" alt="" />}

      <Button variant="outline" size="sm" onClick={sessionData ? () => void signOut() : () => void signIn()}>
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
};

export default Nav;
