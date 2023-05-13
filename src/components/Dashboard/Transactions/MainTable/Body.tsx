import Row from "./Row";
import type { Transaction } from "@prisma/client";

const Body = (props: { data: Transaction[] | undefined }) => {
  return (
    <div className="overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <tbody className="w-full max-w-screen-sm divide-y divide-gray-200 dark:divide-gray-700">
          {props.data && !props.data.length && (
            <tr className="w-full max-w-screen-sm cursor-pointer bg-white hover:bg-gray-50">
              <td className="overflow-hidden whitespace-nowrap px-4 py-4 text-sm text-gray-800">
                <span className="text-center">
                  Loading...
                </span>
              </td>
            </tr>
          )}
          {props.data &&
            props.data.length &&
            props.data.map((transaction) => (
              <Row
                key={transaction.id}
                id={transaction.id}
                amount={transaction.amount}
                date={transaction.date}
                type={transaction.type}
                description={transaction.description}
                onDelete={() => {
                  console.log("Deleting...");
                }}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Body;