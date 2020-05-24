# run-in-batch

Run your task like api calls in batch

## features

- Run either parallely or serially
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

### Set timeout for each task

**task_timeout** (Optional)

- If not specified, all tasks will run indefinately
- If specified, each task races against this timeout. Value specified is considered as milliseconds.

If timeout happens, task would return:

**task_timeout_val**

Default value: "timeout"

### Set timeout for each batch

**batch_timeout** (Optional)

- If not specified, all batches will run indefinately
- If specified, each batch races against this timeout.

If timeout happens, batch would return ...

### Callback function for completion of each task

**onTaskRun** (Optional)

- If not specified, empty array is returned
- If specified, this method is run for each task

### Callback function post completion of each batch

**onBatchComplete** (Optional)

- If not specified, no error is thrown
- If specified, this method is run post each batch completion
