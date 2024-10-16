import async from "async";

const queue = async.queue(async (task: any,callback) => {
  await task();
  callback();
}, 1);

export { queue };
