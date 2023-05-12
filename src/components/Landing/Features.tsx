import { ArrowRight } from "lucide-react";

const data = [
  {
    icon: <ArrowRight />,
    title: "Marketing",
    description:
      "Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing goals every month with our marketing plan.",
  },
  {
    icon: <ArrowRight />,
    title: "Marketing",
    description:
      "Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing goals every month with our marketing plan.",
  },
  {
    icon: <ArrowRight />,
    title: "Marketing",
    description:
      "Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing goals every month with our marketing plan.",
  },
];

const Feature = (props: {
  icon?: any;
  title?: string;
  description?: string;
}) => {
  return (
    <div>
      <div className="bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
        <span className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full border-4 border-gray-100 bg-gray-200 text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200">
          {props.icon}
        </span>
      </div>
      <h3 className="mb-2 text-xl font-bold dark:text-white">{props.title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{props.description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <div className="mx-auto mb-8 max-w-screen-md lg:mb-16">
          <h2 className="mb-4 md:text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Designed for everyone
          </h2>
          <p className="md:text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            No matter what you do or how you do it, you can save time and money
            with our finance tracker. We help you organize your
            expenses and incomes.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          {data.length &&
            data.map((item, index) => <Feature key={index} {...item} />)}
        </div>
      </div>
    </section>
  );
};

export default Features;
