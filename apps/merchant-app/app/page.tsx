"use client"
import { useBalance } from '@repo/store/balance';


export default function Page(): JSX.Element {
  const balance = useBalance();
  return (
   <div className='text-neutral-500 flex justify-center text-3xl'>
      {balance}
   </div>
  );
}
