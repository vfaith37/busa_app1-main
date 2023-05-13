import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Get saved tasks from AsyncStorage
    AsyncStorage.getItem('tasks').then((data) => {
      if (data) {
        setTasks(JSON.parse(data));
      }
    });

    // Request permission to send notifications
    Notifications.requestPermissionsAsync().then((status) => {
      if (status.granted) {
        // Set up a listener for notifications
        Notifications.addNotificationReceivedListener(handleNotification);
      }
    });

    // Define the function to handle notifications
    const handleNotification = async (notification) => {
      const { data } = notification.request.content;
      const task = tasks.find((t) => t.id === data.taskId);

      if (task) {
        // Play notification sound
        const soundObject = new Audio.Sound();
        try {
          await soundObject.loadAsync(require('./assets/notification.mp3'));
          await soundObject.playAsync();
        } catch (error) {
          console.log(error);
        }

        // Show notification
        Notifications.presentLocalNotificationAsync({
          title: 'Task Reminder',
          body: `It's time to start "${task.name}"!`,
        });
      }
    };

    return () => {
      Notifications.removeNotificationSubscription(handleNotification);
    };
  }, [tasks]);

  const saveTasks = (tasks) => {
    // Save tasks to AsyncStorage
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    setTasks(tasks);
  };

  const addTask = (name) => {
    const newTask = { id: Date.now().toString(), name, completed: false, reminder: null };
    saveTasks([...tasks, newTask]);
  };

  const checkTask = (id) => {
    const newTasks = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    saveTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    saveTasks(newTasks);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TaskInput onAddTask={addTask} />
      <TaskList tasks={tasks} onCheck={checkTask} onDelete={deleteTask} />
    </View>
  );
}
