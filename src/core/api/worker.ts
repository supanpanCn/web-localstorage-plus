import { workerMsg } from "../../helper";

const workerFile = `
  let timer = null;
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
      }, 500);
    }
    run();
  });
`

const workBlob = new Blob ([workerFile]);

const workUrl = URL.createObjectURL(workBlob);

class WorkerSpace {
  public worker: any;
  static instance: any;
  static getInstance() {
    if (WorkerSpace.instance) {
      return WorkerSpace.instance.run();
    }
    WorkerSpace.instance = new WorkerSpace();
    WorkerSpace.instance.run();
  }
  run() {
    if (!this.worker) {
      this.worker = new Worker(workUrl);
    }
    this.worker.postMessage({
      meaasgeType: workerMsg,
      payload: window.WEB_STORAGE_EXPIRES,
    });
    this.worker.onmessage = (payload: any) => {
      const { data } = payload;
      if (Array.isArray(data)) {
        data.forEach((v) => window.WEB_STORAGE_APIS.getItem(v.key,v.namespace));
      }
    };
  }
}

export default WorkerSpace.getInstance
