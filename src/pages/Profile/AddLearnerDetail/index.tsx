import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDetailService } from "../../../services/UserDetailService";
import { useLocation } from "react-router-dom";
import { Stepper } from "../Stepper";
import toast from "react-hot-toast";
import { StorageService } from "../../../services";

export function AddLearnerDetail() {

  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState("https://i.pinimg.com/originals/ee/d1/76/eed176d5fb3f77e3e003b85a246ba7ad.jpg"); // Assuming the initial value is null
  const [gradeLevel, setGradeLevel] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [imageSrc, setImageSrc] = useState<string>("https://i.pinimg.com/originals/ee/d1/76/eed176d5fb3f77e3e003b85a246ba7ad.jpg");
  const [selectedFile, setSelectedFile] = useState<File>();
  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // If you need to handle the file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (validTypes.includes(file.type)) {
        setImageSrc(URL.createObjectURL(file));
        setSelectedFile(file);

      } else {
        toast.error('Please upload a valid image file (JPEG, PNG, GIF)');
      }

    }
  };



  const handleAddUserDetail = async () => {


    if (!state) {
      return <div>No state available</div>;
    }

    const { accessToken } = state;
  
    try {
      // if (selectedFile) {
      //   setAvatar(await StorageService.uploadFile(selectedFile));
      // }
      await UserDetailService.addLearnerDetail({
        displayName,
        phoneNumber,
        avatar,
        gradeLevel,

      }, accessToken);

      navigate("/");
    } catch (error) {
      console.error("Add user detail failed:", error);
    }
  };

  return (
    <>
      <Stepper />

      <section className="bg-white dark:bg-gray-900">
        <div className="py-4 px-4 mx-auto max-w-2xl">
          <div className=" mx-auto py-3 mb-5">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400">Add your details</span></h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Update your details so anyone can know you</p>
          </div>
          <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label htmlFor="displayName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  required
                  id="displayName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>

              <div className="w-full">
                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                      <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="phoneNumber"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="123-456-7890"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Select a phone number that matches the format.</p>
              </div>


              <div>
                <div className="flex items-center space-x-6">
                  <div className="shrink-0">
                    <img
                      id="preview_img"
                      className="h-16 w-16 object-cover rounded-full"
                      src={imageSrc}
                      alt="Current profile photo"
                    />
                  </div>
                  <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                      type="file"
                      onChange={loadFile}
                      className="block w-full text-sm text-slate-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-violet-50 file:text-violet-700
                     hover:file:bg-violet-100"
                    />
                  </label>


                </div>

              </div>

              <div className="items-start">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade Level</label>
                <input
                  type="number"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your grade level"
                  required
                  min={1}
                  max={12}
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(Number.parseInt(e.target.value))}
                />
              </div>

            </div>
            {/* //note */}
            <div className="mt-10 flex p-4 text-sm text-gray-400 rounded-lg bg-gradient-to-r from-sky-400/20 to-indigo-600/20 h-full lg:w-full lg:ml-auto" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Ensure that these requirements are met:</span>
                <ul className="mt-1.5 list-disc list-inside">
                  <li>You can only upload PNG, JPG, JPEG file</li>

                </ul>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="button"
                onClick={handleAddUserDetail}
                className="text-white bg-gradient-to-r to-indigo-600 from-sky-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Submit</button>
            </div>
          </form>
        </div>
      </section>
    </>

  );
}
