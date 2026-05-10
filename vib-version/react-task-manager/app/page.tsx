"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

type Task = {
  id: string
  text: string
  completed: boolean
}

type Filter = "all" | "active" | "completed"

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputValue, setInputValue] = useState("")
  const [filter, setFilter] = useState<Filter>("all")

  const addTask = () => {
    if (inputValue.trim() === "") return
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
    }
    setTasks([...tasks, newTask])
    setInputValue("")
  }

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  const activeCount = tasks.filter((t) => !t.completed).length

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-center text-slate-800">
              Task Manager
            </CardTitle>
            <p className="text-center text-slate-500 text-sm">
              {activeCount} {activeCount === 1 ? "task" : "tasks"} remaining
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input Section */}
            <div className="flex gap-2">
              <Input
                placeholder="Add a new task..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                className="flex-1"
              />
              <Button onClick={addTask} className="px-6">
                Add
              </Button>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 justify-center">
              {(["all", "active", "completed"] as Filter[]).map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f)}
                  className="capitalize"
                >
                  {f}
                </Button>
              ))}
            </div>

            {/* Task List */}
            <div className="space-y-2">
              {filteredTasks.length === 0 ? (
                <p className="text-center text-slate-400 py-8">
                  {filter === "all"
                    ? "No tasks yet. Add one above!"
                    : filter === "active"
                      ? "No active tasks"
                      : "No completed tasks"}
                </p>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group"
                  >
                    <Checkbox
                      id={task.id}
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                    <label
                      htmlFor={task.id}
                      className={`flex-1 cursor-pointer select-none ${
                        task.completed
                          ? "line-through text-slate-400"
                          : "text-slate-700"
                      }`}
                    >
                      {task.text}
                    </label>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
