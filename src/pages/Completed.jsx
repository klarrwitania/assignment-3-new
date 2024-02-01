import { Link } from "react-router-dom";
import useFetch from "../components/useFetch";

export default function Completed() {
    const {
        data: todos = [], isLoading, error,
    } = useFetch("http://localhost:7000/todos");
    let completedTodos = [];
    if (todos) {
        completedTodos = todos.filter((todo) => todo.status === 'completed')
    }
        
    return (
        <div className="m-4">

            <div className='flex flex-row justify-between m-2'>
                    <h2 className="font-semibold text-lg">Completed</h2>
                    <h2 className="font-semibold text-lg">Due</h2>
            </div>

            <div className="w-auto border border-gray-300 rounded-full my-4"></div>

            { completedTodos.length === 0 ? (
                <div>No completed todos</div>
            ) : (
                completedTodos.map((todo, idx) => (
                    <div className="text-sm font-semibold bg-gray-100 rounded-md py-2 px-3 mt-2 flex flex-row justify-between"
                    key={`${todo.id || 'defaultId'}-${todo.status || 'defaultStatus'}-${idx}`}
>
                        <div className='flex flex-row space-x-2'>
                            <input type="checkbox" checked readOnly />
                            <Link to={`/todos/${todo.id}`} className="flex flex-row">
                                <h2>{todo.title}</h2>
                            </Link>
                        </div>

                        <Link to={`/todos/${todo.id}`} className="flex flex-row">
                            <div className="flex flex-row space-x-4">
                                <p>{todo.priority}</p>
                                <p>{todo.duedate}</p>
                            </div>
                        </Link>
                    </div>
                ))
            )}

            <Link to="/" className="px-4 justify-end border border-gray-300 rounded-md py-2 px-3 inline-block mt-4 hover:bg-gray-100">Back to Todo List</Link> 
            {/* from display, while using the property display: inline-block will wrap the element to prevent the text inside from extending beyond its parent. */}

        </div>
        
    );
}