import { IEnvironment, WindowWithEnvironment } from '@dsg/shared/utils/environment';
import { FeatureFlags } from '@dsg/shared/utils/feature-flagging';

declare let window: WindowWithEnvironment;

const _environment: IEnvironment<Partial<FeatureFlags>> = {
  authenticationConfiguration: {
    firebaseConfiguration: {
      firebase: {
        apiKey: 'AIzaSyAKsXCEYvBVgfTITzK6wJE01RznBcrMfD8',
        authDomain: 'cwb03-dev.firebaseapp.com',
      },
      providerId: 'oidc.public',
      tenantId: 'employer-portal-onkhp',
    },
    sessionExpiration: {
      idleTimeSeconds: 60 * 30,
      sessionTimeSeconds: 60 * 60 * 18,
    },
  },
  featureFlags: {},
  httpConfiguration: {
    baseUrl: 'https://api-dev.cwb03.dsgov.demo.nuvalence.io',
  },
};

export const environment: IEnvironment = {
  ..._environment,
  ...window.environment, // must be last
};
