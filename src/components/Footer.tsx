const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t">
      <div className="mx-auto min-h-[60px] w-full max-w-screen-md p-4 text-center sm:flex sm:items-center sm:justify-between sm:px-4 sm:py-0">
        <span className="text-sm text-gray-500">© 2023 - Financy</span>
        <Links />
      </div>
    </footer>
  );
};

const Links: React.FC = () => {
  return (
    <ul className="mt-3 flex justify-center gap-4 text-sm font-medium text-gray-500 sm:mt-0 sm:gap-6">
      <li>
        <a href="#" className="hover:underline">
          About
        </a>
      </li>
      <li>
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
      </li>
      <li>
        <a href="#" className="hover:underline">
          Contact
        </a>
      </li>
    </ul>
  );
};

export default Footer;
