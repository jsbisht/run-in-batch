# run-in-batch

Run your task like api calls in batch

## features

- Set number of tasks in one batch
- Set timeout for each task
- Set timeout for each batch
- Callback function for completion of each task
- Callback function post completion of each batch
- Return list of failed jobs post completion

## options

### Execute task in a batch parallely or sequentially

**runType** (Default: parallel)

- parallel
- series

### Set number of tasks in one batch

**batch_size** (Optional)

- If not specified, all tasks will execute concurrently
- If specified, tasks are chunked by `batch_size`

### Callback function for completion of each task

**onTaskRun** (Optional)

- If not specified, empty array is returned
- If specified, this method is run for each task

### Callback function post completion of each batch

**onBatchComplete** (Optional)

- If not specified, no error is thrown
- If specified, this method is run post each batch completion
