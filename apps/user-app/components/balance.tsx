"use client"
import React from 'react'
// @ts-ignore
import { useBalance } from '@repo/store/balance';

const Balance = () => {
  const balance = useBalance();
  return (
    <div>
        hi there {balance}
    </div>
  )
}

export default Balance
