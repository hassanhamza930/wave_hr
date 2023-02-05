import Logo from "../../images/logo.svg";
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
    const [isApplyPage, setIsApplyPage] = useState<boolean>(true);

    useEffect(() => {
        if (window.location.pathname.toString().includes("apply") == false) {
            setIsApplyPage(false);
        }
        else {
            setIsApplyPage(true);
        }
    }, [])


    return (
        <>
            {isApplyPage == false &&
                <div className="fixed h-[80px] bg-transparent z-50 w-full flex flex-row justify-between items-center px-[5%] py-5">
                    <button onClick={() => { navigate("/") }}>
                        <img src={Logo} className="h-14 w-14"></img>
                    </button>

                    <div className="flex flex-row gap-16 justify-between items-center">

                        {/* <button onClick={() => {
                            navigate("/interviews");
                        }} className="hover:scale-[1.02] font-bold text-black text-sm">Interviews</button> */}

                        <button onClick={() => {
                            navigate("/jobs");
                        }} className="hover:scale-[1.02] font-bold text-black text-sm">Jobs</button>

                        <button onClick={() => {
                            navigate("/companies");
                        }} className="hover:scale-[1.02] font-bold text-black text-sm">Company</button>


                        {/* <button onClick={() => {
                            navigate("/pricing");
                        }} className="hover:scale-[1.02] font-bold text-black text-sm">Calendar</button> */}

                        <Menu >
                            <Menu.Button onClick={() => { }} className="flex flex-row justify-center items-center gap-2">
                                <div style={{ backgroundImage: `url("${loggedInUser.photoUrl}")` }} className="bg-center bg-white rounded-xl h-10 w-10 bg-cover" ></div>
                                <AiFillCaretDown></AiFillCaretDown>
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
                                <Menu.Items className="absolute -mb-36 justify-center right-0 w-36 origin-top-right divide-y divide-gray-100 mr-20  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => { navigate("/") }}
                                                    className={`${active ? 'bg-secondary text-black' : 'text-gray-900'} group flex w-full items-center justify-start  px-4 py-2 text-sm`}>
                                                    Home
                                                </button>
                                            )}
                                        </Menu.Item>

                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => { localStorage.clear(); window.location.href = "/" }}
                                                    className={`${active ? 'bg-secondary text-black' : 'text-gray-900'} group flex w-full items-center justify-start  px-4 py-2 text-sm`}>
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
            }
        </>
    )
}