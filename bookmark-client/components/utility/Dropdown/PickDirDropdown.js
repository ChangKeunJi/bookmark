import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";

import { joinClass } from "../../../hooks/helper";
import { useSelector } from "react-redux";

const PickDirDropdown = ({ setDir }) => {
  const { allDirs } = useSelector((state) => state.directory);
  const [selected, setSelected] = useState("카테고리 선택");

  useEffect(() => {
    const selectedDir = allDirs.find((el) => el.name === selected);
    setDir(selectedDir);
  }, [selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="mt-1 w-40 relative">
        <Listbox.Button className="relative cursor-pointer h-10 w-full bg-white shadow-md rounded-md pl-3 pr-10 py-2 text-left cursor-default focus:outline-none sm:text-sm dark:bg-dark-black-light">
          <span className="flex items-center">
            <span
              className={joinClass(
                allDirs.length === 0 ? "text-gray-dark" : "text-black",
                "block truncate dark:text-dark-font",
              )}
            >
              {selected}
            </span>
          </span>
          <span className=" absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={joinClass(
              allDirs.length === 0 ? "hidden" : "block",
              "absolute z-50 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm dark:bg-dark-black-light dark:hover:bg-dark-black-light",
            )}
          >
            {allDirs.map((dir) => (
              <Listbox.Option
                key={dir.id}
                className={({ active }) =>
                  joinClass(
                    active ? "bg-gray-dark dark:bg-dark-black" : "",
                    "cursor-pointer select-none rounded-sm relative py-2 pl-3 pr-9",
                  )
                }
                value={dir.name}
              >
                {({ selected, active }) => (
                  <div>
                    <div className="flex items-center">
                      <span
                        className={joinClass(
                          selected ? "font-semibold" : "font-normal",
                          "ml-3 block truncate dark:text-dark-font ",
                        )}
                      >
                        {dir.name}
                      </span>
                    </div>

                    {selected ? (
                      <span className="text-black absolute inset-y-0 right-0 flex items-center pr-4">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default PickDirDropdown;

PickDirDropdown.propTypes = {
  setDir: PropTypes.func,
};
