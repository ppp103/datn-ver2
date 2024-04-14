import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx0RHxbf1x0ZFBMYl1bRnZPMyBoS35RckVnWHtedXZURGBUVEx+');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
