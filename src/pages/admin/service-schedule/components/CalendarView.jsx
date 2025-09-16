import React, { useState } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const CalendarView = ({ 
  currentDate, 
  viewMode, 
  schedules, 
  onDateSelect, 
  onScheduleClick, 
  onViewModeChange,
  onDateChange 
}) => {
  const [draggedSchedule, setDraggedSchedule] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    let day = startOfWeek?.getDay();
    const diff = startOfWeek?.getDate() - day;
    startOfWeek?.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      let day = new Date(startOfWeek);
      day?.setDate(startOfWeek?.getDate() + i);
      days?.push(day);
    }
    return days;
  };

  const getSchedulesForDate = (date) => {
    if (!date) return [];
    const dateStr = date?.toDateString();
    return schedules?.filter(schedule => 
      new Date(schedule.date)?.toDateString() === dateStr
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'in-progress': return 'bg-warning text-warning-foreground';
      case 'pending': return 'bg-muted text-muted-foreground';
      case 'cancelled': return 'bg-error text-error-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const getWasteTypeColor = (type) => {
    switch (type) {
      case 'organic': return 'border-l-success';
      case 'recyclable': return 'border-l-primary';
      case 'hazardous': return 'border-l-error';
      case 'general': return 'border-l-muted-foreground';
      default: return 'border-l-accent';
    }
  };

  const handleDragStart = (e, schedule) => {
    setDraggedSchedule(schedule);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetDate) => {
    e?.preventDefault();
    if (draggedSchedule && targetDate) {
      // Handle schedule rescheduling logic here
      console.log('Reschedule:', draggedSchedule?.id, 'to', targetDate);
      setDraggedSchedule(null);
    }
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate?.setMonth(currentDate?.getMonth() + direction);
    } else if (viewMode === 'week') {
      newDate?.setDate(currentDate?.getDate() + (direction * 7));
    } else {
      newDate?.setDate(currentDate?.getDate() + direction);
    }
    onDateChange(newDate);
  };

  const formatDateHeader = () => {
    if (viewMode === 'month') {
      return currentDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else if (viewMode === 'week') {
      const weekDays = getWeekDays(currentDate);
      const start = weekDays?.[0]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const end = weekDays?.[6]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return `${start} - ${end}, ${currentDate?.getFullYear()}`;
    } else {
      return currentDate?.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-card rounded-lg border border-border">
        {/* Week day headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {weekDays?.map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {days?.map((day, index) => {
            const daySchedules = day ? getSchedulesForDate(day) : [];
            const isToday = day && day?.toDateString() === new Date()?.toDateString();
            const isSelected = day && day?.toDateString() === currentDate?.toDateString();

            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border-r border-b border-border cursor-pointer hover:bg-muted/50 transition-micro ${
                  !day ? 'bg-muted/20' : ''
                } ${isSelected ? 'bg-accent/10' : ''}`}
                onClick={() => day && onDateSelect(day)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, day)}
              >
                {day && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${
                      isToday ? 'text-primary' : 'text-foreground'
                    }`}>
                      {day?.getDate()}
                      {isToday && (
                        <div className="w-2 h-2 bg-primary rounded-full inline-block ml-1" />
                      )}
                    </div>
                    <div className="space-y-1">
                      {daySchedules?.slice(0, 3)?.map(schedule => (
                        <div
                          key={schedule?.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, schedule)}
                          onClick={(e) => {
                            e?.stopPropagation();
                            onScheduleClick(schedule);
                          }}
                          className={`text-xs p-1 rounded border-l-2 cursor-move hover:shadow-subtle transition-micro ${
                            getWasteTypeColor(schedule?.wasteType)
                          } ${getStatusColor(schedule?.status)}`}
                        >
                          <div className="font-medium truncate">{schedule?.route}</div>
                          <div className="opacity-80">{schedule?.time}</div>
                        </div>
                      ))}
                      {daySchedules?.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{daySchedules?.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const hours = Array.from({ length: 12 }, (_, i) => i + 6); // 6 AM to 6 PM

    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Week day headers */}
        <div className="grid grid-cols-8 border-b border-border">
          <div className="p-3 text-sm font-medium text-muted-foreground">Time</div>
          {weekDays?.map(day => {
            const isToday = day?.toDateString() === new Date()?.toDateString();
            return (
              <div key={day?.toISOString()} className={`p-3 text-center text-sm font-medium ${
                isToday ? 'text-primary bg-primary/5' : 'text-muted-foreground'
              }`}>
                <div>{day?.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className={`text-lg ${isToday ? 'font-bold' : ''}`}>
                  {day?.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        {/* Time slots */}
        <div className="max-h-96 overflow-y-auto">
          {hours?.map(hour => (
            <div key={hour} className="grid grid-cols-8 border-b border-border">
              <div className="p-2 text-xs text-muted-foreground border-r border-border">
                {hour}:00
              </div>
              {weekDays?.map(day => {
                const daySchedules = getSchedulesForDate(day)?.filter(s => {
                  const scheduleHour = parseInt(s?.time?.split(':')?.[0]);
                  return scheduleHour === hour;
                });

                return (
                  <div
                    key={`${day?.toISOString()}-${hour}`}
                    className="p-1 border-r border-border min-h-[60px] cursor-pointer hover:bg-muted/50"
                    onClick={() => onDateSelect(day)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, day)}
                  >
                    {daySchedules?.map(schedule => (
                      <div
                        key={schedule?.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, schedule)}
                        onClick={(e) => {
                          e?.stopPropagation();
                          onScheduleClick(schedule);
                        }}
                        className={`text-xs p-1 rounded mb-1 border-l-2 cursor-move hover:shadow-subtle transition-micro ${
                          getWasteTypeColor(schedule?.wasteType)
                        } ${getStatusColor(schedule?.status)}`}
                      >
                        <div className="font-medium truncate">{schedule?.route}</div>
                        <div className="opacity-80">{schedule?.staff}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const daySchedules = getSchedulesForDate(currentDate);
    const hours = Array.from({ length: 12 }, (_, i) => i + 6); // 6 AM to 6 PM

    return (
      <div className="bg-card rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">
            {currentDate?.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          <p className="text-sm text-muted-foreground">
            {daySchedules?.length} scheduled pickups
          </p>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {hours?.map(hour => {
            const hourSchedules = daySchedules?.filter(s => {
              const scheduleHour = parseInt(s?.time?.split(':')?.[0]);
              return scheduleHour === hour;
            });

            return (
              <div key={hour} className="flex border-b border-border">
                <div className="w-20 p-3 text-sm text-muted-foreground border-r border-border">
                  {hour}:00
                </div>
                <div className="flex-1 p-3 space-y-2">
                  {hourSchedules?.length === 0 ? (
                    <div className="text-sm text-muted-foreground italic">No schedules</div>
                  ) : (
                    hourSchedules?.map(schedule => (
                      <div
                        key={schedule?.id}
                        onClick={() => onScheduleClick(schedule)}
                        className={`p-3 rounded-lg border-l-4 cursor-pointer hover:shadow-subtle transition-micro ${
                          getWasteTypeColor(schedule?.wasteType)
                        } bg-card`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-foreground">{schedule?.route}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getStatusColor(schedule?.status)
                          }`}>
                            {schedule?.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Icon name="User" size={14} />
                            {schedule?.staff}
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Clock" size={14} />
                            {schedule?.duration}
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Truck" size={14} />
                            {schedule?.vehicle}
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Trash2" size={14} />
                            {schedule?.wasteType}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate(-1)}
              iconName="ChevronLeft"
              iconSize={16}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate(1)}
              iconName="ChevronRight"
              iconSize={16}
            />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            {formatDateHeader()}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDateChange(new Date())}
          >
            Today
          </Button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {['month', 'week', 'day']?.map(mode => (
            <Button
              key={mode}
              variant={viewMode === mode ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange(mode)}
              className="capitalize"
            >
              {mode}
            </Button>
          ))}
        </div>
      </div>
      {/* Calendar Content */}
      {viewMode === 'month' && renderMonthView()}
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'day' && renderDayView()}
    </div>
  );
};

export default CalendarView;