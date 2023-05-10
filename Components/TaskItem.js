import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskItem({ task, onCheck, onDelete }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => onCheck(task.id)}>
        {task.completed ? (
          <Ionicons name="md-checkmark-circle" size={32} color="green" style={{ marginRight: 10 }} />
        ) : (
          <Ionicons name="md-checkmark-circle-outline" size={32} color="green" style={{ marginRight: 10 }} />
        )}
      </TouchableOpacity>
      <Text style={{ flex: 1 }}>{task.name}</Text>
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Ionicons name="md-trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
}
