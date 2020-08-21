import api from '../../integration-test/mock-api';
import { mockToasts } from '../../integration-test/mock-data/toasts';
import { mockGetAppConfig } from '../../integration-test/mock-data/app-config';

export const mockCommonApi = () => {
  api.onGet('/api/v2/mobile/toast/').reply(200, mockToasts);
  api.onGet('/api/v2/app-config/').reply(200, mockGetAppConfig);
  api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/').reply(200, {});
};
