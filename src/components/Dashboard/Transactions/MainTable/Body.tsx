import Row from "./Row";
import type { Transaction } from "@prisma/client";

const Body = (props: { data: Transaction[] | undefined }) => {
  return (
    <div className="overflow-hidden">
      <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <div className="w-full divide-y divide-gray-200 dark:divide-gray-700">
          {!props.data && (
            <div className="w-full bg-white">
              <div className="overflow-hidden whitespace-nowrap px-4 py-14 text-center text-sm text-gray-800">
                <span className="text-center">Loading...</span>
              </div>
            </div>
          )}
          {props.data && !props.data.length && (
            <div className="w-full bg-white">
              <div className="overflow-hidden whitespace-nowrap px-4 py-14 text-center text-sm text-gray-800">
                <span className="block text-center">
                  No transactions found.
                </span>
              </div>
            </div>
          )}
          {props.data &&
            props.data.length > 0 &&
            props.data.map((transaction) => (
              <Row
                key={transaction.id}
                id={transaction.id}
                amount={transaction.amount}
                date={transaction.date}
                description={transaction.description}
                onDelete={() => {
                  console.log("Deleting...");
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
