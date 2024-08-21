function info(namespace = "SERVER", message) {
  console.info(`[INFO][${namespace}] - ${message}`);
}

function warn(namespace = "SERVER", message, stack, data = {}) {
  console.warn("**********");
  console.warn(`[WARNING][${namespace}] - ${message}`);
  console.warn(stack);
  console.warn(data);
  console.warn("**********");
}

function error(namespace = "SERVER", message, stack, data = {}) {
  console.error("**********");
  console.error(`[ERROR][${namespace}] - ${message}`);
  console.error(stack);
  console.error(data);
  console.error("**********");
}

module.exports = {
  info,
  warn,
  error,
};
