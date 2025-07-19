import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const SideBar = ({ sidebarToggle }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      id: "Dashboard",
      title: "لوحة التحكم",
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
      link: "/",
      hasDropdown: false,
    },
    {
      id: "selling",
      title: "المبيعات",
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
      link: "/selling",
      hasDropdown: false,
    },
        {
      id: "Invoices",
      title: "المشتريات",
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
      link: "/invoices",
      hasDropdown: false,
    },
 {
      id: "prpducts",
      title: "المنتجات",
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
      link: "/products",
      hasDropdown: false,
    },
     {
      id: "inventory",
      title: "المخزون",
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
      link: "/inventory",
      hasDropdown: false,
    },
    {
      id: "warehouses",
      title: "المخازن",
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
      link: "/warehouses",
      hasDropdown: false,
    },
    {
      id: "clients",
      title: "العملاء",
      icon: (
        <svg
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M14 12.25C13.2583 12.25 12.5333 12.0301 11.9166 11.618C11.2999 11.206 10.8193 10.6203 10.5355 9.93506C10.2516 9.24984 10.1774 8.49584 10.3221 7.76841C10.4668 7.04098 10.8239 6.3728 11.3484 5.84835C11.8728 5.3239 12.541 4.96675 13.2684 4.82206C13.9958 4.67736 14.7498 4.75162 15.4351 5.03545C16.1203 5.31928 16.706 5.79993 17.118 6.41661C17.5301 7.0333 17.75 7.75832 17.75 8.5C17.75 9.49456 17.3549 10.4484 16.6517 11.1517C15.9484 11.8549 14.9946 12.25 14 12.25ZM14 6.25C13.555 6.25 13.12 6.38196 12.75 6.62919C12.38 6.87643 12.0916 7.22783 11.9213 7.63896C11.751 8.0501 11.7064 8.5025 11.7932 8.93895C11.8801 9.37541 12.0943 9.77632 12.409 10.091C12.7237 10.4057 13.1246 10.62 13.561 10.7068C13.9975 10.7936 14.4499 10.749 14.861 10.5787C15.2722 10.4084 15.6236 10.12 15.8708 9.75003C16.118 9.38002 16.25 8.94501 16.25 8.5C16.25 7.90326 16.0129 7.33097 15.591 6.90901C15.169 6.48705 14.5967 6.25 14 6.25Z"
              fill="#667085"
            ></path>{" "}
            <path
              d="M21 19.25C20.8019 19.2474 20.6126 19.1676 20.4725 19.0275C20.3324 18.8874 20.2526 18.6981 20.25 18.5C20.25 16.55 19.19 15.25 14 15.25C8.81 15.25 7.75 16.55 7.75 18.5C7.75 18.6989 7.67098 18.8897 7.53033 19.0303C7.38968 19.171 7.19891 19.25 7 19.25C6.80109 19.25 6.61032 19.171 6.46967 19.0303C6.32902 18.8897 6.25 18.6989 6.25 18.5C6.25 13.75 11.68 13.75 14 13.75C16.32 13.75 21.75 13.75 21.75 18.5C21.7474 18.6981 21.6676 18.8874 21.5275 19.0275C21.3874 19.1676 21.1981 19.2474 21 19.25Z"
              fill="#667085"
            ></path>{" "}
            <path
              d="M8.31999 13.06H7.99999C7.20434 12.9831 6.47184 12.5933 5.96361 11.9763C5.45539 11.3593 5.21308 10.5657 5.28999 9.77001C5.36691 8.97436 5.75674 8.24186 6.37373 7.73363C6.99073 7.22541 7.78434 6.9831 8.57999 7.06001C8.68201 7.0644 8.78206 7.08957 8.87401 7.13399C8.96596 7.1784 9.04787 7.24113 9.11472 7.31831C9.18157 7.3955 9.23196 7.48553 9.26279 7.58288C9.29362 7.68023 9.30425 7.78285 9.29402 7.88445C9.28379 7.98605 9.25292 8.08449 9.20331 8.17374C9.15369 8.26299 9.08637 8.34116 9.00548 8.40348C8.92458 8.46579 8.83181 8.51093 8.73286 8.53613C8.6339 8.56133 8.53084 8.56605 8.42999 8.55001C8.23479 8.53055 8.03766 8.55062 7.85038 8.60904C7.6631 8.66746 7.48952 8.76302 7.33999 8.89001C7.18812 9.01252 7.06216 9.16403 6.96945 9.33572C6.87673 9.50741 6.81913 9.69583 6.79999 9.89001C6.77932 10.0866 6.79797 10.2854 6.85488 10.4747C6.91178 10.6641 7.0058 10.8402 7.13144 10.9928C7.25709 11.1455 7.41186 11.2716 7.58673 11.3638C7.76159 11.456 7.95307 11.5125 8.14999 11.53C8.47553 11.5579 8.80144 11.4808 9.07999 11.31C9.24973 11.2053 9.45413 11.1722 9.64824 11.2182C9.84234 11.2641 10.0102 11.3853 10.115 11.555C10.2198 11.7248 10.2528 11.9292 10.2069 12.1233C10.1609 12.3174 10.0397 12.4853 9.86999 12.59C9.40619 12.8858 8.86998 13.0484 8.31999 13.06Z"
              fill="#667085"
            ></path>{" "}
            <path
              d="M3 18.5C2.80189 18.4974 2.61263 18.4176 2.47253 18.2775C2.33244 18.1374 2.25259 17.9481 2.25 17.75C2.25 15.05 2.97 13.25 6.5 13.25C6.69891 13.25 6.88968 13.329 7.03033 13.4697C7.17098 13.6103 7.25 13.8011 7.25 14C7.25 14.1989 7.17098 14.3897 7.03033 14.5303C6.88968 14.671 6.69891 14.75 6.5 14.75C4.15 14.75 3.75 15.5 3.75 17.75C3.74741 17.9481 3.66756 18.1374 3.52747 18.2775C3.38737 18.4176 3.19811 18.4974 3 18.5Z"
              fill="#667085"
            ></path>{" "}
          </g>
        </svg>
      ),
      link: "/clients",
      hasDropdown: false,
    },

    {
      id: "Suppliers",
      title: "الموردين",
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
      link: "/suppliers",
      hasDropdown: false,
    },
    {
      id: "cashiers",
      title: "الكاشيرز",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="7" width="18" height="13" rx="2" fill="#667085"/>
          <rect x="7" y="3" width="10" height="4" rx="1" fill="#667085"/>
          <circle cx="8.5" cy="13.5" r="1.5" fill="#fff"/>
          <rect x="12" y="12" width="5" height="3" rx="1" fill="#fff"/>
        </svg>
      ),
      link: "/cashiers",
      hasDropdown: false,
      adminOnly: true,
    },
  ];

  // Filter menuItems: show cashier only for admin
  const filteredMenuItems = menuItems.filter(item => {
    if (item.id === 'cashiers' && (!user || user.role !== 'admin')) return false;
    return true;
  });

  const isActive = (itemId) => {
    if (itemId === "Dashboard") {
      return location.pathname === "/";
    }
    return (
      location.pathname === menuItems.find((item) => item.id === itemId)?.link
    );
  };

  return (
    <aside
      className={`sidebar fixed left-0 top-0 z-9999 flex h-screen w-[290px] flex-col overflow-y-hidden border-l border-gray-200 bg-white px-5 dark:border-gray-800 dark:bg-black lg:static lg:translate-x-0 ${
        sidebarToggle ? "translate-x-0 lg:w-[90px]" : "-translate-x-full"
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div
        className={`flex items-center gap-2 pt-8 sidebar-header pb-7 ${
          sidebarToggle ? "justify-center" : "justify-between"
        }`}
      >
        <Link to="/">
          <span
            className={`logo ${
              sidebarToggle ? "hidden" : ""
            } relative flex items-center`}
          >
            {/* Custom SVG Logo */}
            <span className="relative flex items-center">
              <svg
                width="48"
                height="48"
                viewBox="-4.8 -4.8 57.60 57.60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ minWidth: 48, minHeight: 48 }}
              >
                <g
                  id="SVGRepo_bgCarrier"
                  strokeWidth="0"
                  transform="translate(1.44,1.44), scale(0.94)"
                >
                  <rect
                    x="-4.8"
                    y="-4.8"
                    width="57.60"
                    height="57.60"
                    rx="0"
                    fill="#2F88FF"
                  />
                </g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#fffafa"
                  strokeWidth="1.824"
                >
                  <rect
                    width="48"
                    height="48"
                    fill="white"
                    fillOpacity="0.01"
                  ></rect>
                  <path
                    d="M32.9037 13.9271C31.2464 17.1587 27.8814 19.3701 24 19.3701C20.1185 19.3701 16.7536 17.1587 15.0963 13.9271C11.3982 16.659 9 21.0494 9 26C9 26.8177 9.06543 27.6201 9.19135 28.4023C9.45807 28.381 9.72775 28.3701 9.99996 28.3701C15.5228 28.3701 20 32.8473 20 38.3701C20 39.0664 19.9288 39.746 19.7934 40.4021C21.128 40.7913 22.5397 41 24 41C25.4603 41 26.8719 40.7913 28.2066 40.4021C28.0711 39.746 28 39.0664 28 38.3701C28 32.8473 32.4771 28.3701 38 28.3701C38.2722 28.3701 38.5419 28.381 38.8087 28.4023C38.9346 27.6201 39 26.8177 39 26C39 21.0494 36.6017 16.659 32.9037 13.9271Z"
                    fill="#ffffff"
                    stroke="#2F88FF"
                    strokeWidth="0.00048"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 13C26.2091 13 28 11.2091 28 9C28 6.79086 26.2091 5 24 5C21.7909 5 20 6.79086 20 9C20 11.2091 21.7909 13 24 13Z"
                    fill="#ffffff"
                    stroke="#2F88FF"
                    strokeWidth="0.00048"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 43C11.2091 43 13 41.2091 13 39C13 36.7909 11.2091 35 9 35C6.79086 35 5 36.7909 5 39C5 41.2091 6.79086 43 9 43Z"
                    fill="#ffffff"
                    stroke="#2F88FF"
                    strokeWidth="0.00048"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M39 43C41.2091 43 43 41.2091 43 39C43 36.7909 41.2091 35 39 35C36.7909 35 35 36.7909 35 39C35 41.2091 36.7909 43 39 43Z"
                    fill="#ffffff"
                    stroke="#2F88FF"
                    strokeWidth="0.00048"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
                <g id="SVGRepo_iconCarrier">
                  <rect
                    width="48"
                    height="48"
                    fill="white"
                    fillOpacity="0.01"
                  ></rect>
                  <path
                    d="M32.9037 13.9271C31.2464 17.1587 27.8814 19.3701 24 19.3701C20.1185 19.3701 16.7536 17.1587 15.0963 13.9271C11.3982 16.659 9 21.0494 9 26C9 26.8177 9.06543 27.6201 9.19135 28.4023C9.45807 28.381 9.72775 28.3701 9.99996 28.3701C15.5228 28.3701 20 32.8473 20 38.3701C20 39.0664 19.9288 39.746 19.7934 40.4021C21.128 40.7913 22.5397 41 24 41C25.4603 41 26.8719 40.7913 28.2066 40.4021C28.0711 39.746 28 39.0664 28 38.3701C28 32.8473 32.4771 28.3701 38 28.3701C38.2722 28.3701 38.5419 28.381 38.8087 28.4023C38.9346 27.6201 39 26.8177 39 26C39 21.0494 36.6017 16.659 32.9037 13.9271Z"
                    fill="#ffffff"
                    stroke="#2F88FF"
                    strokeWidth="0.00048"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 13C26.2091 13 28 11.2091 28 9C28 6.79086 26.2091 5 24 5C21.7909 5 20 6.79086 20 9C20 11.2091 21.7909 13 24 13Z"
                    fill="#ffffff"
                    stroke="#2F88FF"
                    strokeWidth="0.00048"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 43C11.2091 43 13 41.2091 13 39C13 36.7909 11.2091 35 9 35C6.79086 35 5 36.7909 5 39C5 41.2091 6.79086 43 9 43Z"
                    fill="#ffffff"
                    stroke="#2F88FF"
                    strokeWidth="0.00048"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M39 43C41.2091 43 43 41.2091 43 39C43 36.7909 41.2091 35 39 35C36.7909 35 35 36.7909 35 39C35 41.2091 36.7909 43 39 43Z"
                    fill="#ffffff"
                    stroke="#2F88FF"
                    strokeWidth="0.00048"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
              {/* Word behind the logo */}
              <span className="text-gray-600 pr-4 text-3xl font-bold">
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
                className={`menu-group-title ${
                  sidebarToggle ? "lg:hidden" : ""
                }`}
              >
                القائمة
              </span>

              <svg
                className={`mx-auto fill-current menu-group-icon ${
                  sidebarToggle ? "lg:block hidden" : "hidden"
                }`}
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
              {filteredMenuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className={`menu-item group ${
                      isActive(item.id)
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                                         onClick={() => {}}
                  >
                    <svg
                      className={
                        isActive(item.id)
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {item.icon.props.children}
                    </svg>

                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "lg:hidden" : ""
                      }`}
                    >
                      {item.title}
                    </span>

                    {item.hasDropdown && (
                      <svg
                        className={`menu-item-arrow ${
                          sidebarToggle ? "lg:hidden" : ""
                        } ${
                          isActive(item.id)
                            ? "menu-item-arrow-active"
                            : "menu-item-arrow-inactive"
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
                        isActive(item.id) ? "block" : "hidden"
                      }`}
                    >
                      <ul
                        className={`flex flex-col gap-1 mt-2 menu-dropdown pl-9 ${
                          sidebarToggle ? "lg:hidden" : "flex"
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
