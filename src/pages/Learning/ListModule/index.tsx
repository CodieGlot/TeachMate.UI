import { Subject } from "../../../common/enums";
import { LearningModule } from "../../../interfaces/Learning/LearningModule";
import { Header } from "../../../layouts";
import { LearningModuleService } from "../../../services/LearningModuleService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
// const url = window.location.href;
// const id = url.substring(url.lastIndexOf("/") + 1);
// console.log(id);
// const learningModule: LearningModule = await LearningModuleService.getLearningModuleById(id)

export function ListModule() {
  useEffect(() => {
    AOS.init();
  }, []);
  const [list, setList] = useState<LearningModule[]>([]);
  const navigate = useNavigate();
  //write tạm ở đây
  const getSubjectString = (subjectCode: number): string => {
    return Subject[subjectCode];
  };

  const viewLearningModuleDetail = async (id: string) => {
    try {

      navigate("/view-learning-module-detail?id=" + id, { state: id })
    } catch (error) {
      console.error("Error fetching learning module:", error);

    }
  }

  useEffect(() => {
    const fetchLearningModules = async () => {
      try {
        const data = await LearningModuleService.getAllCreatedLearningModule();
        setList(data); // Cập nhật state list với dữ liệu từ API
      } catch (error) {
        console.error("Error fetching learning modules:", error);
      }
    };
    fetchLearningModules(); // Gọi hàm để lấy dữ liệu khi component được render
  }, []); // [] đảm bảo hàm chỉ chạy một lần sau khi component được render
  return (
    <>
      <div data-aos="zoom-in-left" data-aos-duration="1000">
        <Header />
        <section className="learning-module">
          <div className="w-1/2 mx-auto">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400">Your created classes</span></h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here are your classes</p>
          </div>
          <div className="flex flex-wrap w-full mx-auto justify-center">
            {list.map((module, index) =>
              <div key={index} className="m-10 w-80 rounded-lg border-2 border-gray-100 py-8 px-6 shadow-lg shadow-gray-200">
                <p className="text-lg text-indigo-500 font-bold">{module.title}</p>
                <p className="text-sm font-semibold text-gray-500">Title</p>
                <p className="mt-3 text-4xl font-bold">$0</p>
                <p className="tesxt-sm font-semibold text-gray-500">Per month</p>
                <button className="mt-4 w-full rounded-lg border-2 border-indigo-400 px-10 py-2 text-sm text-indigo-500 font-semibold hover:bg-indigo-400 hover:text-white"
                  onClick={() => viewLearningModuleDetail(module.id.toString())}
                >View details</button>
                <ul className="mt-4 space-y-2 font-semibold">
                  <li className="flex items-center space-x-4"><span className="h-2 w-2 rounded-full bg-black"></span><span>Duration: {module.duration}</span></li>
                  <li className="flex items-center space-x-4"><span className="h-2 w-2 rounded-full bg-black"></span><span>Start Date: {module.startDate}</span></li>
                  <li className="flex items-center space-x-4"><span className="h-2 w-2 rounded-full bg-black"></span><span>End Date: {module.endDate}</span></li>
                </ul>
                <hr className="my-4" />
                <ul className="space-y-2 font-semibold">
                  <li className="flex items-center space-x-2 text-rose-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" stroke-width="2">
                      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    <span><i>Desc:</i> {module.description}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" stroke-width="2">
                      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    <span>Subject: {getSubjectString(module.subject)}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" stroke-width="2">
                      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    <span>Maximum Learners: {module.maximumLearners} learners</span>
                  </li>
                </ul>
              </div>
            )}


          </div>

        </section>
      </div>
    </>
  );
}