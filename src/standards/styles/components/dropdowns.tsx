import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CompanyDataInterface } from "../../interfaces/interfaces";

export interface DropDownOptionInterface {
    option: string,
    onClick: () => void
}

interface DropdownProps {
    value: string,
    options: Array<DropDownOptionInterface>;
    placeholder: string;
    icon?: React.ReactNode;
    customStyles?: string;
    onSelect?: () => void;
}


function StandardDropDown(props: DropdownProps) {
    return (

        <div className="relative">
            <Menu >
                <Menu.Button onClick={() => { }} className="transition ease-in-out duration-100 flex items-center justify-center gap-2 py-3 px-5 shadow-md hover:shadow-xl rounded-3xl bg-[#0161FE]/[0.07] text-black text-sm font-medium outline-none border-none">
                    {props.icon && <span>{props.icon}</span>}
                    {props.value==undefined||props.value==""?props.placeholder:props.value}                
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
                    <Menu.Items className="z-[90] absolute mt-2 mr-2 justify-center left-0 w-36 origin-top-right text-left divide-y divide-gray-100 rounded-md bg-tan/90 backdrop-blur-2xl shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="">

                            {
                                props.options.map((option: DropDownOptionInterface) => {
                                    return (
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => {option.onClick() }}
                                                    className={`${active ? 'bg-gray/50 text-black' : ''} group flex w-full items-center justify-start text-left  px-4 py-2 text-sm`}>
                                                    {option.option}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    )
                                })
                            }

                        </div>
                    </Menu.Items>
                </Transition>

            </Menu>
        </div>
    );
}


export function WhiteDropDown(props: DropdownProps) {
    return (

        <div className="relative">
            <Menu >
                <Menu.Button onClick={() => { }} className="transition ease-in-out duration-100 flex items-center justify-center gap-2 py-3 px-5 shadow-md hover:shadow-xl rounded-3xl bg-tan text-black text-sm font-medium outline-none border-none">
                    {props.icon && <span>{props.icon}</span>}
                    {props.value==undefined||props.value==""?props.placeholder:props.value}                
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
                    <Menu.Items className="z-[90] absolute mt-2 mr-2 justify-center left-0 w-72 origin-top-right text-left divide-y divide-gray-100 rounded-md bg-tan/90 backdrop-blur-2xl shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="">

                            {
                                props.options.map((option: DropDownOptionInterface) => {
                                    return (
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => {option.onClick() }}
                                                    className={`${active ? 'bg-gray/50 text-black' : ''} group flex w-full items-center justify-start text-left  px-4 py-2 text-sm`}>
                                                    {option.option}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    )
                                })
                            }

                        </div>
                    </Menu.Items>
                </Transition>

            </Menu>
        </div>
    );
}

export default StandardDropDown;