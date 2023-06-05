import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex w-full px-4 pb-28 pt-28">
      <div className="mx-auto flex w-full flex-col items-center gap-20">
        <div>
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-slate-800">
            Your finances, in one place
          </h1>
          <p className="mt-4 text-center text-xl tracking-tight text-slate-600">
            Financy is a simple, easy-to-use app to track your finances.
          </p>

          <div className="mt-8 flex w-full justify-center gap-4">
            <Link href="/dashboard">
              <Button>
                Get Started <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
