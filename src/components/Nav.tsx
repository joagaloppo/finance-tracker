import { type NextPage } from "next";
import Link from "next/link";
import { SignIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

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
          <button
            type="button"
            className="mr-3 rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0"
          >
            Get started
          </button>
        </SignInButton>
      )}
      {props.user && <UserButton afterSignOutUrl="/" />}
    </>
  );
};

const Nav: NextPage = () => {
  const user = useUser();
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-screen-sm flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <Image
            about="App logo"
            src="/bank.png"
            className="mr-3 h-8"
            height={32}
            width={32}
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold">
            financy
          </span>
        </Link>
        <div className="flex md:order-2">
          {user.isLoaded && <Auth user={user.isSignedIn} />}
        </div>
        {user.isLoaded && !user.isSignedIn && (
          <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0">
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
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
