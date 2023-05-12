import { useState } from "react";
import type { Transaction } from "@prisma/client";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

export default function Table(props: { data: Transaction[] | undefined }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
