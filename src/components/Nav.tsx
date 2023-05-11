import { type NextPage } from "next";
import Link from "next/link";
import { SignIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Auth = (props: { user: boolean }) => {
  return (
    <>
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
      {!props.user && (
        <SignInButton
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
          mode="modal"
        >
          <Button size="sm">Sign In</Button>
        </SignInButton>
      )}
      {props.user && <UserButton showName={true} afterSignOutUrl="/" />}
    </>
  );
};

const Nav: NextPage = () => {
  const user = useUser();
  return (
    <nav className="w-full border-b">
      <div className="mx-auto flex max-w-screen-lg flex-wrap items-center justify-between p-4 min-h-[70px]">
        <Link href="/" className="flex items-center">
          <svg
            aria-label="Vercel Logo"
            fill="var(--geist-foreground)"
            viewBox="0 0 75 65"
            height="26"
            data-testid="dashboard/logo"
          >
            <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
          </svg>
        </Link>
        <div className="flex md:order-2">
          {user.isLoaded && <Auth user={user.isSignedIn} />}
        </div>
        {user.isLoaded && !user.isSignedIn && (
          <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-sticky"
          >
            {/* <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0">
              <li>
                <a
                  href="#"
                  className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  Contact
                </a>
              </li>
            </ul> */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
