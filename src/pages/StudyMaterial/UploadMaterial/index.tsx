import styles from "./upload.module.css"
import { Header } from "../../../layouts";


export function UploadMaterial() {
    return (
        <>
            <Header />
            <div className=" ">
                <div className=" mx-auto py-2 mb-5 text-center">
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400">Upload material page</span></h1>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Upload material</p>
                </div>
                <form className={styles.form}>
                    <span className={styles["form-title"]}>Upload your file</span>
                    <p className={styles["form-paragraph"]}>
                        File should be {"<"} 10MB
                    </p>
                    <label htmlFor={styles["file-input"]} className={styles["drop-container"]}>
                        <span className={styles["drop-title"]}>Drop files here</span>
                        or
                        <input type="file" accept="image/*" required id={styles["file-input"]} />
                    </label>
                </form>
            </div>
        </>
    );
}