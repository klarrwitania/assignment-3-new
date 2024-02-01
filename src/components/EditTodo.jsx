// export default function EditTodo({editTodo, todo}) {
//     const [value, setValue] = useState('')
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         editTodo(value, todo.id)
//         setValue('')
//     }

//     return (
//         <form className="mb-4 font-primary w-full" onSubmit={handleSubmit}>
//             <input type="text" className="border border-gray-200 rounded-md px-3.5 py-2" placeholder="Update Task" onChange={(e) => setValue(e.target.value)} value={value}/>
//             <button className="bg-gray-700 border-none p-2 text-white cursor-pointer rounded ml-2">Update Task</button>
//         </form>
//     )
// }