import { useState } from "react";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Table() {
  const [search, setSearch] = useState("");

  return (
    <Card>
      <CardHeader className="border-b px-3 py-2">
        <Header setSearch={setSearch} />
      </CardHeader>
      <CardContent className="p-0">
        <Body />
      </CardContent>
      <CardFooter className="border-t p-0">
        <Footer />
      </CardFooter>
    </Card>
  );
}
