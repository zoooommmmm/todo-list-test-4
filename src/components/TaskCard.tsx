import React from 'react';
import { motion } from 'framer-motion';
import { Task, Priority } from '../types/task';

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityColors: Record<Priority, string> = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#22C55E'
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onComplete(task.id)}
            className="w-5 h-5 rounded border-gray-300"
          />
          <div>
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: priorityColors[task.priority] }}
              />
              <span className="text-sm text-gray-500">
                {new Date(task.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default React.memo(TaskCard);