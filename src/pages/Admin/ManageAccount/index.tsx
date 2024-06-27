import { useEffect, useRef, useState } from 'react';
import { AdminService } from "../../../services";
import { AppUser } from "../../../interfaces";
import { SearchUserDto } from "../../../common/dtos";
import { UserRole } from '../../../common/enums';

export function ManageAccount() {

  const mainContentRef = useRef<HTMLDivElement>(null); // Specify HTMLDivElement type
  const [list, setList] = useState<AppUser[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<SearchUserDto>({
    displayNameorUsername: null,
    userRole: null, // Adjust default value based on your enums
    isDisable: null,
  });

  const getUserRole = (roleCode: number): string => {
    return UserRole[roleCode];
  };

  const fetchAppUsers = async (query: SearchUserDto) => {
    try {
      const data = await AdminService.searchUser(query);
      setList(data);
    } catch (error) {
      console.error('Error fetching app users:', error);
    }
  };

  const fetchAllAppUsers = async () => {
    try {
      const data = await AdminService.getAllUser();
      setList(data);
    } catch (error) {
      console.error('Error fetching app users:', error);
    }
  };

  useEffect(() => {

    // Gọi API để lấy thông tin người dùng
    fetchAllAppUsers();
  }, []);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedQuery: SearchUserDto = {
      ...searchQuery,
      [name]: value || null,
    };
    setSearchQuery(updatedQuery);

    // Check if the search value is empty
    if (value === "") {
      await fetchAllAppUsers();
    } else {
      // Perform search based on displayName or username
      const searchResult = await AdminService.searchUser({
        ...searchQuery,
        displayNameorUsername: value,
      });
      setList(searchResult);
    }
  };

  const handleDropdownChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const updatedQuery: SearchUserDto = {
      ...searchQuery,
      [name]: value === "All" ? null : value === "Disabled" ? true : false,
    };
    setSearchQuery(updatedQuery);
    fetchAppUsers(updatedQuery);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setSelectAll(checked);
    if (checked) {
      setSelectedUsers(list.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLInputElement>, userId: string) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, userId]);
    } else {
      setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter(id => id !== userId));
    }
  };

  const handleUpdateStatus = async () => {
    try {
      // Get the selected users' details
      const selectedUserDetails = list.filter(user => selectedUsers.includes(user.id));

      //console.log('Selected user details:', selectedUserDetails);
      // Toggle the isDisabled status for each selected user
      await Promise.all(selectedUserDetails.map(user => AdminService.updateStatus({ id: user.id })));

      // Refresh the user list after updating status
      await fetchAllAppUsers();

      // Clear selected users and reset select all checkbox
      setSelectedUsers([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleUserRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const updatedQuery: SearchUserDto = {
      ...searchQuery,
      userRole: value === "All" ? null : parseInt(value),
    };
    setSearchQuery(updatedQuery);
    await fetchAppUsers(updatedQuery);
  };

  return (
    <body>
      <div ref={mainContentRef}
        className="p-5 z-0 ml-16 bg-gray-100 min-h-screen w-full lg:w-4/5 overflow-y-auto transition-all duration-200 ease-in-out
    ">
        <div className="flex flex-wrap mx-3 mb-5">
          <div className="w-full max-w-full px-3 mb-6  mx-auto">
            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
              <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                {/* card header  */}
                <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                  <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                    <span className="mr-3 font-semibold text-dark">Manage Account</span>
                  </h3>
                  <div className="flex items-center space-x-3">
                    <select
                      name="userRole"
                      className="ml-3 p-2 rounded-full border border-gray-300"
                      onChange={handleUserRoleChange}
                    >
                      <option value="All">All Role</option>
                      {Object.keys(UserRole)
                        //.filter(key => !isNaN(Number(key))) // Lọc ra các khóa có thể chuyển đổi thành số
                        .filter(key => UserRole[key as keyof typeof UserRole] === UserRole.TUTOR || UserRole[key as keyof typeof UserRole] === UserRole.LEARNER) // Chỉ lấy Learner và Tutor
                        .map((key) => (
                          <option key={key} value={UserRole[key as keyof typeof UserRole]}>
                            {getUserRole(UserRole[key as keyof typeof UserRole])}
                          </option>
                        ))}
                    </select>

                    <select
                      name="isDisable"
                      className="ml-3 p-2 rounded-full border border-gray-300"
                      onChange={handleDropdownChange}
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Disabled">Disabled</option>
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
                        name="displayName"
                        className="pl-10 pr-4 py-2 rounded-full border border-gray-300 w-full text-sm placeholder-gray-400"
                        placeholder="Search by Name or Username..."
                        onChange={handleSearch}
                      />

                      <button
                        type="button"
                        className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-full"
                        onClick={handleUpdateStatus}
                      >
                        Update Status
                      </button>
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
                          <th className="pb-3 text-start min-w-[175px]">NAME</th>
                          <th className="pb-3 text-end min-w-[100px]">USERNAME</th>
                          <th className="pb-3 text-end min-w-[100px]">ROLE</th>
                          <th className="pb-3 pr-12 text-end min-w-[175px]">STATUS</th>
                          <th className="pb-3 text-end min-w-[50px]">
                            <span className="mr-2">All</span>
                            <input
                              type="checkbox"
                              className="form-checkbox"
                              checked={selectAll}
                              onChange={handleSelectAll}
                            />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((user) => (
                          <tr key={user.id} className="border-b border-dashed last:border-b-0">
                            <td className="p-3 pl-0">
                              <div className="flex items-center">
                                <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                  <img src={user.avatar} className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt="" />
                                </div>
                                <div className="flex flex-col justify-start">
                                  <a href="javascript:void(0)" className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                                    {user.displayName}
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 pr-0 text-end">
                              <span className="font-semibold text-light-inverse text-md/normal">{user.username}</span>
                            </td>
                            <td className="p-3 pr-0 text-end">
                              <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                {getUserRole(user.userRole)}
                              </span>
                            </td>
                            <td className="p-3 pr-12 text-end">
                              <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                                {user.isDisabled ? 'Disabled' : 'Active'}
                              </span>
                            </td>
                            <td className="p-3 pr-0 text-end">
                              <input
                                type="checkbox"
                                name={`selectUser-${user.id}`}
                                className="form-checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={(e) => handleUserSelect(e, user.id)}
                              />
                            </td>
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