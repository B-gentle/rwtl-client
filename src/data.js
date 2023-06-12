import dashboard from './assets/icons/dashboard_icons/dashboard.svg';
import downlines from './assets/icons/dashboard_icons/downlines.svg';
import transactions from './assets/icons/dashboard_icons/transactions.svg';
import settings from './assets/icons/dashboard_icons/setting.svg';
import support from './assets/icons/dashboard_icons/24-support.svg';
import logout from './assets/icons/dashboard_icons/logout.svg';
import notification from './assets/icons/notification.svg';
import profile from './assets/icons/profile.svg';
import changePassword from './assets/icons/change-password.svg';
import changePin from './assets/icons/change-pin.svg';
import preference from './assets/icons/preference.svg';
import security from './assets/icons/security.svg';
import referrals from './assets/icons/referrals.svg';
import home from './assets/icons/mobile-home.svg';
import portfolio from './assets/icons/portfolio.svg';

export const sidemenu = [{
        text: 'Dashboard',
        icon: dashboard,
        mobileIcon: home,
        mobileText: 'Home',
        link: 'dashboard',
        className: "show"
    },
    {
        text: 'Downlines',
        mobileText: 'Downlines',
        icon: downlines,
        mobileIcon: downlines,
        link: 'downlines',
        className: "show"
    },
    {
        text: 'Transactions',
        mobileText: 'Portfolio',
        mobileIcon: portfolio,
        icon: transactions,
        link: 'transactions',
        className: "show"
    },
    {
        text: 'Settings',
        mobileText : 'Profile',
        mobileIcon: profile,
        icon: settings,
        link: 'settings',
        className: "show"
    },
    {
        text: 'Help & Support',
        icon: support,
        link: 'support',
        className: "hide"
    },
    {
        text: 'Logout',
        icon: logout,
        link: 'logout',
        className: "hide"
    }
]

export const settingsMenu = [{
        link: "My Profile",
        img: profile,
        to: "/profiles"
    },
    {
        link: "Notifications",
        img: notification,
        to: "/notifications"
    },
    {
        link: "Change Password",
        img: changePassword,
        to: "/change-password"
    },
    {
        link: "Change Pin",
        img: changePin,
        to: ""
    },
    {
        link: "Preferences",
        img: preference,
        to: ""
    },
    {
        link: "Referrals",
        img: referrals,
        to: "/referrals"
    },
    {
        link: "Security",
        img: security,
        to: ""
    },
    {
        link: "Help & Support",
        img: support,
        to: ""
    },
    {
        link: "Log Out",
        img: logout,
        to: ""
    },
]