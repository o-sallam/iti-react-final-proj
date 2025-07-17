import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideBar = ({ sidebarToggle }) => {
  const location = useLocation();

  const menuItems = [
    {
      id: 'clients',
      title: 'العملاء',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 22h20L12 2Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      ),
      link: '/clients',
      hasDropdown: false
    },
    {
      id: 'selling',
      title: 'المبيعات',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 22h20L12 2Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      ),
      link: '/selling',
      hasDropdown: false
    },
    {
      id: 'Dashboard',
      title: 'لوحة التحكم',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.5 3.25C4.25736 3.25 3.25 4.25736 3.25 5.5V8.99998C3.25 10.2426 4.25736 11.25 5.5 11.25H9C10.2426 11.25 11.25 10.2426 11.25 8.99998V5.5C11.25 4.25736 10.2426 3.25 9 3.25H5.5ZM4.75 5.5C4.75 5.08579 5.08579 4.75 5.5 4.75H9C9.41421 4.75 9.75 5.08579 9.75 5.5V8.99998C9.75 9.41419 9.41421 9.74998 9 9.74998H5.5C5.08579 9.74998 4.75 9.41419 4.75 8.99998V5.5ZM5.5 12.75C4.25736 12.75 3.25 13.7574 3.25 15V18.5C3.25 19.7426 4.25736 20.75 5.5 20.75H9C10.2426 20.75 11.25 19.7427 11.25 18.5V15C11.25 13.7574 10.2426 12.75 9 12.75H5.5ZM4.75 15C4.75 14.5858 5.08579 14.25 5.5 14.25H9C9.41421 14.25 9.75 14.5858 9.75 15V18.5C9.75 18.9142 9.41421 19.25 9 19.25H5.5C5.08579 19.25 4.75 18.9142 4.75 18.5V15ZM12.75 5.5C12.75 4.25736 13.7574 3.25 15 3.25H18.5C19.7426 3.25 20.75 4.25736 20.75 5.5V8.99998C20.75 10.2426 19.7426 11.25 18.5 11.25H15C13.7574 11.25 12.75 10.2426 12.75 8.99998V5.5ZM15 4.75C14.5858 4.75 14.25 5.08579 14.25 5.5V8.99998C14.25 9.41419 14.5858 9.74998 15 9.74998H18.5C18.9142 9.74998 19.25 9.41419 19.25 8.99998V5.5C19.25 5.08579 18.9142 4.75 18.5 4.75H15ZM15 12.75C13.7574 12.75 12.75 13.7574 12.75 15V18.5C12.75 19.7426 13.7574 20.75 15 20.75H18.5C19.7426 20.75 20.75 19.7427 20.75 18.5V15C20.75 13.7574 19.7426 12.75 18.5 12.75H15ZM14.25 15C14.25 14.5858 14.5858 14.25 15 14.25H18.5C18.9142 14.25 19.25 14.5858 19.25 15V18.5C19.25 18.9142 18.9142 19.25 18.5 19.25H15C14.5858 19.25 14.25 18.9142 14.25 18.5V15Z"
            fill=""
          />
        </svg>
      ),
      link: '/',
      hasDropdown: false
    },
    {
      id: 'Invoices',
      title: 'الفواتير',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 2C8.41421 2 8.75 2.33579 8.75 2.75V3.75H15.25V2.75C15.25 2.33579 15.5858 2 16 2C16.4142 2 16.75 2.33579 16.75 2.75V3.75H18.5C19.7426 3.75 20.75 4.75736 20.75 6V9V19C20.75 20.2426 19.7426 21.25 18.5 21.25H5.5C4.25736 21.25 3.25 20.2426 3.25 19V9V6C3.25 4.75736 4.25736 3.75 5.5 3.75H7.25V2.75C7.25 2.33579 7.58579 2 8 2ZM8 5.25H5.5C5.08579 5.25 4.75 5.58579 4.75 6V8.25H19.25V6C19.25 5.58579 18.9142 5.25 18.5 5.25H16H8ZM19.25 9.75H4.75V19C4.75 19.4142 5.08579 19.75 5.5 19.75H18.5C18.9142 19.75 19.25 19.4142 19.25 19V9.75Z"
            fill=""
          />
        </svg>
      ),
      link: '/invoices',
      hasDropdown: false
    },
        {
      id: 'prpducts',
      title: 'المنتجات',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 2C8.41421 2 8.75 2.33579 8.75 2.75V3.75H15.25V2.75C15.25 2.33579 15.5858 2 16 2C16.4142 2 16.75 2.33579 16.75 2.75V3.75H18.5C19.7426 3.75 20.75 4.75736 20.75 6V9V19C20.75 20.2426 19.7426 21.25 18.5 21.25H5.5C4.25736 21.25 3.25 20.2426 3.25 19V9V6C3.25 4.75736 4.25736 3.75 5.5 3.75H7.25V2.75C7.25 2.33579 7.58579 2 8 2ZM8 5.25H5.5C5.08579 5.25 4.75 5.58579 4.75 6V8.25H19.25V6C19.25 5.58579 18.9142 5.25 18.5 5.25H16H8ZM19.25 9.75H4.75V19C4.75 19.4142 5.08579 19.75 5.5 19.75H18.5C18.9142 19.75 19.25 19.4142 19.25 19V9.75Z"
            fill=""
          />
        </svg>
      ),
      link: '/products',
      hasDropdown: false
    },
    
 {
      id: 'warehouses',
      title: 'المخازن',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 2C8.41421 2 8.75 2.33579 8.75 2.75V3.75H15.25V2.75C15.25 2.33579 15.5858 2 16 2C16.4142 2 16.75 2.33579 16.75 2.75V3.75H18.5C19.7426 3.75 20.75 4.75736 20.75 6V9V19C20.75 20.2426 19.7426 21.25 18.5 21.25H5.5C4.25736 21.25 3.25 20.2426 3.25 19V9V6C3.25 4.75736 4.25736 3.75 5.5 3.75H7.25V2.75C7.25 2.33579 7.58579 2 8 2ZM8 5.25H5.5C5.08579 5.25 4.75 5.58579 4.75 6V8.25H19.25V6C19.25 5.58579 18.9142 5.25 18.5 5.25H16H8ZM19.25 9.75H4.75V19C4.75 19.4142 5.08579 19.75 5.5 19.75H18.5C18.9142 19.75 19.25 19.4142 19.25 19V9.75Z"
            fill=""
          />
        </svg>
      ),
      link: '/warehouses',
      hasDropdown: false
    },
     {
      id: 'inventory',
      title: 'المخزون',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 2C8.41421 2 8.75 2.33579 8.75 2.75V3.75H15.25V2.75C15.25 2.33579 15.5858 2 16 2C16.4142 2 16.75 2.33579 16.75 2.75V3.75H18.5C19.7426 3.75 20.75 4.75736 20.75 6V9V19C20.75 20.2426 19.7426 21.25 18.5 21.25H5.5C4.25736 21.25 3.25 20.2426 3.25 19V9V6C3.25 4.75736 4.25736 3.75 5.5 3.75H7.25V2.75C7.25 2.33579 7.58579 2 8 2ZM8 5.25H5.5C5.08579 5.25 4.75 5.58579 4.75 6V8.25H19.25V6C19.25 5.58579 18.9142 5.25 18.5 5.25H16H8ZM19.25 9.75H4.75V19C4.75 19.4142 5.08579 19.75 5.5 19.75H18.5C18.9142 19.75 19.25 19.4142 19.25 19V9.75Z"
            fill=""
          />
        </svg>
      ),
      link: '/inventory',
      hasDropdown: false
    },

    {
      id: 'PurchaseOrders',
      title: 'أوامر الشراء',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z"
            fill=""
          />
        </svg>
      ),
      link: '/purchase-orders',
      hasDropdown: false
    },
    {
      id: 'Suppliers',
      title: 'الموردين',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z"
            fill=""
          />
        </svg>
      ),
      link: '/suppliers',
      hasDropdown: false
    }
  ];

  const isActive = (itemId) => {
    if (itemId === 'Dashboard') {
      return location.pathname === '/';
    }
    return location.pathname === menuItems.find(item => item.id === itemId)?.link;
  };

  return (
    <aside
      className={`sidebar fixed left-0 top-0 z-9999 flex h-screen w-[290px] flex-col overflow-y-hidden border-l border-gray-200 bg-white px-5 dark:border-gray-800 dark:bg-black lg:static lg:translate-x-0 ${
        sidebarToggle ? 'translate-x-0 lg:w-[90px]' : '-translate-x-full'
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div
        className={`flex items-center gap-2 pt-8 sidebar-header pb-7 ${
          sidebarToggle ? 'justify-center' : 'justify-between'
        }`}
      >
        <Link to="/">
          <span className={`logo ${sidebarToggle ? 'hidden' : ''} relative flex items-center`}>
            {/* Custom SVG Logo */}
            <span className="relative flex items-center">
              <svg width="48" height="48" viewBox="-4.8 -4.8 57.60 57.60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ minWidth: 48, minHeight: 48 }}>
                <g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(1.44,1.44), scale(0.94)"><rect x="-4.8" y="-4.8" width="57.60" height="57.60" rx="0" fill="#2F88FF" /></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#fffafa" strokeWidth="1.824">
                  <rect width="48" height="48" fill="white" fillOpacity="0.01"></rect>
                  <path d="M32.9037 13.9271C31.2464 17.1587 27.8814 19.3701 24 19.3701C20.1185 19.3701 16.7536 17.1587 15.0963 13.9271C11.3982 16.659 9 21.0494 9 26C9 26.8177 9.06543 27.6201 9.19135 28.4023C9.45807 28.381 9.72775 28.3701 9.99996 28.3701C15.5228 28.3701 20 32.8473 20 38.3701C20 39.0664 19.9288 39.746 19.7934 40.4021C21.128 40.7913 22.5397 41 24 41C25.4603 41 26.8719 40.7913 28.2066 40.4021C28.0711 39.746 28 39.0664 28 38.3701C28 32.8473 32.4771 28.3701 38 28.3701C38.2722 28.3701 38.5419 28.381 38.8087 28.4023C38.9346 27.6201 39 26.8177 39 26C39 21.0494 36.6017 16.659 32.9037 13.9271Z" fill="#ffffff" stroke="#2F88FF" strokeWidth="0.00048" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M24 13C26.2091 13 28 11.2091 28 9C28 6.79086 26.2091 5 24 5C21.7909 5 20 6.79086 20 9C20 11.2091 21.7909 13 24 13Z" fill="#ffffff" stroke="#2F88FF" strokeWidth="0.00048" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9 43C11.2091 43 13 41.2091 13 39C13 36.7909 11.2091 35 9 35C6.79086 35 5 36.7909 5 39C5 41.2091 6.79086 43 9 43Z" fill="#ffffff" stroke="#2F88FF" strokeWidth="0.00048" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M39 43C41.2091 43 43 41.2091 43 39C43 36.7909 41.2091 35 39 35C36.7909 35 35 36.7909 35 39C35 41.2091 36.7909 43 39 43Z" fill="#ffffff" stroke="#2F88FF" strokeWidth="0.00048" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
                <g id="SVGRepo_iconCarrier">
                  <rect width="48" height="48" fill="white" fillOpacity="0.01"></rect>
                  <path d="M32.9037 13.9271C31.2464 17.1587 27.8814 19.3701 24 19.3701C20.1185 19.3701 16.7536 17.1587 15.0963 13.9271C11.3982 16.659 9 21.0494 9 26C9 26.8177 9.06543 27.6201 9.19135 28.4023C9.45807 28.381 9.72775 28.3701 9.99996 28.3701C15.5228 28.3701 20 32.8473 20 38.3701C20 39.0664 19.9288 39.746 19.7934 40.4021C21.128 40.7913 22.5397 41 24 41C25.4603 41 26.8719 40.7913 28.2066 40.4021C28.0711 39.746 28 39.0664 28 38.3701C28 32.8473 32.4771 28.3701 38 28.3701C38.2722 28.3701 38.5419 28.381 38.8087 28.4023C38.9346 27.6201 39 26.8177 39 26C39 21.0494 36.6017 16.659 32.9037 13.9271Z" fill="#ffffff" stroke="#2F88FF" strokeWidth="0.00048" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M24 13C26.2091 13 28 11.2091 28 9C28 6.79086 26.2091 5 24 5C21.7909 5 20 6.79086 20 9C20 11.2091 21.7909 13 24 13Z" fill="#ffffff" stroke="#2F88FF" strokeWidth="0.00048" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9 43C11.2091 43 13 41.2091 13 39C13 36.7909 11.2091 35 9 35C6.79086 35 5 36.7909 5 39C5 41.2091 6.79086 43 9 43Z" fill="#ffffff" stroke="#2F88FF" strokeWidth="0.00048" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M39 43C41.2091 43 43 41.2091 43 39C43 36.7909 41.2091 35 39 35C36.7909 35 35 36.7909 35 39C35 41.2091 36.7909 43 39 43Z" fill="#ffffff" stroke="#2F88FF" strokeWidth="0.00048" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
              {/* Word behind the logo */}
              <span class="text-gray-600 pr-4 text-3xl font-bold">
                المحيط
              </span>
            </span>
          </span>
        </Link>
      </div>
      {/* SIDEBAR HEADER */}

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        {/* Sidebar Menu */}
        <nav>
          {/* Menu Group */}
          <div>
            <h3 className="mb-4 text-xs uppercase leading-[20px] text-gray-400">
              <span
                className={`menu-group-title ${sidebarToggle ? 'lg:hidden' : ''}`}
              >
                القائمة
              </span>

              <svg
                className={`mx-auto fill-current menu-group-icon ${sidebarToggle ? 'lg:block hidden' : 'hidden'}`}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z"
                  fill=""
                />
              </svg>
            </h3>

            <ul className="flex flex-col gap-4 mb-6">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className={`menu-item group ${
                      isActive(item.id) ? 'menu-item-active' : 'menu-item-inactive'
                    }`}
                                         onClick={() => {}}
                  >
                    <svg
                      className={isActive(item.id) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {item.icon.props.children}
                    </svg>

                    <span
                      className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                    >
                      {item.title}
                    </span>

                    {item.hasDropdown && (
                      <svg
                        className={`menu-item-arrow ${sidebarToggle ? 'lg:hidden' : ''} ${
                          isActive(item.id) ? 'menu-item-arrow-active' : 'menu-item-arrow-inactive'
                        }`}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                          stroke=""
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown Menu Start */}
                  {item.hasDropdown && (
                    <div
                      className={`overflow-hidden transform translate ${
                        isActive(item.id) ? 'block' : 'hidden'
                      }`}
                    >
                      <ul
                        className={`flex flex-col gap-1 mt-2 menu-dropdown pl-9 ${
                          sidebarToggle ? 'lg:hidden' : 'flex'
                        }`}
                      >
                        {/* Add dropdown items here if needed */}
                      </ul>
                    </div>
                  )}
                  {/* Dropdown Menu End */}
                </li>
              ))}
            </ul>
          </div>
        </nav>
        {/* Sidebar Menu */}
      </div>
    </aside>
  );
};

export default SideBar; 