'use client'
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuArrowUpRightFromCircle } from "react-icons/lu";


const Row = ({ title,answers,writers, onOpenDropDown, onGoToThread }) => {
    const [isDropDownOpen, setDropDownOpen] = useState(false);

    const handleOpenDropDown = () => {
        setDropDownOpen(!isDropDownOpen);
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row w-full justify-between p-5">
                <div>
                    <h2 className="font-satori font-bold">{title}</h2>
                </div>
                <div className="flex space-x-4">
                    <button 
                        className="black_btn" 
                        onClick={handleOpenDropDown}
                    >
                        {isDropDownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </button>
                    <button
                        className="black_btn" 
                        onClick={onGoToThread}
                    >
                        <LuArrowUpRightFromCircle />
                    </button>
                </div>
            </div>
            {isDropDownOpen && (
                <div className="pr-5 pl-7 pb-5">
                    {/* Dropdown content goes here */}
                    <div className="rounded-lg p-5">
                        {answers.map((answer,index) => (
                            <div className="bg-gray-300 rounded-md mb-3 p-2">
                                <p className="font-inter font-bold text-sm text-gray-500">{answer}</p>
                                <p className="font-inter text-sm text-gray-500 text-right">{writers[index]}</p>
                            </div>
                        ))}
                            
                    </div>
                </div>
            )}
        </div>
    );
};

export default Row;