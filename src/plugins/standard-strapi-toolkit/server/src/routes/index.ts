import contentAPIRoutes from './content-api';
import landingAPIRoutes from './landing-api';

const routes = {
  'content-api': {
    type: 'content-api',
    routes: contentAPIRoutes,
  },
  'landing': {
    type: 'content-api',
    routes: landingAPIRoutes,
  },
};

export default routes;
