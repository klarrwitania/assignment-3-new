import TodoList from "../components/TodoList";
import useFetch from "../components/useFetch";

export default function Home() {
    const { data: todos, isLoading, error } = useFetch('http://localhost:7000/todos'); //This line uses destructuring assignment to extract properties from the object returned by the useFetch hook.

    //data: todos renames the data property to todos for clarity.

    return (
        <div>
            { error && <div>{ error }</div>}
            { isLoading && <div>Loading...</div>}
            {todos && <TodoList todos={todos}/>}  
        </div>
    )
}