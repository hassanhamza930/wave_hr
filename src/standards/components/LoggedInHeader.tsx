import Logo from "../../images/logo.svg";
import LogoText from "../../images/logoText.svg";
import { BsArrowRightShort } from "react-icons/bs";
import { useNavigate } from "react-router";
import { Menu, Transition } from '@headlessui/react'
import { AiFillCaretDown } from 'react-icons/ai';
import { Fragment, useEffect, useState } from 'react'
import globalUserAtom from "../../atoms/app/globalUserAtom";
import { useRecoilState } from "recoil";


export default function LoggedInHeader() {

    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useRecoilState(globalUserAtom);



    return (
        <div className="fixed h-[70px] bg-tan z-50 w-full flex flex-row justify-between items-center px-[5%] py-5">

            <div className="text-[24px] font-bold">
                Jobs
            </div>


            <div className="flex flex-row gap-16 justify-between items-center">

                <button onClick={() => {
                    navigate("/jobs");
                }} className={`font-semibold ${window.location.href.includes("jobs") ? "text-blue" : "text-black"} text-sm`}>Jobs</button>

                <button onClick={() => {
                    navigate("/companies");
                }} className={`font-semibold ${window.location.href.includes("companies") ? "text-blue" : "text-black"} text-sm`}>Company</button>



                <div className="relative">
                    <Menu >
                        <Menu.Button onClick={() => { }} className="flex flex-row justify-center items-center gap-2 border-[2px] p-2 rounded-xl hover:border-blue border-gray">
                            <div style={{ backgroundImage: `url("${loggedInUser.photoUrl}")` }} className="bg-center bg-blue rounded-xl h-10 w-10 bg-cover" ></div>
                            <div style={{ backgroundImage: `url("${LogoText}")` }} className="bg-center rounded-xl h-10 w-24 bg-contain bg-no-repeat" ></div>
                            <AiFillCaretDown size={10}></AiFillCaretDown>
                        </Menu.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute mt-2 mr-2 justify-center right-0 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-tan/90 backdrop-blur-2xl shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => { navigate("/") }}
                                                className={`${active ? 'bg-gray/50 text-black' : ''} group flex w-full items-center justify-start  px-4 py-2 text-sm`}>
                                                Home
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => { localStorage.clear(); window.location.href = "/" }}
                                                className={`${active ? 'bg-gray/50 text-black' : ''} group flex w-full items-center justify-start  px-4 py-2 text-sm`}>
                                                Log Out
                                            </button>
                                        )}
                                    </Menu.Item>

                                </div>
                            </Menu.Items>
                        </Transition>

                    </Menu>
                </div>

            </div>

        </div>
    )
}