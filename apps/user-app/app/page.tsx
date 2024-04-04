import { PrismaClient } from "@repo/db/client";
const prisma = new PrismaClient() 

export default function Page(): JSX.Element {
  return (
    <div className="text-3xl flex justify-center text-neutral-500">
      Hi there
    </div>
  );
}
