import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="px-4 py-2">
      <nav className="flex items-center justify-center gap-2 text-slate-500">
        <Button variant="ghost" size="sm">
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </Button>
        <Button variant="ghost" size="sm">
          <span className="text-sm">1</span>
        </Button>
        <Button variant="ghost" size="sm">
          <span className="text-sm">2</span>
        </Button>
        <Button variant="ghost" size="sm">
          <span className="text-sm">3</span>
        </Button>
        <Button variant="ghost" size="sm">
          <span className="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </Button>
      </nav>
    </div>
  );
};

export default Footer;
