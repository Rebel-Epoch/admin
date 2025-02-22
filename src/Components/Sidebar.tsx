import { useState, useEffect } from "react";
import { RiCoupon3Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { IoShirt } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { GrNew } from "react-icons/gr";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const Sidebar = ({ selected }: { selected: (tab: string) => string }) => {
  const [selectedTab, setSelectedTab] = useState<string>("Dashboard");

  useEffect(() => {
    selected(selectedTab);
  }, [selectedTab]);

  return (
    <div className="h-full w-full relative dark">
      <div className="lg:hidden py-16 text-center">
        <button
          type="button"
          className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border border-gray-800 text-white text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-gray-950 focus:outline-none focus:bg-gray-900 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-sidebar-footer"
          aria-label="Toggle navigation"
          data-hs-overlay="#hs-sidebar-footer"
        >
          Open
        </button>
      </div>

      <div
        id="hs-sidebar-footer"
        className="hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-[15%] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform h-full hidden fixed top-0 start-0 bottom-0 z-[60] bg-white border-e border-gray-200 dark:bg-neutral-800 dark:border-neutral-700"
        role="dialog"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full ">
          <header className="p-4 flex justify-between items-center gap-x-2">
            <a
              className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
              href="#"
              aria-label="Brand"
            >
              Rebel Epoch
            </a>

            <div className="lg:hidden -me-2">
              <button
                type="button"
                className="flex justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-500 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                data-hs-overlay="#hs-sidebar-footer"
              >
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Close</span>
              </button>
            </div>
          </header>

          <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div
              className="hs-accordion-group pb-0 px-2  w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open
            >
              <ul className="space-y-1">
                <li>
                  <button
                    type="button"
                    className={`hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300 ${
                      selectedTab == "Dashboard" &&
                      "!bg-neutral-700 !text-neutral-300"
                    }`}
                    onClick={() => {
                      setSelectedTab("Dashboard");
                    }}
                  >
                    <MdOutlineSpaceDashboard />
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300 ${
                      selectedTab == "Orders" &&
                      "!bg-neutral-700 !text-neutral-300"
                    }`}
                    onClick={() => {
                      setSelectedTab("Orders");
                    }}
                  >
                    <GrNew />
                    Orders
                  </button>
                </li>
                <li className="hs-accordion">
                  <button
                    type="button"
                    className={`hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300 ${
                      selectedTab == "Users" &&
                      "!bg-neutral-700 !text-neutral-300"
                    }`}
                    onClick={() => {
                      setSelectedTab("Users");
                    }}
                  >
                    <FaRegUser />
                    Users
                  </button>
                </li>

                <li className="hs-accordion" id="account-accordion">
                  <button
                    type="button"
                    className={`hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300 ${
                      selectedTab == "Coupons" &&
                      "!bg-neutral-700 !text-neutral-300"
                    }`}
                    onClick={() => setSelectedTab("Coupons")}
                  >
                    <RiCoupon3Fill />
                    Coupons
                  </button>
                </li>

                <li className="hs-accordion" id="projects-accordion">
                  <button
                    type="button"
                    className={`hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300 ${
                      selectedTab == "Products" &&
                      "!bg-neutral-700 !text-neutral-300"
                    }`}
                    aria-expanded="true"
                    aria-controls="projects-accordion-sub-1-collapse-1"
                  >
                    <IoShirt />
                    Products
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                    <svg
                      className="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <div
                    id="projects-accordion-sub-1-collapse-1"
                    className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                    role="region"
                    aria-labelledby="projects-accordion"
                  >
                    <ul className="pt-1 ps-7 space-y-1">
                      <li>
                        <a
                          className={`flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300 ${
                            selectedTab == "All Products" &&
                            "!bg-neutral-700 !text-neutral-300"
                          }`}
                          href="#"
                          onClick={() => setSelectedTab("All Products")}
                        >
                          All products
                        </a>
                      </li>
                      <li>
                        <a
                          className={`flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300 ${
                            selectedTab == "New Products" &&
                            "!bg-neutral-700 !text-neutral-300"
                          }`}
                          href="#"
                          onClick={() => setSelectedTab("New Product")}
                        >
                          Add New Product
                        </a>
                      </li>
                      <li>
                        <a
                          className={`flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300 ${
                            selectedTab == "Top Selling Products" &&
                            "!bg-neutral-700 !text-neutral-300"
                          }`}
                          href="#"
                          onClick={() => setSelectedTab("Top Selling Products")}
                        >
                          Top Selling Products
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <button
                    type="button"
                    className={`hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300 ${
                      selectedTab == "Returns & Refunds" &&
                      "!bg-neutral-700 !text-neutral-300"
                    }`}
                    onClick={() => setSelectedTab("Returns & Refunds")}
                  >
                    <HiOutlineReceiptRefund />
                    Returns & Refunds
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-500 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300 ${
                      selectedTab == "Style Of The Month" &&
                      "!bg-neutral-700 !text-neutral-300"
                    }`}
                    onClick={() => setSelectedTab("Style Of The Month")}
                  >
                    <IoIosStar />
                    Style Of The Month
                  </button>
                </li>
              </ul>
            </div>
          </nav>

          <footer className="mt-auto p-2 border-t border-gray-200 dark:border-neutral-700">
            <div className="hs-dropdown [--strategy:absolute] [--auto-close:inside] relative w-full inline-flex">
              <button
                id="hs-sidebar-footer-example-with-dropdown"
                type="button"
                className="w-full inline-flex shrink-0 items-center gap-x-2 p-2 text-start text-sm text-gray-800 rounded-md hover:bg-gray-500 focus:outline-none dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
              >
                <img
                  className="shrink-0 size-5 rounded-full"
                  src="https://images.unsplash.com/photo-1734122415415-88cb1d7d5dc0?q=80&w=320&h=320&auto=format&fit=facearea&facepad=3&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Avatar"
                />
                Sanya Malhotra
                <svg
                  className="shrink-0 size-3.5 ms-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m7 15 5 5 5-5" />
                  <path d="m7 9 5-5 5 5" />
                </svg>
              </button>
              <div
                className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-neutral-900 dark:border-neutral-700"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="hs-sidebar-footer-example-with-dropdown"
              >
                <div className="p-1">
                  <a
                    className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="#"
                  >
                    Settings
                  </a>
                  <a
                    className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="#"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
