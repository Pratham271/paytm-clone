"use client"
export const Select = ({ options, onSelect }:{
  options: {
    key: string,
    value: string
  }[],
  onSelect: (value:string) => void
}) => {
  return (
    <select onChange={(e)=> onSelect(e.target.value)} className="bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      {options.map((option)=> (
        <option key={option.key} value={option.value}>{option.value}</option>
      ))}
    </select>
  );
};
