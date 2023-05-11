import { type NextPage } from "next";

const Footer: NextPage = () => {
  return (
    <footer className="w-full border-t">
      <div className="w-full max-w-screen-lg mx-auto md:flex md:items-center md:justify-between p-4 md:p-6 min-h-[70px]">
      <span className="text-sm text-gray-500 sm:text-center">
        © 2023{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          Financy™
        </a>
      </span>
      <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mt-0">
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">
            About
          </a>
        </li>
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>
      </div>
    </footer>
  );
};

export default Footer;
