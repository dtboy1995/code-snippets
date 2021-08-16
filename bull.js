async function clearRepeatableJobs(queue) {
    let repeatableJobs = await queue.getRepeatableJobs()
    for (let repeatableJob of repeatableJobs) {
        await queue.removeRepeatableByKey(repeatableJob.key)
    }
}
