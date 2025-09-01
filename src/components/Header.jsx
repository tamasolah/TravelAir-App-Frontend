import { Fragment, useMemo } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  const navigation = useMemo(
    () => [
      { name: "Acasă", href: "/acasa" },
      { name: "Oferte", href: "/oferte" },
      { name: "Rezervările mele", href: "/rezervarile-mele" },
      { name: "Despre noi", href: "/despre-noi" },
      { name: "Contact", href: "/contact" },
    ],
    []
  );

  const isActive = (href) =>
    href === "/acasa" ? pathname === "/acasa" : pathname.startsWith(href);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Disclosure
      as="nav"
      className="bg-gradient-to-r from-blue-700 to-indigo-700 shadow dark:from-gray-900 dark:to-gray-800"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">

              <Link to="/acasa" className="flex items-center">
                <img className="h-8 w-8 mr-2" src="/logo192.png" alt="TravelAir" />
                <span className="text-white font-bold text-lg">TravelAir</span>
              </Link>

              <div className="hidden md:flex md:space-x-6">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        active
                          ? "text-white underline underline-offset-4"
                          : "text-white hover:text-gray-300",
                        "px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white"
                  title="Comută tema"
                >
                  {theme === "dark" ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>

                {user && (
                  <Menu as="div" className="relative ml-1">
                    <div>
                      <Menu.Button className="flex text-sm rounded-full focus:outline-none">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.username || "User"
                          )}`}
                          alt="Profil"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? "bg-gray-100 dark:bg-gray-800" : "",
                                "block px-4 py-2 text-sm text-gray-700 dark:text-gray-100"
                              )}
                            >
                              {user.username}
                            </span>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? "bg-gray-100 dark:bg-gray-800" : "",
                                "block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100"
                              )}
                            >
                              Deconectare
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}

                <div className="flex md:hidden">
                  <Disclosure.Button className="text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden px-4 pb-3 pt-2">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    isActive(item.href)
                      ? "text-white underline underline-offset-4"
                      : "text-white hover:text-gray-300",
                    "block px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
