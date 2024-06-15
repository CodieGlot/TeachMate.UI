import React, { useState, useEffect } from "react";
import { SearchService } from "../../../services";
import { SearchClassDto } from "../../../common/dtos";
import { LearningModule } from "../../../interfaces";
import { Subject } from "../../../common/enums";
import { ModuleType } from "../../../common/enums";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const getSubjectString = (subjectCode: number): string => {
  return Subject[subjectCode];
};
// const subCategories: string[] = [
const generateSubjectFilters = () => {
  // Convert the enum to an array of { value, label } objects
  const subjectOptions = Object.keys(Subject)
    .filter((key) => !isNaN(Number(key))) // Filter out the enum names, keep only the values
    .map((subjectCode) => ({
      value: Number(subjectCode),
      label: getSubjectString(Number(subjectCode)),
      checked: false, // Default to unchecked
    }));

  // Return the filter object similar to the 'color' example
  return {
    id: 'subject',
    name: 'Subject',
    options: subjectOptions,
  };
};

// Example usage:
const subjectFilters = generateSubjectFilters();
// ]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  subjectFilters //Filter subject truyền vào mảng
  ,
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
interface SearchClassProps {
  searchQuery: string | undefined;
}

export function SearchClass({ searchQuery }: SearchClassProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState<SearchClassDto>({   // use state là biến để lưu ban đầu và được thay đổi trong quá trình code bằng hàm set
    titleOrDesc: searchQuery || "",
    subject: 0,
    gradeLevel: null,
    startOpenDate: null,
    endOpenDate: null,
    maximumLearners: null,
    moduleType: null,
    numOfWeeks: null,
  });

  const getModuleType = (moduleTypeCode: number): string => {
    return ModuleType[moduleTypeCode];
  };

  useEffect(() => {
    if (searchQuery) {
      setSearchParams((prevParams) => ({
        ...prevParams,
        titleOrDesc: searchQuery,
      }));
    }
  }, [searchQuery]);

  const [classes, setClasses] = useState<LearningModule[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedClass, setExpandedClass] = useState<number | null>(null);

  const sectionsPerPage = 3;
  const totalPages = Math.ceil(classes.length / sectionsPerPage);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await SearchService.searchClass(searchParams);
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, [searchParams]);

  const viewLearningModuleDetail = async (id: string) => {
    try {

      navigate("/view-learning-module-detail?id=" + id, { state: id })
    } catch (error) {
      console.error("Error fetching learning module:", error);

    }
  }
  const indexOfLastClass = currentPage * sectionsPerPage;
  const indexOfFirstClass = indexOfLastClass - sectionsPerPage;
  const currentClasses = classes.slice(indexOfFirstClass, indexOfLastClass);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { //dùng để gọi làm on click
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const subjectValue = Number(event.target.value);
    setSearchParams((prevParams) => ({
      ...prevParams,
      subject: prevParams.subject === subjectValue ? 0 : subjectValue, // Toggle subject value
    }));
  };
  // const isInputElement = (target: EventTarget): target is HTMLInputElement => {
  //   return (target as HTMLInputElement).type !== undefined;
  // };    //Buoc 1*****************

  // Generic change handler with specific types
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value, type } = e.target;

  //   let updatedValue: string | number | boolean | null;

  //   if (type === 'checkbox' && isInputElement(e.target)) {
  //     // For checkboxes, determine if it's checked and convert value to the corresponding type
  //     updatedValue = e.target.checked ? Number(value) : null;
  //   } else if (type === 'number') {
  //     updatedValue = value === '' ? null : Number(value);
  //   } else {
  //     // For other inputs, use the value directly, converting to the appropriate type if necessary
  //     updatedValue = value;
  //   }

  //   setSearchParams((prevParams) => ({
  //     ...prevParams,
  //     [name]: updatedValue,
  //   }));
  // };    // Buoc 2********************
  const toggleDetails = (index: number) => {
    setExpandedClass(expandedClass === index ? null : index);
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="">
      <div>
        {/* Mobile filter dialog */}
        <Transition show={mobileFiltersOpen}>
          <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 z-40 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {/* <h3 className="sr-only">Categories</h3> */}
                    {/* <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul> */}

                    {filters.map((section) => ( //map giống foreach (var filter in filters)
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </DisclosureButton>
                            </h3>
                            <DisclosurePanel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onChange={                             // Buoc3 *********************
                                        section.id === 'subject' ? handleSubjectChange : undefined
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-0">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          {({ focus }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                focus ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {/* <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul> */}

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
              {/* NOI DUNG CHINH */}
              <div className="lg:col-span-3">
                <div className="container mx-auto my-5">
                  <div>
                    <form className="relative w-full flex max-w-md mx-auto lg:mx-0 lg:max-w-none mb-8">
                      <div className="relative w-full flex rounded-lg overflow-hidden bg-gradient-to-r from-sky-400 to-indigo-600/30 p-0.5 shadow-lg">
                        <input
                          type="text"
                          name="titleOrDesc"
                          className="block w-full p-2.5 text-sm text-gray-900 bg-white border-2 border-violet-200 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Search by any attribute..."
                          value={searchParams.titleOrDesc || ""}
                          onChange={handleSearchChange}
                        />
                        <button
                          type="button"
                          className="p-2.5 text-xs font-medium text-violet-400 bg-white border-solid border-2 border-violet-200 rounded-r-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
                          onClick={() => setSearchParams({ ...searchParams, titleOrDesc: searchParams.titleOrDesc })}
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19L13.65 13.65M11 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <span className="sr-only">Search</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {currentClasses.map((classItem, index) => (
                      <div
                        key={index}
                        className="relative w-full group max-w-md min-w-0 mx-auto break-words bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-xl transition-transform transform hover:scale-105 hover:shadow-2xl"
                      >
                        <div className="p-6">
                          <h3 className="text-lg text-indigo-500 font-bold">
                            {classItem.title}
                          </h3>
                          <p className="text-sm font-semibold text-gray-500">Title</p>
                          <p className="mt-3 text-4xl font-bold text-black ">$0</p>
                          <p className="tesxt-sm font-semibold text-gray-500">Per month</p>

                          <hr className="my-4" />

                          <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              <span className="block">
                                Subject: {getSubjectString(classItem.subject)}
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              <span className="block">
                                Grade Level:{" "}
                                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                                  {classItem.gradeLevel}
                                </span>
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              <span className="block">
                                Start Date:{" "}
                                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                                  {classItem.startDate}
                                </span>
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              <span className="block">
                                End Date:{" "}
                                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                                  {classItem.endDate}
                                </span>
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              <span className="block">
                                Max Learners:{" "}
                                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                                  {classItem.maximumLearners}
                                </span>
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              <span className="block">
                                Module Type: {getModuleType(classItem.moduleType)}
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              <span className="block">
                                Number of Weeks:{" "}
                                <span className="font-semibold text-gray-900 dark:text-gray-100">
                                  {classItem.numOfWeeks}
                                </span>
                              </span>
                            </p>
                          </div>

                          <button
                            onClick={() => toggleDetails(index)}
                            className="mt-4 w-full rounded-lg border-2 border-indigo-400 px-10 py-2 text-sm text-indigo-500 font-semibold hover:bg-indigo-400 hover:text-white"
                          >
                            {expandedClass === index ? "Hide Details" : "Show Details"}
                          </button>
                          {expandedClass === index && (
                            <div className="mt-4 space-y-2">
                              <button className="block w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600" onClick={() => viewLearningModuleDetail(classItem.id.toString())}>
                                Join
                              </button>
                              <button className="block w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                                Try Now
                              </button>
                              <button className="block w-full px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600">
                                Give Feedback
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>


                  {/* Pagination */}
                  <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                      onClick={prevPage}
                      className={`px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 ${isFirstPage ? 'disabled:opacity-50' : ''}`}
                      disabled={isFirstPage}
                    >
                      Previous
                    </button>
                    <p className="text-gray-600">
                      Page {currentPage} of {totalPages}
                    </p>
                    <button
                      onClick={nextPage}
                      className={`px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 ${isLastPage ? 'disabled:opacity-50' : ''}`}
                      disabled={isLastPage}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
}