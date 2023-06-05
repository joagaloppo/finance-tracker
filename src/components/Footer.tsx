import { type NextPage } from "next";

const Footer: NextPage = () => {
  return (
    <footer className="w-full border-t">
      <div className="mx-auto min-h-[50px] w-full max-w-screen-lg p-4 text-center sm:flex sm:items-center sm:justify-between sm:p-6">
        <span className="text-sm text-gray-500">
          © 2023 -{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Financy
          </a>
        </span>
        <ul className="mt-3 flex justify-center text-sm font-medium text-gray-500 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline sm:mr-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline sm:mr-6">
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
