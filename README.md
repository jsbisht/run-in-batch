# run-in-batch

Run your task like api calls in batch

## features

- Set number of parallel tasks i.e. the batch size
- Set timeout for each task
- Set timeout for each batch
- Callback function post completion of each task
- Callback function post completion of each batch
- Return list of failed jobs post completion
- Option to let timed out jobs to run, post timeout (tentative)

## Usage

### Specify how to execute each task

**onTaskRun**

- If not specified, empty array is returned

### Set number of parallel tasks i.e. the batch size

**batch_size** (Optional)

- If not specified, all tasks will execute concurrently
