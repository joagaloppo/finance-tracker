import Search from "./TableTransactionsSearch";
import Body from "./TableTransactionsBody";
import Pagination from "./TableTransactionsPagination";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function Table() {
  return (
    <Card>
      <CardHeader className="border-b px-3 py-2">
        <Search />
      </CardHeader>
      <CardContent className="p-0">
        <Body />
      </CardContent>
      <CardFooter className="border-t p-0">
        <Pagination />
      </CardFooter>
    </Card>
  );
}
