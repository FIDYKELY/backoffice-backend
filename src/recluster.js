const recluster = require("recluster");
const path = require("path");

var cluster = recluster(path.join(__dirname, "server.js"));

cluster.run();

process.on("SIGUSR2", function () {
  console.log("Signal SIGUSR2 reçu, Rechargement du cluster …");
  cluster.reload();
});
