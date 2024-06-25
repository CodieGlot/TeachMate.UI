import React from 'react';

export const UserSummary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-slate-50 p-5 m-2 rounded-md flex justify-between items-center shadow">
        <div>
          <h3 className="font-bold">Total Users</h3>
          <p className="text-gray-500">100</p>
        </div>
        <i className="fa-solid fa-users p-4 bg-gray-200 rounded-md"></i>
      </div>
      <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
        <div>
          <h3 className="font-bold">New Users</h3>
          <p className="text-gray-500">50</p>
        </div>
        <i className="fa-solid fa-user-plus p-4 bg-gray-200 rounded-md"></i>
      </div>
      <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
        <div>
          <h3 className="font-bold">Total Orders</h3>
          <p className="text-gray-500">150</p>
        </div>
        <i className="fa-solid fa-clipboard p-4 bg-gray-200 rounded-md"></i>
      </div>
      <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
        <div>
          <h3 className="font-bold">New Orders</h3>
          <p className="text-gray-500">20</p>
        </div>
        <i className="fa-solid fa-clipboard-list p-4 bg-gray-200 rounded-md"></i>
      </div>
    </div>
  );
};
