import { useEffect, useState, } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { LearningModule } from "../../../interfaces/Learning/LearningModule";
import { LearningModuleService } from "../../../services/LearningModuleService";
import { AuthService, PaymentService } from "../../../services";
import { PaymentOrder } from "../../../interfaces";
import ModalForPayment from "../../Modal/ModalForPayment";
export function LearnerPayment() {
    const [activeTab, setActiveTab] = useState<string>('profile');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [learningModule, setLearningModule] = useState<LearningModule>();
    const [paymentList, setPaymentList] = useState<PaymentOrder[]>();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id")
    const user = AuthService.getCurrentUser();
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };


    const HandldePayForClass = async () => {
        try {
            await PaymentService.payForClass(UnPaidPayment?.id)
            window.location.reload();
        } catch (error) {
            console.error("Error Pay For class", error);

        }
    }
    const [UnPaidPayment, setUnPaidPayment] = useState<PaymentOrder>()
    useEffect(() => {
        const listUnpaidPayment = async () => {
            try {
                const data = await LearningModuleService.getLearningModuleById(id);
                setLearningModule(data)
                const data1 = await PaymentService.getAllUnPaidByModuleIdByLearnerId(id);
                setUnPaidPayment(data1)
              
            } catch (error) {
                console.error("Error fetching learning module:", error);

            }
        };
        const listAllPayment = async () => {
            try {
                const data2 = await PaymentService.getPaymentOrderByModuleIdByLearnerId(id);
                setPaymentList(data2)
            } catch (error) {
                console.error("Error fetching learning module:", error);

            }
        };
        listUnpaidPayment(); // Gọi hàm để lấy dữ liệu khi component được render
        listAllPayment();
    }, []); // [] đảm bảo hàm chỉ chạy một lần sau khi component được render
    return (
        <>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" role="tablist">
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'profile' ? 'border-blue-500 text-blue-600' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                            id="profile-tab"
                            onClick={() => handleTabClick('profile')}
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            aria-selected={activeTab === 'profile'}
                        >
                            Current Payment
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'dashboard' ? 'border-blue-500 text-blue-600' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                            id="dashboard-tab"
                            onClick={() => handleTabClick('dashboard')}
                            type="button"
                            role="tab"
                            aria-controls="dashboard"
                            aria-selected={activeTab === 'dashboard'}
                        >
                            History Payment
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'settings' ? 'border-blue-500 text-blue-600' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                            id="settings-tab"
                            onClick={() => handleTabClick('settings')}
                            type="button"
                            role="tab"
                            aria-controls="settings"
                            aria-selected={activeTab === 'settings'}
                        >
                            Settings
                        </button>
                    </li>
                    <li role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'contacts' ? 'border-blue-500 text-blue-600' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                            id="contacts-tab"
                            onClick={() => handleTabClick('contacts')}
                            type="button"
                            role="tab"
                            aria-controls="contacts"
                            aria-selected={activeTab === 'contacts'}
                        >
                            Contacts
                        </button>
                    </li>
                </ul>
            </div>
            <div id="default-tab-content">
                <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'profile' ? '' : 'hidden'}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p> */}
                    <div className="container mx-auto p-4">
                        <h1 className="text-center font-bold text-xl uppercase">Payment</h1>
                        {UnPaidPayment ? (
                            <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8">
                                <h1 className="font-bold text-2xl my-4 text-center text-blue-600">TeachMate System</h1>
                                <hr className="mb-2" />
                                <div className="flex justify-between mb-6">
                                    <h1 className="text-lg font-bold">Invoice</h1>
                                    <div className="text-gray-700">
                                        <div>Date: 01/05/2023</div>
                                        <div>Id: {UnPaidPayment?.id}</div>
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <h2 className="text-lg font-bold mb-2">Bill To:</h2>
                                    <div className="text-gray-700 mb-2">{user?.displayName}</div>
                                    <h2 className="text-lg font-bold mb-2"><strong>Class:</strong></h2>
                                    <div className="text-gray-700 mb-2">{learningModule?.title}</div>
                                    <h2 className="text-lg font-bold mb-2">Tutor:</h2>
                                    <div className="text-gray-700 mb-2">{learningModule?.tutor?.displayName}</div>
                                    <h2 className="text-lg font-bold mb-2">Schedule:</h2>
                                    <div className="text-gray-700 mb-2">{learningModule?.moduleType !== 0 && "Custom"} : Every</div>
                                    <div className="flex justify-center items-center">
                                        <h2 className="text-lg font-bold mb-2 mr-2">Cost:</h2>
                                        <div className="text-gray-700 mb-2">{learningModule?.price} $</div>
                                    </div>
                                    <button
                                    onClick={ HandldePayForClass}
                                        type="submit"
                                        className="mt-2 flex w-full items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-white text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Pay now
                                    </button>
                                        
                                </div>
                                <div className="text-gray-700 mb-2">Thank you for your business!</div>
                                <div className="text-gray-700 text-sm">Please remit payment within 30 days.</div>
                            </div>
                        ) : (
                            <div>Not found Order Payment</div>
                        )}


                    </div>
                </div>
                <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'dashboard' ? '' : 'hidden'}`} id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                    <section className="container px-4 mx-auto">
                        <div className="flex flex-col">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-800">
                                                <tr>
                                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center gap-x-3">
                                                            <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                            <button className="flex items-center gap-x-2">
                                                                <span>Invoice</span>
                                                                <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                                    <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                                    <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Date</th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Customer</th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Price</th>
                                                    <th scope="col" className="relative py-3.5 px-4"><span className="sr-only">Actions</span></th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                {paymentList?.map(paymentList => (
                                                    <tr key={paymentList.id}>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                            <div className="inline-flex items-center gap-x-3">
                                                                <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                                <span>{paymentList.id}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"></td>
                                                        {paymentList.paymentStatus === 1 ? <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                                <h2 className="text-sm font-normal">Paid</h2>
                                                            </div>
                                                        </td> : <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>

                                                                <h2 className="text-sm font-normal">Pending</h2>
                                                            </div>
                                                        </td>}

                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                            <div className="flex items-center gap-x-2">
                                                                <img className="object-cover w-8 h-8 rounded-full" src={user?.avatar} alt="" />
                                                                <div>
                                                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{user?.displayName}</h2>
                                                                    <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{user?.email}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{learningModule?.price} $</td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div className="flex items-center gap-x-6">
                                                                <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                                                    Archive
                                                                </button>
                                                                <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                                    Download
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>))}
                                                {/* Repeat for other rows */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414-1.414L10.586 9l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5z" clipRule="evenodd" />
                                </svg>
                                <span>Next</span>
                            </a>
                            <div className="items-center hidden lg:flex gap-x-3">
                                <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md bg-blue-100/60 dark:bg-gray-800">1</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">2</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">3</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">...</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">12</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">13</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">14</a>
                            </div>
                            <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                                <span> Previous</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 1.414L9.414 11l4.293 4.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </section>

                </div>
                <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'settings' ? '' : 'hidden'}`} id="settings" role="tabpanel" aria-labelledby="settings-tab">
                    <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div>
                <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'contacts' ? '' : 'hidden'}`} id="contacts" role="tabpanel" aria-labelledby="contacts-tab">
                    <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div>
            </div>
        </>
    );
};

export default LearnerPayment;
