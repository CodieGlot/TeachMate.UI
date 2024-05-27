import { useEffect, useState } from "react";
import { InboundMessage } from "ably";
import { ably } from "../../../../config";
import { AuthService, NotificationService } from "../../../../services";
import { PushNotification } from "../../../../interfaces";
import { differenceInMinutes, differenceInHours } from "date-fns";

export function User() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<PushNotification[]>([]);

  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        try {
          const response = await NotificationService.getLatestNotifications();

          setNotifications(response.data);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };

      fetchNotifications();
    }
  }, []);

  useEffect(() => {
    if (user) {
      const channel = ably.channels.get(`Notification:${user.id}`);
      const handleNewNotification = (message: InboundMessage) => {
        setNotifications((prevNotifications) => {
          const newNotification = JSON.parse(message.data);
          const updatedNotifications = [newNotification, ...prevNotifications];
          if (updatedNotifications.length > 4) {
            updatedNotifications.pop();
          }
          return updatedNotifications;
        });
      };

      channel.subscribe("Notification", handleNewNotification);

      return () => {
        channel.unsubscribe("Notification", handleNewNotification);
      };
    }
  }, [user]);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const formatNotificationTime = (date: Date) => {
    const now = new Date();
    const minutes = differenceInMinutes(now, date);

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else {
      const hours = differenceInHours(now, date);
      return `${hours} hours ago`;
    }
  };

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
          <div className="relative font-[sans-serif] w-max mx-auto">
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-semibold border-none outline-none bg-blue-800 hover:bg-blue-900 active:bg-blue-800"
              onClick={toggleNotification}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                className="cursor-pointer fill-[#fff]"
                viewBox="0 0 371.263 371.263"
              >
                <path
                  d="M305.402 234.794v-70.54c0-52.396-33.533-98.085-79.702-115.151.539-2.695.838-5.449.838-8.204C226.539 18.324 208.215 0 185.64 0s-40.899 18.324-40.899 40.899c0 2.695.299 5.389.778 7.964-15.868 5.629-30.539 14.551-43.054 26.647-23.593 22.755-36.587 53.354-36.587 86.169v73.115c0 2.575-2.096 4.731-4.731 4.731-22.096 0-40.959 16.647-42.995 37.845-1.138 11.797 2.755 23.533 10.719 32.276 7.904 8.683 19.222 13.713 31.018 13.713h72.217c2.994 26.887 25.869 47.905 53.534 47.905s50.54-21.018 53.534-47.905h72.217c11.797 0 23.114-5.03 31.018-13.713 7.904-8.743 11.797-20.479 10.719-32.276-2.036-21.198-20.958-37.845-42.995-37.845a4.704 4.704 0 0 1-4.731-4.731zM185.64 23.952c9.341 0 16.946 7.605 16.946 16.946 0 .778-.12 1.497-.24 2.275-4.072-.599-8.204-1.018-12.336-1.138-7.126-.24-14.132.24-21.078 1.198-.12-.778-.24-1.497-.24-2.275.002-9.401 7.607-17.006 16.948-17.006zm0 323.358c-14.431 0-26.527-10.3-29.342-23.952h58.683c-2.813 13.653-14.909 23.952-29.341 23.952zm143.655-67.665c.479 5.15-1.138 10.12-4.551 13.892-3.533 3.773-8.204 5.868-13.353 5.868H59.89c-5.15 0-9.82-2.096-13.294-5.868-3.473-3.772-5.09-8.743-4.611-13.892.838-9.042 9.282-16.168 19.162-16.168 15.809 0 28.683-12.874 28.683-28.683v-73.115c0-26.228 10.419-50.719 29.282-68.923 18.024-17.425 41.498-26.887 66.528-26.887 1.198 0 2.335 0 3.533.06 50.839 1.796 92.277 45.929 92.277 98.325v70.54c0 15.809 12.874 28.683 28.683 28.683 9.88 0 18.264 7.126 19.162 16.168z"
                  data-original="#000000"
                />
              </svg>
            </button>
            {isNotificationOpen && (
              <div className="absolute shadow-lg bg-white py-2 z-[1000] min-w-full rounded-lg w-[410px] max-h-[500px] overflow-auto">
                <div className="flex items-center justify-between my-4 px-4">
                  <p className="text-xs text-blue-500 cursor-pointer">
                    Clear all
                  </p>
                  <p className="text-xs text-blue-500 cursor-pointer">
                    Mark as read
                  </p>
                </div>
                <ul className="divide-y">
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className="py-4 px-4 flex items-center hover:bg-gray-50 text-black text-sm cursor-pointer"
                    >
                      <div className="ml-6">
                        <h3 className="text-sm text-[#333] font-semibold">
                          {notification.creatorDisplayName
                            ? `You have a new message from ${notification.creatorDisplayName}`
                            : "System Notification"}
                        </h3>
                        <p className="text-xs text-gray-400 mt-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-blue-500 leading-3 mt-2">
                          {formatNotificationTime(notification.createdAt)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-sm px-4 mt-6 mb-4 inline-block text-blue-500 cursor-pointer">
                  View all Notifications
                </p>
              </div>
            )}
          </div>

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
                  {user.email}
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
