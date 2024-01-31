import { Task } from '../entities/task';

const TASKS: Task[] = [
  { id: crypto.randomUUID(), title: 'Task 1', isDone: true },
  { id: crypto.randomUUID(), title: 'Task 2', isDone: false },
  { id: crypto.randomUUID(), title: 'Task 3', isDone: false },
];

export const getTasks = async () => TASKS;
