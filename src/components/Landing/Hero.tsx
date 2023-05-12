import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex w-full px-4 pb-20 pt-24">
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
            <Button variant="outline">
              Learn More
              <Mail className="ml-3 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <figure className="relative max-w-full rounded-b-lg shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)]">
            <div className="relative flex max-w-[50rem] items-center rounded-t-lg bg-gray-800 px-24 py-2 dark:bg-gray-700">
              <div className="absolute left-4 top-2/4 flex -translate-y-1 space-x-1">
                <span className="h-2 w-2 rounded-full bg-gray-600 dark:bg-gray-600"/>
                <span className="h-2 w-2 rounded-full bg-gray-600 dark:bg-gray-600"/>
                <span className="h-2 w-2 rounded-full bg-gray-600 dark:bg-gray-600"/>
              </div>
              <div className="flex h-full w-full items-center justify-center rounded-sm bg-gray-700 text-[.25rem] text-gray-400 dark:bg-gray-600 dark:text-gray-400 sm:text-[.5rem]">
                www.financy.com
              </div>
            </div>

            <div className="rounded-b-lg bg-gray-800">
              <Image
                src={"/hero.png"}
                alt="Hero Image"
                width={840}
                height={960}
                className="mx-auto h-auto w-[700px] max-w-full rounded-b-lg"
              />
              {/* <img className="max-w-full h-auto rounded-b-lg" src="../docs/assets/img/1618x1010/img1.jpg" alt="Image Description"> */}
            </div>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Hero;
