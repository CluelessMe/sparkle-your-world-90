import { Plus, Filter, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "./TaskCard";

const mockTasks = [
  {
    title: "Meeting with joes members",
    description: "Description about the team meeting with members. Good team has more than 100 followers.",
    status: "in-progress" as const,
    priority: "high" as const,
    assignees: [
      { name: "John", initials: "JM" },
      { name: "Alice", initials: "AS" },
      { name: "Bob", initials: "BK" }
    ],
    hasAttachment: true,
    dueDate: "All People"
  },
  {
    title: "Design System",
    description: "Description Responsive Design system for sending pages in mobile applications and create component libraries.",
    progress: 60,
    status: "in-progress" as const,
    priority: "medium" as const,
    assignees: [
      { name: "Design team", initials: "DT" },
      { name: "Marketing team", initials: "MT" }
    ],
    dueDate: "All People"
  },
  {
    title: "Meeting With The Sales Team",
    description: "Checking the sales of the recent month and discussing the goals and vision of the new team.",
    status: "todo" as const,
    priority: "medium" as const,
    assignees: [
      { name: "Sales", initials: "ST" },
      { name: "Alice", initials: "AL" }
    ],
    hasAttachment: true,
    dueDate: "All People"
  }
];

export const Dashboard = () => {
  return (
    <div className="flex-1 p-6 cosmic-scroll overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-1">Make Things Simple !</h1>
            <p className="text-sm text-muted-foreground">
              Management and planning is a base and productive way to<br />
              bring joy success
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                <span className="text-xs text-white font-medium">👤</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                <span className="text-xs text-white font-medium">👤</span>
              </div>
              <span className="text-xs text-muted-foreground ml-1">ASSITMENT</span>
            </div>
            <Button size="sm" className="h-7 px-3 text-xs">
              🔍 Search
            </Button>
            <Button size="sm" variant="outline" className="h-7 w-7 p-0">
              👤
            </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 h-8 px-3 text-xs border-border/50 bg-card-glass/30">
            📋 To Do
            <ChevronDown className="w-3 h-3" />
          </Button>
          <Button variant="ghost" className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground">
            Work
          </Button>
          <Button variant="ghost" className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground">
            Highest priority
          </Button>
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockTasks.map((task, index) => (
          <TaskCard key={index} {...task} />
        ))}
      </div>
    </div>
  );
};