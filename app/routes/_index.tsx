import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { Link, Form, useLoaderData } from "@remix-run/react"
import { createdTodo, getTodo, updated } from "~/models/todo.server";
import { json, redirect } from '@remix-run/node';
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const action =async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const _action = formData.get('_action');
  if (_action === "create") {  
    const text = formData.get('todo');
    await createdTodo({ text });
  }

  if (_action === "complete") {
    const id       = formData.get('id');
    await updated(id, _action);
  }

  return redirect('/');
}

export const loader = async () => {
  return json({ todos : await getTodo() });
}

export default function AddTodo() {
  const { todos } = useLoaderData<typeof loader>();

  return (
    <div className="w-2/4 m-auto mt-20 ">
      <div className="text-center">
        <Form method="post">
          <input type="text" name="todo" className="w-1/2 rounded border border-gray-500 px-2 py-1 text-lg mr-2"/>
          <button type="submit" name="_action" value="create" className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300">Add Todo</button>
        </Form>
      </div>
      <ul>    
              <div className=" m-4 shadow-2xl p-3">
                <h1 className="text-center">Todo InComplete</h1>
                {todos.map((todo) => (
                    todo.status === "inComplete" ? 
                      <li key={todo.id}>
                          {todo.text}
                        <div className="">
                        <Form method="post" >
                            <input type="hidden" name="id" value={todo.id} />
                           
                            <p className="text-right">
                              <input type="submit" name="_action" value="complete" className="bg-blue-700 py-2 px-2 rounded" />
                            </p>
                    
                          </Form>
                        </div>
                      </li>
                    : ''
                ))}
              </div>
      </ul>

      <ul className="mt-12">
      <div className=" m-4 shadow-2xl p-3">
                <h1 className="text-center">Todo Complete</h1>
                {todos.map((todo) => (
                    todo.status === "complete" ? 
                      <li key={todo.id}>
                          {todo.text}
                         <p className="text-right">Done</p>
                      </li>
                    : ''
                ))}
              </div>
      </ul>
    </div>
  )
} 
