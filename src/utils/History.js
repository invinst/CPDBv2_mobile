import useRouterHistory from 'react-router/lib/useRouterHistory';
import { createHistory } from 'history';

const history = useRouterHistory(createHistory)({
  basename: '/'
});

export default history;
