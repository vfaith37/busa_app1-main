import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskInput({ onAddTask }) {
  const [taskName, setTaskName] = useState('');

  const addTask = () => {
    if (taskName.trim() === '') {
      return;
    }

    onAddTask(taskName.trim());
     setTaskName('');
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextInput
        style={{ flex: 1, marginRight: 10, borderWidth: 1, borderColor: '#ccc', padding: 10 }}
        placeholder="Enter task name"
        value={taskName}
        onChangeText={(text) => setTaskName(text)}
      />
      <TouchableOpacity onPress={addTask}>
        <Ionicons name="md-add-circle-outline" size={32} color="green" />
      </TouchableOpacity>
    </View>
  );
}
