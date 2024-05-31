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
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="relative font-[sans-serif] w-max mx-auto">
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-semibold border-none outline-none bg-blue-800 hover:bg-white-900 active:bg-white-800"
              onClick={toggleNotification}
            >
              <i
                className="fa-regular fa-bell fa-lg"
                style={{ color: "#74C0FC" }}
              />
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

          <a href="/profile" className="group block flex-shrink-0">
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
