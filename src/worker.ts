let timer: any = null;
self.addEventListener("message", (params) => {
  clearInterval(timer);
  const { data } = params || {};
  const { meaasgeType, payload } = data || {};
  function run() {
    timer = setInterval(() => {
      if (meaasgeType && Array.isArray(payload)) {
        const legals = payload.filter((v) => Date.now() >= v.expireTime);
        if (Array.isArray(legals) && legals.length) {
          clearInterval(timer);
          postMessage(legals);
          run()
        }
      }
    }, 2000);
  }
  run();
});
