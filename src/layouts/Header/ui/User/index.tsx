import { AuthService } from "../../../../services";

export function User() {
  const user = AuthService.getCurrentUser();
  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  };
  return (
    <>
      {user === null ? (
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="/auth/login"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Log in <span aria-hidden="true">→</span>
          </a>
        </div>
      ) : (
        <div className="flex">
          <a href="#" className="group block flex-shrink-0">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {user.displayName}
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  {user.userRole}
                </p>
              </div>
            </div>
          </a>
          <div className="border-l mx-4" />
          <button
            onClick={handleLogout}
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 pt-1"
          >
            Log out <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </>
  );
}
