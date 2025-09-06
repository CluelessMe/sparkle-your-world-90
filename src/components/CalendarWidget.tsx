import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { cn } from "@/lib/utils";

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: "Team Meeting",
    time: "10:00 AM",
    date: new Date(2024, 11, 6), // December 6, 2024
    type: "meeting"
  },
  {
    id: 2,
    title: "Project Review",
    time: "2:30 PM",
    date: new Date(2024, 11, 6), // December 6, 2024
    type: "review"
  },
  {
    id: 3,
    title: "Client Call",
    time: "11:00 AM",
    date: new Date(2024, 11, 7), // December 7, 2024
    type: "call"
  },
  {
    id: 4,
    title: "Design Workshop",
    time: "3:00 PM",
    date: new Date(2024, 11, 8), // December 8, 2024
    type: "workshop"
  }
];

export const CalendarWidget = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // Get events for the selected date
  const eventsForSelectedDate = mockEvents.filter(event => 
    isSameDay(event.date, selectedDate)
  );

  // Get event type color
  const getEventColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "text-blue-400";
      case "review":
        return "text-purple-400";
      case "call":
        return "text-green-400";
      case "workshop":
        return "text-orange-400";
      default:
        return "text-muted-foreground";
    }
  };

  // Get events for current month to show dots on calendar
  const eventsInMonth = mockEvents.filter(event => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    return event.date >= monthStart && event.date <= monthEnd;
  });

  // Custom day content to show event indicators
  const customDayContent = (day: Date) => {
    const hasEvent = eventsInMonth.some(event => isSameDay(event.date, day));
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <span>{format(day, "d")}</span>
        {hasEvent && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
        )}
      </div>
    );
  };

  return (
    <div className="glass-card p-4 rounded-xl border border-border/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-sm text-foreground flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          Calendar
        </h3>
        <div className="text-xs text-muted-foreground">
          {format(selectedDate, "MMM yyyy")}
        </div>
      </div>

      {/* Mini Calendar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          >
            <ChevronLeft className="w-3 h-3" />
          </Button>
          <span className="text-xs font-medium text-foreground">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          >
            <ChevronRight className="w-3 h-3" />
          </Button>
        </div>
        
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          className={cn("w-full text-xs pointer-events-auto [&_.rdp-day]:h-6 [&_.rdp-day]:w-6 [&_.rdp-day]:text-xs")}
          classNames={{
            months: "flex w-full",
            month: "w-full",
            table: "w-full border-collapse",
            head_row: "flex w-full",
            head_cell: "text-muted-foreground rounded-md w-6 font-normal text-[10px] flex-1 text-center",
            row: "flex w-full mt-1",
            cell: "relative p-0 text-center text-xs focus-within:relative focus-within:z-20 flex-1",
            day: cn(
              "h-6 w-6 p-0 font-normal text-xs rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground mx-auto"
            ),
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_hidden: "invisible",
          }}
          components={{
            Day: ({ date, displayMonth }) => {
              const isOutside = date.getMonth() !== displayMonth.getMonth();
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const isToday = isSameDay(date, new Date());
              const hasEvent = eventsInMonth.some(event => isSameDay(event.date, date));
              
              return (
                <div
                  className={cn(
                    "relative h-6 w-6 p-0 font-normal text-xs rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground mx-auto cursor-pointer flex items-center justify-center",
                    isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                    isToday && !isSelected && "bg-accent text-accent-foreground",
                    isOutside && "text-muted-foreground opacity-50"
                  )}
                  onClick={() => setSelectedDate(date)}
                >
                  <span>{format(date, "d")}</span>
                  {hasEvent && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                  )}
                </div>
              );
            }
          }}
        />
      </div>

      {/* Events for Selected Date */}
      <div className="pt-3 border-t border-border/30">
        
        {eventsForSelectedDate.length > 0 ? (
          <div className="space-y-2">
            {eventsForSelectedDate.map((event) => (
              <div 
                key={event.id}
                className="flex items-center gap-2 p-2 rounded-lg bg-card-glass/30 border border-border/20"
              >
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {event.title}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-2 h-2 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">
                      {event.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-xs text-muted-foreground">
              No events scheduled
            </div>
          </div>
        )}
      </div>
    </div>
  );
};