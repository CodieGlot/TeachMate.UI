import { useEffect, useRef, useState } from 'react';
import { AdminService } from "../../../services";
import { TypeErrorSystem, UserRole } from '../../../common/enums';
import { SearchReportSystemDto } from '../../../common/dtos/Search/SearchReportSystemDto';
import { Report } from '../../../interfaces';

export function ReportSystem() {

  const mainContentRef = useRef<HTMLDivElement>(null); // Specify HTMLDivElement type
  const [list, setList] = useState<Report[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<SearchReportSystemDto>({
    typeErrorSystem: null,
    status: null,
  });

  // const getUsernameById = (id: string): string => {
  //   return UserRole[roleCode];
  // };

  const fetchReportSystem = async (query: SearchReportSystemDto) => {
    try {
      const data = await AdminService.searchReportSystem(query);
      setList(data);
    } catch (error) {
      console.error('Error fetching app users:', error);
    }
  };

  const fetchAllReportSystem = async () => {
    try {
      const data = await AdminService.getAllReportSystem();
      setList(data);
    } catch (error) {
      console.error('Error fetching app users:', error);
    }
  };

  useEffect(() => {

    // Gọi API để lấy thông tin người dùng
    fetchAllReportSystem();
  }, []);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedQuery: SearchReportSystemDto = {
      ...searchQuery,
      [name]: value || null,
    };
    setSearchQuery(updatedQuery);

    // Check if the search value is empty
    if (value === "") {
      await fetchAllReportSystem();
    } else {
      // Convert the value to enum if it is a valid enum value
      const typeErrorSystem = (Object.values(TypeErrorSystem) as string[]).includes(value) ? value as TypeErrorSystem : null;

      // Perform search based on displayName or username
      const searchResult = await AdminService.searchReportSystem({
        ...searchQuery,
        typeErrorSystem,
      });
      setList(searchResult);
    }
  };

  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const updatedQuery: SearchReportSystemDto = {
      ...searchQuery,
      status: value === "All" ? null : parseInt(value),
    };
    setSearchQuery(updatedQuery);
    fetchReportSystem(updatedQuery);
  };

  // const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { checked } = event.target;
  //   setSelectAll(checked);
  //   if (checked) {
  //     setSelectedUsers(list.map(user => user.id));
  //   } else {
  //     setSelectedUsers([]);
  //   }
  // };

  // const handleUserSelect = (event: React.ChangeEvent<HTMLInputElement>, userId: string) => {
  //   const { checked } = event.target;
  //   if (checked) {
  //     setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, userId]);
  //   } else {
  //     setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter(id => id !== userId));
  //   }
  // };

  // const handleUpdateStatus = async () => {
  //   try {
  //     // Get the selected users' details
  //     const selectedUserDetails = list.filter(user => selectedUsers.includes(user.id));

  //     //console.log('Selected user details:', selectedUserDetails);
  //     // Toggle the isDisabled status for each selected user
  //     await Promise.all(selectedUserDetails.map(user => AdminService.updateStatus({ id: user.id })));

  //     // Refresh the user list after updating status
  //     await fetchAllAppUsers();

  //     // Clear selected users and reset select all checkbox
  //     setSelectedUsers([]);
  //     setSelectAll(false);
  //   } catch (error) {
  //     console.error('Error updating status:', error);
  //   }
  // };

  // const handleUserRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = event.target;
  //   const updatedQuery: SearchUserDto = {
  //     ...searchQuery,
  //     userRole: value === "All" ? null : parseInt(value),
  //   };
  //   setSearchQuery(updatedQuery);
  //   await fetchAppUsers(updatedQuery);
  // };

  return (
    <body>
      <div ref={mainContentRef}
        className="z-0 ml-16 bg-gray-100 min-h-screen w-full lg:w-4/5 overflow-y-auto transition-all duration-200 ease-in-out
    ">
        <div className="flex flex-wrap mx-3 mb-5">
          <div className="w-full max-w-full px-3 mb-6  mx-auto">
            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
              <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                {/* card header  */}
                <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                  <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                    <span className="mr-3 font-semibold text-dark">Manage Report System</span>
                  </h3>
                  <div className="flex items-center space-x-3">
                    <select
                      name="userRole"
                      className="ml-3 p-2 rounded-full border border-gray-300"
                      onChange={handleStatusChange}
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                  {/* Search */}
                  <form className="flex items-center w-full mt-2 p-4">
                    <div className="relative w-full flex items-center">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <i className="fas fa-search text-gray-200"></i>
                      </span>
                      <input
                        type="text"
                        name="type"
                        className="pl-10 pr-4 py-2 rounded-full border border-gray-300 w-full text-sm placeholder-gray-400"
                        placeholder="Search by Type..."
                        onChange={handleSearch}
                      />
                      {/* <button
                        type="button"
                        className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-full"
                        onClick={handleUpdateStatus}
                      >
                        Update Status
                      </button> */}
                    </div>
                  </form>
                </div>
                {/* end card header  */}
                {/* card body  */}
                <div className="flex-auto block py-8 pt-6 px-9">
                  <div className="overflow-x-auto">
                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                      <thead className="align-bottom">
                        <tr className="font-semibold text-[0.95rem] text-secondary-dark">

                          <th className="pb-3 text-start min-w-[100px]">USERNAME</th>
                          <th className="pb-3 text-end min-w-[100px]">TYPE ERROR</th>
                          <th className="pb-3 text-end min-w-[100px]">TITLE</th>
                          <th className="pb-3 text-end min-w-[175px]">DESCRIPTION</th>
                          <th className="pb-3 pr-12 text-end min-w-[75px]">STATUS</th>
                          {/* <th className="pb-3 text-end min-w-[50px]">
                            <span className="mr-2">All</span>
                            <input
                              type="checkbox"
                              className="form-checkbox"
                              checked={selectAll}
                              onChange={handleSelectAll}
                            />
                          </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((report) => (
                          <tr key={report.id} className="border-b border-dashed last:border-b-0">
                            <td className="p-3 pl-0">
                              <div className="flex items-center">
                                <div className="flex flex-col justify-start">
                                  <a href="javascript:void(0)" className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                                    {report.userId}
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 pr-0 text-end">
                              <span className="font-semibold text-light-inverse text-md/normal">{report.reportSystem?.typeErrorSystem}</span>
                            </td>
                            <td className="p-3 pr-0 text-end">
                              <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                {report.title}
                              </span>
                            </td>
                            <td className="p-3 pr-0 text-end">
                              <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                                {report.description}
                              </span>
                            </td>
                            <td className="p-3 pr-0 text-end">
                              <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                                {report.status}
                              </span>
                            </td>
                            {/* <td className="p-3 pr-0 text-end">
                              <input
                                type="checkbox"
                                name={`selectUser-${user.id}`}
                                className="form-checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={(e) => handleUserSelect(e, user.id)}
                              />
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body >
  );

}