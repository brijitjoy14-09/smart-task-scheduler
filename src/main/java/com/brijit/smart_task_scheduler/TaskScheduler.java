package com.brijit.smart_task_scheduler;

import java.util.Comparator;
import java.util.List;

public class TaskScheduler {

    public List<Task> generateSchedule(List<Task> tasks) {

        tasks.sort(
            Comparator
                .comparing((Task task) -> getPriorityValue(task.getPriority()))
                .thenComparing(Task::getDeadline)
                .thenComparing(Task::getDuration)
        );

        return tasks;
    }

    private int getPriorityValue(Priority priority) {

        return switch (priority) {
            case HIGH -> 1;
            case MEDIUM -> 2;
            case LOW -> 3;
        };
    }
}