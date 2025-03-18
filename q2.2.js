function hasCycle(tasks) {
    const visited = new Set();
    const recStack = new Set();

    function dfs(task) {
        if (recStack.has(task)) {
            return true; // Cycle detected
        }
        if (visited.has(task)) {
            return false; // Already visited, no cycle from this node
        }

        visited.add(task);
        recStack.add(task);

        for (const neighbor of tasks[task] || []) {
            if (dfs(neighbor)) {
                return true;
            }
        }

        recStack.delete(task);
        return false;
    }

    for (const task in tasks) {
        if (dfs(task)) {
            return true;
        }
    }

    return false;
}

// Example usage
const tasks = {
    A: ["B"],
    B: ["C"],
    C: ["A"]
};

console.log(hasCycle(tasks)); 
// Output: true