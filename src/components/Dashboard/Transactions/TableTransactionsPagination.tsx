import { usePageStore } from "@/app/pageStore";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pagination = () => {
  const { count, page } = usePageStore();
  const pages = Math.ceil(count / 10);

  const setPage = usePageStore((state) => state.setPage);
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="flex w-full items-center justify-end gap-2 px-4 py-2">
      <Button size="sm" variant="ghost" disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      {Array.from(Array(pages).keys()).map((i) => (
        <Button key={i} size="sm" variant="ghost" disabled={i + 1 === page} onClick={() => handlePageChange(i + 1)}>
          {i + 1}
        </Button>
      ))}
      <Button size="sm" variant="ghost" disabled={page === pages} onClick={() => handlePageChange(page + 1)}>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
