// question 1 updated

// Create an index on the 'owner' field
db.tasks.createIndex({ owner: 1 });
const page = 1; // Current page number
const limit = 10; // Number of tasks per page

const tasks = await Task.find({ owner: userId })
                        .skip((page - 1) * limit)
                        .limit(limit)
                        .select('title status createdAt');

