import { useState } from 'react';
import Form from './components/Form';
import Table from './components/Table';
import Category from './components/Category';

export interface Item {
  id: number;
  desc: string;
  amt: number;
  ctg: 'Utilities' | 'Entertainment' | 'Groceries';
}

const App = () => {
  const [datas, setDatas] = useState<Item[]>([
    { id: 0, desc: 'PC1', amt: 1200, ctg: 'Entertainment' },
    { id: 1, desc: 'PC2', amt: 1300, ctg: 'Utilities' },
    { id: 2, desc: 'PC3', amt: 1400, ctg: 'Groceries' },
  ]);

  const [category , setCategory] = useState('All');

  const addItems = (data: Item) => {
    setDatas([...datas, data]);
    console.log(datas);
  };
  
  const removeItem = (id:number) => {
    setDatas(datas.filter((i) =>  i.id!==id))
  }

  return (
    <div className='max-xs:mx-0 max-sm:mx-5 max-lg:mx-20 lg:mx-50 my-5'>
      <h1 className='text-center text-4xl font-bold text-slate-600 mb-5'>
        Expense Tracker
      </h1>
      <Form addItems={addItems} index={datas[datas.length - 1]?.id | 0} />
      <Category setItems={(item:string) => setCategory(item)} />
      <Table category={category} datas={datas} removeItem={removeItem} />
    </div>
  );
};

export default App;
