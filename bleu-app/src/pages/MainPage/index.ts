import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./MainPage'),
  loading: () => null,
});
