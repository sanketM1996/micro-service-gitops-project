import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Trash2, Edit2, CheckCircle, Clock } from 'lucide-react';
import { TodoModal } from '../components/TodoModal';

export const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await api.get('/api/todos');
      setTodos(response.data.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleOpenCreateModal = () => {
    setCurrentTodo(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (todo) => {
    setCurrentTodo(todo);
    setIsModalOpen(true);
  };

  const handleSaveTodo = async ({ title, description, status }) => {
    try {
      if (currentTodo) {
        // Edit existing todo
        await api.put(`/api/todos/${currentTodo.id}`, { title, description, status });
      } else {
        // Create new todo
        await api.post('/api/todos', { title, description, status });
      }
      fetchTodos();
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`/api/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header & Create Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Task Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your microservices tasks securely</p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium transition shadow-lg shadow-indigo-600/30">
            <Plus className="h-5 w-5" />
            <span>Add New Task</span>
          </button>
        </div>

        {/* Todo List Section */}
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
        {loading ? (
          <p className="text-gray-400">Loading tasks...</p>
        ) : todos.length === 0 ? (
          <div className="text-center bg-gray-900 border border-gray-800 p-12 rounded-2xl">
            <p className="text-gray-400 mb-2">No tasks found.</p>
            <button
              onClick={handleOpenCreateModal}
              className="text-indigo-400 hover:underline font-medium text-sm">
              Create your first task
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {todos.main || todos.map ? todos.map((todo) => (
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
                  </div>
                  {todo.description && <p className="text-gray-400 text-sm">{todo.description}</p>}
                  <span className="text-xs text-gray-500 mt-2 block">Created: {new Date(todo.created_at).toLocaleString()}</span>
                </div>

                <div className="flex space-x-2">
                  <button onClick={() => handleOpenEditModal(todo)} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(todo.id)} className="p-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition border border-red-500/30">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )) : null}
          </div>
        )}

        {/* Modal Component */}
        <TodoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSaveTodo}
          initialData={currentTodo}
        />
      </div>
    </div>
  );
};