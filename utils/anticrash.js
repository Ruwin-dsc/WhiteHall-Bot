const anticrashHandler = (bot) => {
 
  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(err, origin)
  });

  process.on("rejectionHandled", (err) => {
    console.log(err)
  });


  process.on("warning", (warning) => {
    console.log(warning)
  });

  process.on("uncaughtException", (error) => {

    console.log("Une erreur non-capturée est survenue:", error);
  });

  process.on("unhandledRejection", (reason, promise) => {
    if (reason.code == 10008) return;
    if (reason.code == 50013) return;
    if (reason.code == 50035) return; //Unknown message
    if (reason.code == 40060) return; //interaction de merde aknowleged
    if (reason.code == 10003) return; //unknow channel
    if (reason.code == 10014) return; //unknow emoji
    if (reason.code == 50001) return; //missing acess
    if (reason.code == 10015) return; //missing acess
    if (reason.code == 10062) return; //Unknown interaction
    console.log("Une erreur asynchrone non-capturée est survenue:", reason);
  });

  bot.on("error", (error) => {
    console.log("Une erreur non-capturée est survenue:", error);
  });

  process.on("processTicksAndRejections", (request, reason) => {
    console.log("Une erreur réseau non-capturée est survenue:", reason);
;
  });

  process.on("exit", (code) => {
    console.log(`Processus terminé avec le code ${code}`);
  });
};

module.exports = anticrashHandler;
