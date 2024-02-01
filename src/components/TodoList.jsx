import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function TodoList({todos}) {
    const history = useHistory();
    const handleChange = (todoId) => {
      const todo = todos.find((todo) => todo.id === todoId);
      const status = todo.status;
      if (status === 'completed') {
        todo.status = 'pending';
      } else {
        todo.status = 'completed';
      }

      fetch(`http://localhost:7000/todos/{todo.id}`, {
      method: 'PUT', //use PUT to update or create a resource on the server
      headers: {
          'Content-Type': 'application/json', //The request includes a header specifying that the content type of the request body is JSON.
      },
      body: JSON.stringify(todo),
      }).then((response) => {
          if (!response.ok) {
          throw new Error('Failed to update todo');
          }
          return response.json(); //checks if the response status is okay (status code 200-299). If not, it throws an error. If the response is okay, it proceeds to parse the JSON response using response.json().
      }).then((updatedTodo) => {
          history.push('/completed') ;
      }).catch((error) => {
          console.error(error.message);
      })
    }

    return (
        <div>
            <div className='m-4'>
                <div className='flex flex-row justify-between m-2'>
                    <h2 className="font-semibold text-lg">Title</h2>
                    <h2 className="font-semibold text-lg">Due</h2>
                </div>

                <div className="w-auto border border-gray-300 rounded-full my-4"></div>

                {todos.map((todo) => (
                    <div className='text-sm font-semibold bg-gray-100 rounded-md py-2 px-3 mt-2 flex flex-row justify-between' key={`${todo.id}-${todo.status}`}>
                        <div className='flex flex-row space-x-2'>
                            <input 
                                type="checkbox"
                                checked={todo.status === 'completed'}
                                onChange={() => handleChange(todo.id)}
                                />
                            <Link to={`/todos/${todo.id}`} className="flex flex-row">
                                <h2>{ todo.title }</h2>
                            </Link>
                        </div>

                        <Link to={`/todos/${todo.id}`} className="flex flex-row">
                            <div className='flex flex-row space-x-4'>
                                <p>{ todo.priority }</p>
                                <p>{ todo.duedate }</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}