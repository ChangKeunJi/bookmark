import { PlusSmIcon, PencilAltIcon } from "@heroicons/react/outline";
import { useCallback, useState, Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";

import {
  ADD_DIR_REQUEST,
  UPDATE_DIR_REQUEST,
} from "../../../reducers/directory";
import { joinClass } from "../../../hooks/helper";

const AddDirModal = ({ update, id, name, setOpenMenu }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const onClickOpenModal = useCallback(() => {
    setOpen((open) => !open);
    setOpenMenu(false);
  }, []);

  const onChangeInput = useCallback(
    (e) => {
      setInputValue(e.target.value);
    },
    [inputValue],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (update) {
        dispatch({
          type: UPDATE_DIR_REQUEST,
          data: { name: inputValue, id: id },
        });
      } else {
        dispatch({
          type: ADD_DIR_REQUEST,
          data: { name: inputValue },
        });
      }
      setOpen(false);
    },
    [inputValue],
  );

  useEffect(() => {
    if (!open) {
      setInputValue("");
    }
    if (update) {
      setInputValue(name);
    }
  }, [open, update, name]);

  return (
    <div
      className={joinClass(
        update
          ? "w-8 h-8 rounded-full flex-center dark:hover:bg-dark-black"
          : "w-9 h-9 rounded-2xl dark:hover:bg-dark-black-light",
        "hover:bg-gray-dark cursor-pointer",
      )}
    >
      {update ? (
        <PencilAltIcon className="w-5 h-5" onClick={onClickOpenModal} />
      ) : (
        <PlusSmIcon onClick={onClickOpenModal} />
      )}

      <div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            onClose={setOpen}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <form
                  onSubmit={onSubmit}
                  className="inline-block bg-gray border border-gray-dark dark:text-black z-50 relative align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  autoComplete="off"
                >
                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          카테고리 명을 입력해주세요.
                        </Dialog.Title>
                        <div className="mt-4">
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              type="text"
                              className="p-2 block w-full pr-12 sm:text-sm rounded-md shadow-md dark:bg-white outline-none"
                              placeholder="카테고리 이름"
                              onChange={onChangeInput}
                              value={inputValue}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex-center sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full bg-gray-dark inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      추가하기
                    </button>
                  </div>
                </form>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
};

export default AddDirModal;

AddDirModal.propTypes = {
  update: PropTypes.bool,
  id: PropTypes.number,
  name: PropTypes.string,
  setOpenMenu: PropTypes.func,
};
