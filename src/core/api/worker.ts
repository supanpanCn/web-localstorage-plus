import { pkgName, workerMsg } from "../../helper";

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
      this.worker = new Worker(
        `/node_modules/${pkgName}/dist/worker.mjs?=${Date.now()}`
      );
    }
    this.worker.postMessage({
      meaasgeType: workerMsg,
      payload: window.WEB_STORAGE_EXPIRES,
    });
    this.worker.onmessage = (payload: any) => {
      const { data } = payload;
      if (Array.isArray(data)) {
        window.WEB_STORAGE_DEBUGGER = true
        data.forEach((v) => window.WEB_STORAGE_APIS.getItem(v.key,v.namespace));
        window.WEB_STORAGE_DEBUGGER = false
      }
    };
  }
}

export default WorkerSpace.getInstance
