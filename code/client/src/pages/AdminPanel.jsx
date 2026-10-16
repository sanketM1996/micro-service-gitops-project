import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Shield, Trash2, CheckCircle, Clock, User } from 'lucide-react';

export const AdminPanel = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllTodos = async () => {
    try {
      const response = await api.get('/api/todos');
      setTodos(response.data.data);
    } catch (error) {
      console.error('Error fetching all todos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Admin override: Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`/api/todos/${id}`);
      fetchAllTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="h-8 w-8 text-amber-400" />
          <h1 className="text-3xl font-bold">Admin & Manager Control Center</h1>
        </div>
        <p className="text-gray-400 mb-8">Viewing all tasks across all users in the system.</p>

        {loading ? (
          <p className="text-gray-400">Loading system todos...</p>
        ) : todos.length === 0 ? (
          <p className="text-gray-500 bg-gray-900 border border-gray-800 p-6 rounded-xl text-center">No system tasks found.</p>
        ) : (
          <div className="space-y-4">
            {todos.map((todo) => (
              <div key={todo.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex justify-between items-center shadow-md">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="font-semibold text-lg">{todo.title}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center space-x-1 ${
                      todo.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                      todo.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    }`}>
                      {todo.status === 'Completed' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                      {todo.status}
                    </span>
                    <span className="text-xs bg-gray-800 border border-gray-700 text-gray-300 px-2 py-0.5 rounded flex items-center space-x-1">
                      <User className="h-3 w-3 mr-1 text-indigo-400" />
                      User ID: {todo.user_id}
                    </span>
                  </div>
                  {todo.description && <p className="text-gray-400 text-sm">{todo.description}</p>}
                </div>

                <button onClick={() => handleDelete(todo.id)} className="p-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition border border-red-500/30">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};