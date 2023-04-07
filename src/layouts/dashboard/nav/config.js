// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },

  {
    title: 'History',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },

  {
    title: 'LogOut',
    path: '/',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
