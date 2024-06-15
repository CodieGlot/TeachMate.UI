// GiveFeedback.tsx
import React, { useState } from 'react';
import { FeedbackService } from '../../../services';

export const GiveFeedback = () => {
    const [comment, setComment] = useState('');
    const [star, setStar] = useState(0);
    const [learningModuleId, setLearningModuleId] = useState(0);
    const [isAnonymous, setIsAnonymous] = useState(true);

    const handleSubmit = async () => {

        try {

            FeedbackService.givefeedback({
                comment,
                star,
                learningModuleId,
                isAnonymous
            })
        } catch (error) {
            console.error("Send Fail", error)
        }


    }

    return (
        <main className="w-screen h-screen flex justify-center items-center dark:bg-gray-900">
            <div className="max-w-7xl dark:bg-gray-950 dark:text-white">
                <form className="w-full p-4 rounded shadow-md">
                    <h2 className="text-xl mb-4 tracking-wider font-lighter text-gray-900 dark:text-gray-200">Leave a Comment</h2>
                    <p className="text-gray-600 mb-4">Your email address will not be published. Required fields are marked *</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="mb-4 col-span-1 md:col-span-3">
                            <textarea
                                id="comment"
                                name="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full px-3 py-2 dark:bg-gray-900 rounded-sm border dark:border-none border-gray-300 focus:outline-none border-solid focus:border-dashed resize-none"
                                placeholder="Type Comment...*"
                                rows={5}
                                required
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <input
                                type="number"
                                id="star"
                                name="star"
                                value={star}
                                onChange={(e) => setStar(Number(e.target.value))}
                                className="w-full px-3 py-2 dark:bg-gray-900 rounded-sm border dark:border-none border-gray-300 focus:outline-none border-solid focus:border-dashed"
                                placeholder="Star Rating*"
                                min={1}
                                max={5}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="number"
                                id="learningModuleId"
                                name="learningModuleId"
                                value={learningModuleId}
                                onChange={(e) => setLearningModuleId(Number(e.target.value))}
                                className="w-full px-3 py-2 dark:bg-gray-900 rounded-sm border dark:border-none border-gray-300 focus:outline-none border-solid focus:border-dashed"
                                placeholder="Learning Module ID"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="isAnonymous" className="text-gray-700 dark:text-gray-300">
                                <input
                                    type="checkbox"
                                    id="isAnonymous"
                                    name="isAnonymous"
                                    checked={isAnonymous}
                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                    className="mr-2 leading-tight"
                                />
                                Anonymous
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button onClick={handleSubmit}
                            type="submit"
                            className="py-4 px-6 bg-blue-950 text-white rounded-sm bg-gradient-to-r to-indigo-600 from-sky-400 "
                        >
                            Post Comment →
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};
