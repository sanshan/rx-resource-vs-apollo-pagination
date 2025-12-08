import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

(async () => {
  if (!environment.production) {
    const { initMsw } = await import('./mocks/init-msw');
    await initMsw();
  }
  await bootstrapApplication(App, appConfig);
})().catch((err) => console.error(err));
