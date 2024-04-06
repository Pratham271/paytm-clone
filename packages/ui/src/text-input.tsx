"use client"

import { ChangeEvent } from "react";

export const TextInput = ({ placeholder, onChange, label }: { placeholder: string, onChange: (e:ChangeEvent<HTMLInputElement>)=>void, label: string }) => {
  return (
    <div className="pt-2">
      <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <input 
      onChange={onChange} 
      type="text" 
      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  
      placeholder={placeholder}/>
    </div>
  );
};
