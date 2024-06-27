import { useEffect, useState, } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { LearningModule } from "../../../interfaces/Learning/LearningModule";
import { LearningModuleService } from "../../../services/LearningModuleService";
import { AuthService } from "../../../services";
export function LearnerPayment() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id")
    const user = AuthService.getCurrentUser();
    const [learningModule, setLearningModule] = useState<LearningModule>();

    useEffect(() => {
        const viewLearningModuleDetail = async () => {
            try {
                const data = await LearningModuleService.getLearningModuleById(id);
                setLearningModule(data)

            } catch (error) {
                console.error("Error fetching learning module:", error);

            }
        };
        viewLearningModuleDetail(); // Gọi hàm để lấy dữ liệu khi component được render
    }, []); // [] đảm bảo hàm chỉ chạy một lần sau khi component được render

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center font-bold text-xl uppercase">Payment</h1>
            <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8">
                <h1 className="font-bold text-2xl my-4 text-center text-blue-600">TeachMate System</h1>
                <hr className="mb-2" />
                <div className="flex justify-between mb-6">
                    <h1 className="text-lg font-bold">Invoice</h1>
                    <div className="text-gray-700">
                        <div>Date: 01/05/2023</div>
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="text-lg font-bold mb-2">Bill To:</h2>
                    <div className="text-gray-700 mb-2">{user?.displayName}</div>
                    <h2 className="text-lg font-bold mb-2"><strong>Class:</strong> </h2>
                    <div className="text-gray-700 mb-2">{learningModule?.title}</div>
                    <h2 className="text-lg font-bold mb-2">Tutor:</h2>
                    <div className="text-gray-700 mb-2">{learningModule?.tutor?.displayName}</div>
                    <h2 className="text-lg font-bold mb-2">Schedule:</h2>
                    <div className="text-gray-700 mb-2">{learningModule?.moduleType != 0 && ("Custom")} : Every</div>
                    <div className="flex justify-center items-center">
                        <h2 className="text-lg font-bold mb-2 mr-2">Cost:</h2>
                        <div className="text-gray-700 mb-2"> {learningModule?.price} $</div>
                    </div>


                </div>
                <table className="w-full mb-8">

                </table>
                <div className="text-gray-700 mb-2">Thank you for your business!</div>
                <div className="text-gray-700 text-sm">Please remit payment within 30 days.</div>
            </div>

        </div>
    );
}

export default LearnerPayment;
