function mostFrequentTask(tasks) {
    const taskFrequency = {};

    // Count the frequency of each task
    for (const task of tasks) {
        if (taskFrequency[task]) {
            taskFrequency[task]++;
        } else {
            taskFrequency[task] = 1;
        }
    }

    // Find the task with the highest frequency
    let maxCount = 0;
    let mostFrequent = null;
    for (const task in taskFrequency) {
        if (taskFrequency[task] > maxCount) {
            maxCount = taskFrequency[task];
            mostFrequent = task;
        }
    }

    return mostFrequent;
}

console.log(mostFrequentTask(["A", "B", "A", "C", "A", "B"])); 

// Output: "A"