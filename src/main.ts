import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';

// registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx0RHxbf1x0ZFBMYl1bRnZPMyBoS35RckVnWHtedXZURGBUVEx+');

registerLicense('ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5Xd0NjXHtccXxVRGdV');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
