import { useState } from "react";
import type { Transaction } from "@prisma/client";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

export default function Table(props: { data: Transaction[] | undefined }) {
  const [search, setSearch] = useState("");

  return (
    <div className="inline-block min-w-full overflow-x-auto align-middle">
      <div className="divide-y rounded-lg border">
        <Header setSearch={setSearch} />
        <Body data={props.data} />
        <Footer />
      </div>
    </div>
  );
}
