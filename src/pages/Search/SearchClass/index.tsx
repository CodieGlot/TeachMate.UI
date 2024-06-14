import React, { useState, useEffect } from "react";
import { SearchService } from "../../../services";
import { SearchClassDto } from "../../../common/dtos";
import { LearningModule } from "../../../interfaces";

interface SearchClassProps {
  searchQuery: string | undefined;
}

export function SearchClass({ searchQuery }: SearchClassProps) {
  const [searchParams, setSearchParams] = useState<SearchClassDto>({
    titleOrDesc: searchQuery || "",
    subject: 0,
    gradeLevel: null,
    startOpenDate: null,
    endOpenDate: null,
    maximumLearners: null,
    moduleType: null,
    numOfWeeks: null,
  });

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

  const indexOfLastClass = currentPage * sectionsPerPage;
  const indexOfFirstClass = indexOfLastClass - sectionsPerPage;
  const currentClasses = classes.slice(indexOfFirstClass, indexOfLastClass);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const toggleDetails = (index: number) => {
    setExpandedClass(expandedClass === index ? null : index);
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="container mx-auto my-20 w-2/3">
      <div>
        <form className="relative w-full flex max-w-md mx-auto lg:mx-0 lg:max-w-none mb-8">
          <div className="relative w-full flex rounded-lg overflow-hidden bg-gradient-to-r from-sky-400 to-indigo-600/30 p-0.5 shadow-lg">
            <input
              type="text"
              name="titleOrDesc"
              className="block w-full p-2.5 text-xs text-gray-900 bg-white border-2 border-violet-200 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
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
              <div className="text-center">
                <h3 className="mb-2 text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                  {classItem.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Subject: {classItem.subject}
                </p>

                <div className="flex justify-center items-center mt-4 space-x-2">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Grade Level: {classItem.gradeLevel}
                  </span>
                </div>

                <p className="mt-4 text-xs font-medium text-gray-700 dark:text-gray-300">
                  <span className="block">
                    Start Date:{" "}
                    <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                      {classItem.startDate}
                    </span>
                  </span>
                </p>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  <span className="block">
                    End Date:{" "}
                    <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                      {classItem.endDate}
                    </span>
                  </span>
                </p>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  <span className="block">
                    Max Learners:{" "}
                    <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                      {classItem.maximumLearners}
                    </span>
                  </span>
                </p>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  <span className="block">
                    Module Type:{" "}
                    <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                      {classItem.id}
                    </span>
                  </span>
                </p>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  <span className="block">
                    Number of Weeks:{" "}
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {classItem.id}
                    </span>
                  </span>
                </p>
                <button
                  onClick={() => toggleDetails(index)}
                  className="mt-4 px-4 py-2 text-xs text-violet-500 bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300"
                >
                  {expandedClass === index ? "Hide Details" : "Show Details"}
                </button>
                {expandedClass === index && (
                  <div className="mt-4 space-y-2">
                    <button className="block w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
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
  );
}
