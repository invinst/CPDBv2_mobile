import { get } from 'lodash';

export const getPathname = state => get(state, 'routing.locationBeforeTransitions.pathname');
