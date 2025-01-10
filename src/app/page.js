"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Plus, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    pending: [],
    inProgress: [],
    done: [],
  });

  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("kanbanTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks((prev) => ({
        ...prev,
        pending: [...prev.pending, { id: Date.now(), text: newTask }],
      }));
      setNewTask("");
    }
  };

  const deleteTask = (columnId, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((task) => task.id !== taskId),
    }));
  };

  const startEditing = (task) => {
    setEditingTask({ ...task });
  };

  const saveEdit = (columnId) => {
    if (editingTask && editingTask.text.trim()) {
      setTasks((prev) => ({
        ...prev,
        [columnId]: prev[columnId].map((task) =>
          task.id === editingTask.id ? editingTask : task
        ),
      }));
      setEditingTask(null);
    }
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (columnId) => {
    if (draggedTask) {
      const sourceColumn = Object.keys(tasks).find((key) =>
        tasks[key].find((task) => task.id === draggedTask.id)
      );

      setTasks((prev) => ({
        ...prev,
        [sourceColumn]: prev[sourceColumn].filter(
          (task) => task.id !== draggedTask.id
        ),
        [columnId]: [...prev[columnId], draggedTask],
      }));

      setDraggedTask(null);
    }
  };

  const renderTask = (task, columnId) => {
    const isEditing = editingTask && editingTask.id === task.id;

    return (
      <Card
        key={task.id}
        draggable
        onDragStart={() => handleDragStart(task)}
        className="mb-2 cursor-move shadow-md"
      >
        <CardContent className="p-4">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <Textarea
                value={editingTask.text}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, text: e.target.value })
                }
                onBlur={() => saveEdit(columnId)}
                className="min-h-[80px] w-full"
                placeholder="Task description..."
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setEditingTask(null)}
                  size="sm"
                >
                  Cancel
                </Button>
                <Button onClick={() => saveEdit(columnId)} size="sm">
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start flex-col justify-between gap-2">
              <span className="flex-1 whitespace-pre-wrap">{task.text}</span>
              <Separator />
              <div className="flex gap-2 justify-end ml-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => startEditing(task)}
                >
                  <Edit2 className="h-4 w-4" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => deleteTask(columnId, task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const getColumnColor = (columnId) => {
    switch (columnId) {
      case "pending":
        return "bg-yellow-100";
      case "inProgress":
        return "bg-blue-100";
      case "done":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  const getBadgeVariant = (columnId) => {
    switch (columnId) {
      case "pending":
        return "warning";
      case "inProgress":
        return "secondary";
      case "done":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex gap-4 mb-4">
          <Badge variant="warning" className="text-lg">
            Pending: {tasks.pending.length}
          </Badge>
          <Badge variant="secondary" className="text-lg">
            In Progress: {tasks.inProgress.length}
          </Badge>
          <Badge variant="success" className="text-lg">
            Done: {tasks.done.length}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            placeholder="Add new task..."
            className="flex-1"
          />
          <Button onClick={addTask}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(tasks).map(([columnId, columnTasks]) => (
          <div
            key={columnId}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(columnId)}
            className={`border-gray-400 border overflow-y-scroll scrollbar-thin p-4 rounded-lg h-[80vh] ${getColumnColor(
              columnId
            )}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold capitalize">
                {columnId.replace(/([A-Z])/g, " $1")}
              </h2>
              <Badge variant={getBadgeVariant(columnId)}>
                {columnTasks.length}
              </Badge>
            </div>

            <Separator className="my-3" />

            {columnTasks.map((task) => renderTask(task, columnId))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
