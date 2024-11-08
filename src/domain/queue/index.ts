import async from "async";

const queue = async.queue(async (task: () => void,callback) => {
  await task();
  callback();
}, 1);

export { queue };
