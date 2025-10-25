import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';
import { Task, Priority } from '../types/task';
import { toggleComplete, deleteTask } from '../store/taskSlice';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: { tasks: { tasks: Task[] } }) => state.tasks.tasks);
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');

  const handleComplete = useCallback((id: string) => {
    dispatch(toggleComplete(id));
  }, [dispatch]);

  const handleDelete = useCallback((id: string) => {
    dispatch(deleteTask(id));
  }, [dispatch]);

  const filteredTasks = tasks.filter(task =>
    selectedPriority === 'all' ? true : task.priority === selectedPriority
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-2 mb-4">
        {(['all', 'high', 'medium', 'low'] as const).map((priority) => (
          <button
            key={priority}
            onClick={() => setSelectedPriority(priority)}
            className={`px-4 py-2 rounded-md ${
              selectedPriority === priority
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskList;