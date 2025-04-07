import { useRef } from 'react';

const Category = ({setItems}:{setItems:(item:string) => void;}) => {
  const categoryRef = useRef<HTMLSelectElement>(null);

  const onSelect = () => {
    console.log(categoryRef.current?.value);
    setItems(String(categoryRef.current?.value));
  };

  return (
      <select
        className='my-3 border-2 px-2 w-full p-1 text-md rounded-lg border-slate-400 outline-none'
        onChange={onSelect}
        ref={categoryRef}
      >
        <option value='All'>All</option>
        <option value='Utilities'>Utilities</option>
        <option value='Entertainment'>Entertainment</option>
        <option value='Groceries'>Groceries</option>
      </select>
  );
};

export default Category;
