import { Item } from '../App';

interface Props {
  datas: Item[];
  removeItem: (id: number) => void;
  category: string;
}
const Table = ({ datas, removeItem, category }: Props) => {
  return (
    <table className='table w-full text-center border-2 border-slate-400 rounded-lg mt-2'>
      <thead className='table-header-group bg-slate-500 text-sm text-white'>
        <tr>
          <th className='py-1'>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {datas.map((item) =>
          category === item.ctg || category === 'All' ? (
            <tr key={item.id} className='border-b-2'>
              <td className='py-1'>{item.desc}</td>
              <td className='py-1'>${item.amt}</td>
              <td className='py-1'>{item.ctg}</td>
              <td className='py-1'>
                <button
                  onClick={() => removeItem(item.id)}
                  className='bg-red-500 text-white px-2 py-1 rounded-md'
                >
                  Delete
                </button>
              </td>
            </tr>
          ) : null
        )}
      </tbody>
      <tfoot>
        <tr>
          <td className='py-1'>Total:</td>
          <td className='py-1'>${datas.reduce((summ, i) => (category === i.ctg || category === 'All') ? summ + i.amt : summ + 0 , 0)}</td>
          <td colSpan={2}></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
