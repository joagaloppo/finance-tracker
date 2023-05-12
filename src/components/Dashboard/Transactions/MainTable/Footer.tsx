const Footer = () => {
  return (
    <div className="py- px-4">
      <nav className="flex items-center justify-center space-x-2">
        <a
          className="inline-flex items-center gap-2 rounded-md p-4 font-medium text-gray-400 hover:text-blue-600"
          href="#"
        >
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="inline-flex h-10 w-10 items-center rounded-full bg-blue-500 p-4 text-sm font-medium text-white"
          href="#"
          aria-current="page"
        >
          1
        </a>
        <a
          className="inline-flex h-10 w-10 items-center rounded-full p-4 text-sm font-medium text-gray-400 hover:text-blue-600"
          href="#"
        >
          2
        </a>
        <a
          className="inline-flex h-10 w-10 items-center rounded-full p-4 text-sm font-medium text-gray-400 hover:text-blue-600"
          href="#"
        >
          3
        </a>
        <a
          className="inline-flex items-center gap-2 rounded-md p-4 font-medium text-gray-400 hover:text-blue-600"
          href="#"
        >
          <span className="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </a>
      </nav>
    </div>
  );
};

export default Footer;