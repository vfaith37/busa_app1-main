import React from 'react';
import { FlatList } from 'react-native';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onCheck, onDelete }) {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => <TaskItem task={item} onCheck={onCheck} onDelete={onDelete} />}
      keyExtractor={(item) => item.id}
    />
  );
}
