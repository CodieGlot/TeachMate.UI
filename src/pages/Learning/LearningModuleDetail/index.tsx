import { Subject } from "../../../common/enums";
import { LearningModule } from "../../../interfaces/Learning/LearningModule";
import { Header } from "../../../layouts";
import { LearningModuleService } from "../../../services/LearningModuleService";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// const url = window.location.href;
// const id = url.substring(url.lastIndexOf("/") + 1);
// console.log(id);
// const learningModule: LearningModule = await LearningModuleService.getLearningModuleById(id)

export function LearningModuleDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id")
  const [learningModule, setLearningModule] = useState<LearningModule>();
  //write tạm ở đây
  const getSubjectString = (subjectCode: number): string => {
    return Subject[subjectCode];
  };



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
    <>
      <Header />
      <div className="py-3 px-4 mx-auto max-w-4xl lg:py-5">
        <div className=" mx-auto py-2 mb-5 text-center">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400">{learningModule?.title}</span></h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{learningModule?.description}</p>
        </div>
        <div className="gap-10" style={{ display: 'flex', height: '60vh' }}>

          <div style={{ flex: '1 1 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="flex flex-col gap-5">
              <div><button style={{ width: '300px' }} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Lorem ipsum dolor sit amet.
              </button></div>
              <div><button style={{ width: '300px' }} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Lorem ipsum dolor sit amet.
              </button></div>
              <div><button style={{ width: '300px' }} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Lorem ipsum dolor sit amet consectetur.
              </button>
              </div>
              <div><button style={{ width: '300px' }} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Lorem ipsum dolor sit amet consectetur.
              </button>
              </div>
              <div style={{ width: '300px' }} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                <div className="flex gap-5">
                  <img width={50} height={50} src="https://www.theventuretours.com/wp-content/uploads/2020/03/avatar-icon-png-1-1024x1024.png" />
                  <div>
                    <h1>Tutor name</h1>
                    <h2>Tutor</h2>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div style={{ flex: '2 1 0' }}>
            <video className="w-full" controls style={{ height: '100%' }}>
              <source src="/docs/videos/flowbite.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

      </div>

    </>
  );
}
