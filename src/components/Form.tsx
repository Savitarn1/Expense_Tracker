import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Item } from "../App";

const schema = z.object({
  desc:z.string({invalid_type_error:"Description is required"}).min(3,"Description need more 3 letters"),
  amt:z.number({invalid_type_error:"Amount is required"}).min(0.1,'Amount need be minimum 0.1'),
  ctg:z.enum(['Utilities' , 'Entertainment', 'Groceries'], {
    errorMap: () => ({ message: "Please select a valid category." })
  })
})

type FormData = z.infer<typeof schema>

interface Props {
  addItems : (item:Item) => void;
  index : number;
}

const Form = ({index, addItems}:Props) => {

  const {handleSubmit , reset , register , formState:{errors}} = useForm<FormData>({resolver:zodResolver(schema)});

  const submitHandler = (data:FormData) => {
    addItems({id:index+1, ...data})
    // reset()
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="mb-4">
        <label htmlFor="desc" className="block text-lg mb-1">Description</label>
        <input type="text" {...register("desc")} id="desc" className="border-2 px-2 w-full p-1 text-md rounded-lg border-slate-400 outline-none" />
        {errors.desc && <p className="text-red-500">{errors.desc.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="amt" className="block text-lg mb-1">Amount</label>
        <input type="number" step={"any"} {...register("amt",{valueAsNumber:true , setValueAs: v => Math.floor(v)})} id="amt" className="border-2 px-2 w-full p-1 text-md rounded-lg border-slate-400 outline-none" />
        {errors.amt && <p className="text-red-500">{errors.amt.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="ctg" className="block text-lg mb-1">Category</label>
        <select id="ctg" {...register("ctg")} className="border-2 px-2 w-full p-1 text-md rounded-lg border-slate-400 outline-none">
          <option defaultChecked></option>
          <option value={'Utilities'}>Utilities</option>
          <option value={'Entertainment'}>Entertainment</option>
          <option value={'Groceries'}>Groceries</option>
        </select>
        {errors.ctg && <p className="text-red-500">{errors.ctg.message}</p>}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-2 py-1 rounded-md text-lg">Submit </button>
    </form>
  )
}
export default Form;