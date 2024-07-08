import React, { useEffect, useRef, useState } from 'react';
import { AdminService } from "../../../services";
import { ReportStatus, UserReportType } from '../../../common/enums';
import { SearchReportUserDto, UpdateReportStatusDto } from '../../../common/dtos';
//import { UpdateReportStatusDto } from '../../../common/dtos/Report/UpdateReportStatusDto';
import { Report } from '../../../interfaces';

export function UserSystem() {
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<Report[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedReport, setSelectedReport] = useState<number[]>([]);
  //const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<'list' | 'detail'>('list');
  const [selectedReportDetail, setSelectedReportDetail] = useState<Report | null>(null);

  const [searchQuery, setSearchQuery] = useState<SearchReportUserDto>({
    userReportType: null,
    reportStatus: null,
  });

  const getStatus = (num: number): string => {
    return ReportStatus[num];
  };

  const getTypeErrorSystemName = (num: number | undefined): string => {
    return num !== undefined ? UserReportType[num] : 'Unknown';
  };

  const fetchUserReport = async (query: SearchReportUserDto) => {
    try {
      const data = await AdminService.searchReportUser(query);
      setList(data);
    } catch (error) {
      console.error('Error fetching system reports:', error);
    }
  };

  const fetchAllUserReport = async () => {
    try {
      const data = await AdminService.getAllReportUser();
      setList(data);
    } catch (error) {
      console.error('Error fetching all system reports:', error);
    }
  };

  useEffect(() => {
    fetchAllUserReport();
  }, []);

  const handleTypeError = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const updatedQuery: SearchReportUserDto = {
      ...searchQuery,
      userReportType: value === "All" ? null : parseInt(value),
    };
    setSearchQuery(updatedQuery);
    await fetchUserReport(updatedQuery);
  };

  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const updatedQuery: SearchReportUserDto = {
      ...searchQuery,
      reportStatus: value === "All" ? null : parseInt(value),
    };
    setSearchQuery(updatedQuery);
    await fetchUserReport(updatedQuery);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setSelectAll(checked);
    if (checked) {
      setSelectedReport(list.map(report => report.id));
    } else {
      setSelectedReport([]);
    }
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLInputElement>, reportId: number) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedReport(prevSelectedReport => [...prevSelectedReport, reportId]);
    } else {
      setSelectedReport(prevSelectedReport => prevSelectedReport.filter(id => id !== reportId));
    }
  };

  const handleEditClick = async (reportId: number) => {
    try {
      const reportDetail = await AdminService.getReportByID(reportId);
      setSelectedReportDetail(reportDetail);
      //setSelectedReportId(reportId);
      setSelectedTab('detail');
    } catch (error) {
      console.error('Error fetching report detail:', error);
    }
  };

  const handleStatusUpdate = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = parseInt(event.target.value);
    if (selectedReportDetail) {
      setSelectedReportDetail(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleCloseTab = () => {
    setSelectedTab('list');
    setSelectedReportDetail(null);
  };

  const handleConfirmUpdate = async () => {
    // Logic to confirm and update report details
    if (selectedReportDetail) {
      const updateReportStatusDto: UpdateReportStatusDto = {
        id: selectedReportDetail.id,
        reportStatus: selectedReportDetail.status,
      };
      try {
        await AdminService.updateStatusReport(updateReportStatusDto);
        // Optionally perform other actions after confirmation
      } catch (error) {
        console.error('Error updating report status:', error);
      }
    }
    handleCloseTab(); // Close the tab after confirmation
    await fetchUserReport(searchQuery);
  };

  return (
    <div ref={mainContentRef} className="z-0 ml-16 bg-gray-100 min-h-screen w-full lg:w-4/5 overflow-y-auto transition-all duration-200 ease-in-out">
      <div className="flex flex-wrap mx-3 mb-5">
        <div className="w-full max-w-full px-3 mb-6 mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              {/* card header */}
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">Manage User System</span>
                </h3>
                <div className="flex items-center space-x-3">
                  <select
                    name="typeErrorSystem"
                    className="ml-3 p-2 rounded-full border border-gray-300"
                    onChange={handleTypeError}
                  >
                    <option value="All">All Type</option>
                    {Object.keys(UserReportType)
                      .filter(key => isNaN(Number(key)))
                      .map((key) => (
                        <option key={key} value={UserReportType[key as keyof typeof UserReportType]}>
                          {getTypeErrorSystemName(UserReportType[key as keyof typeof UserReportType])}
                        </option>
                      ))}
                  </select>
                  <select
                    name="reportStatus"
                    className="ml-3 p-2 rounded-full border border-gray-300"
                    onChange={handleStatusChange}
                  >
                    <option value="All">All Status</option>
                    {Object.keys(ReportStatus)
                      .filter(key => isNaN(Number(key)))
                      .map((key) => (
                        <option key={key} value={ReportStatus[key as keyof typeof ReportStatus]}>
                          {getStatus(ReportStatus[key as keyof typeof ReportStatus])}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              {/* end card header */}
              {/* card body */}
              <div className="flex-auto block py-8 pt-6 px-9">
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                      <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                        <th className="pb-3 text-start min-w-[50px]">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th className="pb-3 text-start min-w-[100px]">USERNAME</th>
                        <th className="pb-3 text-end min-w-[100px]">TYPE ERROR</th>
                        <th className="pb-3 text-end min-w-[100px]">REPORTED USER</th>
                        <th className="pb-3 text-end min-w-[75px]">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((report) => (
                        <tr key={report.id} className="border-b border-dashed last:border-b-0">
                          <td className="p-3 pl-0">
                            <input
                              type="checkbox"
                              name={`selectUser-${report.id}`}
                              className="form-checkbox"
                              checked={selectedReport.includes(report.id)}
                              onChange={(e) => handleUserSelect(e, report.id)}
                            />
                          </td>
                          <td className="p-3 pl-0">
                            <div className="flex items-center">
                              <div className="flex flex-col justify-start">
                                <a className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                                  {report.user?.displayName}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <span className="font-semibold text-light-inverse text-md/normal">
                              {getTypeErrorSystemName(report.userReport?.userReportType)}
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <span className="font-semibold text-light-inverse text-md/normal">
                              {report.userReport?.reportedUser?.displayName}
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <span className="font-semibold text-light-inverse text-md/normal">
                              {getStatus(report.status)}
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => handleEditClick(report.id)}>
                              Edit
                            </button> */}
                            <div className="w-full h-15 flex items-center justify-center cursor-pointer">
                              <div
                                className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-black-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-while-50 dark:bg-while-700 dark:text-black dark:hover:text-black dark:shadow-none group">
                                {/* <span
                                  className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-gradient-to-r group-hover:h-full"
                                ></span> */}
                                <span
                                  className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    fill="none"
                                    className="w-5 h-5 text-black-400"
                                  >
                                    <path
                                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                                      stroke-width="2"
                                      stroke-linejoin="round"
                                      stroke-linecap="round"
                                    ></path>
                                  </svg>
                                </span>
                                <span
                                  className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    fill="none"
                                    className="w-5 h-5 text-black-400"
                                  >
                                    <path
                                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                                      stroke-width="2"
                                      stroke-linejoin="round"
                                      stroke-linecap="round"
                                    ></path>
                                  </svg>
                                </span>
                                <span
                                  className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-black dark:group-hover:text-black" onClick={() => handleEditClick(report.id)}
                                >View More</span>
                              </div>
                            </div>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* end card body */}
            </div>
          </div>
        </div>
      </div>
      {/* Modal for Report Detail */}
      {selectedTab === 'detail' && selectedReportDetail && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Report Detail</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500"><strong>Title:</strong> {selectedReportDetail.title}</p>
                      <p className="text-sm text-gray-500"><strong>Description:</strong> {selectedReportDetail.description}</p>
                      <p className="text-sm text-gray-500"><strong>Status:</strong></p>
                      <select value={selectedReportDetail.status.toString()} onChange={handleStatusUpdate} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                        {Object.keys(ReportStatus)
                          .filter(key => !isNaN(Number(key)))
                          .map(key => (
                            <option key={key} value={key}>
                              {ReportStatus[parseInt(key)]}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleConfirmUpdate} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Confirm
                </button>
                <button onClick={handleCloseTab} className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
