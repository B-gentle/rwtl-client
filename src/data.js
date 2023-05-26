import dashboard from './assets/icons/dashboard_icons/dashboard.svg';
import downlines from './assets/icons/dashboard_icons/downlines.svg';
import transactions from './assets/icons/dashboard_icons/transactions.svg';
import settings from './assets/icons/dashboard_icons/setting.svg';
import support from './assets/icons/dashboard_icons/24-support.svg';
import logout from './assets/icons/dashboard_icons/logout.svg';

export const sidemenu = [{
    title: 'Dashboard',
    icon: dashboard,
    link: 'dashboard',
    className: "show"
},
{
    title: 'Downlines',
    icon: downlines,
    link: 'downlines',
    className: "show"
},
{
    title: 'Transactions',
    icon: transactions,
    link: 'transactions',
    className: "show"
},
{
    title: 'Settings',
    icon: settings,
    link: 'settings',
    className: "show"
},
{
    title: 'Help & Support',
    icon: support,
    link: 'support',
    className: "hide"
},
{
    title: 'Logout',
    icon: logout,
    link: 'logout',
    className: "hide"
}]