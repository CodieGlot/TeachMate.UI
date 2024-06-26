import React from 'react';

export function SetPrice() {
    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="text-center">
                            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Set Your Pricing</h2>
                        </div>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="pricing_model" className="block text-sm font-medium text-gray-700">
                                    Pricing Model
                                </label>
                                <select
                                    id="pricing_model"
                                    name="pricing_model"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="per_hour">Per Hour</option>
                                    <option value="per_session">Per Session</option>
                                    <option value="per_course">Per Course</option>
                                    <option value="subscription_monthly">Subscription (Monthly)</option>
                                    <option value="subscription_annual">Subscription (Annual)</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="base_price" className="block text-sm font-medium text-gray-700">
                                    Base Price
                                </label>
                                <input
                                    type="number"
                                    id="base_price"
                                    name="base_price"
                                    className="mt-1 block w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    placeholder="$"
                                />
                            </div>

                            <div>
                                <label htmlFor="discounts" className="block text-sm font-medium text-gray-700">
                                    Discounts (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="discounts"
                                    name="discounts"
                                    className="mt-1 block w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    placeholder="e.g., 10% off for early sign-ups"
                                />
                            </div>

                            <div>
                                <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                                    Currency
                                </label>
                                <select
                                    id="currency"
                                    name="currency"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="usd">USD</option>
                                    <option value="eur">EUR</option>
                                    <option value="gbp">GBP</option>
                                    <option value="aud">AUD</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                                        Availability
                                    </label>
                                    <div className="mt-1 grid grid-cols-2 gap-4">
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" name="availability" value="online" className="text-indigo-500 focus:ring-indigo-500 h-4 w-4" />
                                            <span>Online</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" name="availability" value="offline" className="text-indigo-500 focus:ring-indigo-500 h-4 w-4" />
                                            <span>Offline</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="session_duration" className="block text-sm font-medium text-gray-700">
                                        Session Duration (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        id="session_duration"
                                        name="session_duration"
                                        className="mt-1 block w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        placeholder="30"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                                >
                                    Save Settings
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SetPrice;
