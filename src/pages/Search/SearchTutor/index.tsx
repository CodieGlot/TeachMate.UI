import React, { useState, useEffect } from "react";
// import { Header } from "../../../layouts";
import { AppUser } from "../../../interfaces";
import { SearchService } from "../../../services";

export function SearchTutor() {
  const [displayName, setDisplayName] = useState<string>("");
  const [tutors, setTutors] = useState<AppUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedTutor, setExpandedTutor] = useState<number | null>(null); // State to manage expanded tutor details
  const sectionsPerPage = 3;
  const totalPages = Math.ceil(tutors.length / sectionsPerPage);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const data = await SearchService.searchTutor({ displayName });
        setTutors(data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };
    fetchTutors();
  }, [displayName]); // Fetch tutors whenever displayName changes

  const indexOfLastTutor = currentPage * sectionsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - sectionsPerPage;
  const currentTutors = tutors.slice(indexOfFirstTutor, indexOfLastTutor);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const toggleDetails = (index: number) => {
    setExpandedTutor(expandedTutor === index ? null : index); // Toggle expanded view
  };

  return (
    <>
      <div className="container mx-auto my-20 w-2/3">
        <form className="relative w-full flex max-w-md mx-auto lg:mx-0 lg:max-w-none mb-8">
          <input
            type="search"
            className="block w-full p-2.5 text-sm text-gray-900 bg-white border-2 border-violet-200 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Tutor ..."
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <button
            type="submit"
            className="p-2.5 text-sm font-medium text-violet-400 bg-white border-solid border-2 border-violet-200 rounded-r-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
            style={{ backgroundColor: 'bg-violet-400' }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 20 20" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19L13.65 13.65M11 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentTutors.map((tutor, index) => (
            <div
              key={index}
              className="my-10 relative w-full group max-w-md min-w-0 mx-auto break-words bg-white border shadow-2xl dark:bg-white-800 dark:border-white-700 rounded-xl"
            >
              <div className="pb-6">
                <div className="flex flex-wrap justify-center">
                  <div className="flex justify-center w-full">
                    <div className="relative">
                      <img
                        src={tutor.avatar}
                        className="dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-16 -ml-18 lg:-ml-16 max-w-[150px]"
                        alt={tutor.displayName}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2 mt-20 text-center">
                  <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
                    {tutor.displayName}
                  </h3>
                  <div className="flex flex-row justify-center w-full mx-auto space-x-2 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-400"
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
                    <div className="text-sm font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono text-xl">
                      {tutor.email}
                    </div>
                  </div>
                  <div className="w-full text-center">
                    <div className="flex justify-center pt-8 pb-0 lg:pt-4">
                      <div className="flex space-x-2">
                        {/* Social Media Links */}
                        <a
                          className="p-1 -m-1 text-gray-400 hover:text-amber-500 focus:outline-none focus-visible:ring-2 ring-primary"
                          href={"sdfjsdfj"}
                          rel="noopener"
                          aria-label={`${tutor.displayName} on Twitter`}
                          target="_blank"
                        >
                          <svg
                            className="w-6 h-6 overflow-visible fill-current"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                            ></path>
                          </svg>
                        </a>
                        <a
                          className="p-1 -m-1 text-gray-400 hover:text-amber-500 focus:outline-none focus-visible:ring-2 ring-primary"
                          href={"dsfjsfhudh"}
                          rel="noopener"
                          aria-label={`${tutor.displayName} on LinkedIn`}
                          target="_blank"
                        >
                          <svg
                            className="w-6 h-6 overflow-visible fill-current"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.137 1.45-2.137 2.945v5.661H9.35V9.003h3.415v1.561h.049c.476-.9 1.637-1.852 3.368-1.852 3.6 0 4.268 2.369 4.268 5.455v6.285zM5.337 7.433c-1.144 0-2.07-.928-2.07-2.073 0-1.144.926-2.071 2.07-2.071 1.144 0 2.071.927 2.071 2.071 0 1.145-.927 2.073-2.071 2.073zm1.778 13.019H3.559V9.003h3.556v11.449zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.778-.774 1.778-1.729V1.729C24 .774 23.204 0 22.225 0z"
                            ></path>
                          </svg>
                        </a>
                        <a
                          className="p-1 -m-1 text-gray-400 hover:text-amber-500 focus:outline-none focus-visible:ring-2 ring-primary"
                          href={"hfhsd"}
                          rel="noopener"
                          aria-label={`${tutor.displayName} on GitHub`}
                          target="_blank"
                        >
                          <svg
                            className="w-6 h-6 overflow-visible fill-current"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12.026 2c-5.509 0-9.974 4.49-9.974 10.045 0 4.436 2.865 8.195 6.839 9.527.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.109-1.465-1.109-1.465-.908-.624.069-.612.069-.612 1.003.073 1.531 1.051 1.531 1.051.892 1.54 2.341 1.095 2.91.838.092-.651.35-1.095.635-1.347-2.221-.256-4.555-1.117-4.555-4.977 0-1.1.388-1.998 1.026-2.702-.103-.257-.446-1.288.098-2.687 0 0 .84-.272 2.75 1.025A9.564 9.564 0 0112 6.818a9.54 9.54 0 012.504.34c1.91-1.297 2.749-1.025 2.749-1.025.545 1.399.202 2.43.1 2.687.639.704 1.025 1.602 1.025 2.702 0 3.87-2.337 4.718-4.566 4.97.36.311.68.926.68 1.866 0 1.347-.012 2.433-.012 2.765 0 .268.18.58.688.482A10.013 10.013 0 0022 12.045C22 6.49 17.535 2 12.026 2z"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* Toggle Details Button */}
                  <button
                    onClick={() => toggleDetails(index)}
                    className="mt-4 px-4 py-2 text-sm text-violet-500 bg-violet-200 rounded hover:bg-violet-300"
                  >
                    {expandedTutor === index ? "Hide Details" : "Show Details"}
                  </button>
                  {/* Details Section */}
                  {expandedTutor === index && (
                    <div className="mt-4 text-gray-600 dark:text-gray-300">
                      <p><strong>Bio:</strong> {tutor.displayName}</p>
                      {/* <p><strong>Qualifications:</strong> {tutor.displayName}</p>
                      <p><strong>Subjects:</strong> {tutor.displayName.join(", ")}</p> */}
                      {/* Add any other fields you want to show */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prevPage}
            className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p className="text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={nextPage}
            className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}