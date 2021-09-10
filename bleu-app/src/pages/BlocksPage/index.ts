import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./BlocksPage'),
  loading: () => null,
});
