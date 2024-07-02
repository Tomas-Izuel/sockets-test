import { getBots } from "@/services";
import { isErrorType } from "@/utils";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const bots = await getBots();
  if (isErrorType(bots)) {
    return null;
  }

  return (
    <main className="flex flex-col justify-start items-start p-36 gap-10 bg-gray-50 h-screen">
      <h1 className="text-3xl font-bold">Klari Test</h1>
      <section>
        {bots.map((bot) => (
          <Link key={bot.id} href={`/${bot.id}`}>
            <Button className=" bg-white p-20 rounded-3xl shadow-lg">
              {bot.name}
            </Button>
          </Link>
        ))}
      </section>
    </main>
  );
}
