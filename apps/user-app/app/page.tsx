import { PrismaClient } from "@repo/db/client";
import Balance from "../components/balance";
const prisma = new PrismaClient() 

export default function Page(): JSX.Element {
  return (
    <div className="text-3xl flex justify-center text-neutral-500">
      <Balance/>
    </div>
  );
}
