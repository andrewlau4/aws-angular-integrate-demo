//https://ui.docs.amplify.aws/angular/getting-started/troubleshooting#global-and-process-shim

(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};