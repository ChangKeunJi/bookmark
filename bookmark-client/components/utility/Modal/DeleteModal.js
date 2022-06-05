import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";

const DeleteModal = ({ type, setModal, setConfirm }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [open]);

  const onClickDelete = useCallback(() => {
    setOpen(false);
    setModal(true);
    setConfirm(true);
  }, []);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
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
            <div className="inline-block align-bottom bg-white border-red border rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="flex-center bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex flex-col gap-2 sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center w-auto justify-center h-12 rounded-full sm:mx-0 sm:h-10 ">
                    <ExclamationIcon
                      className="h-6 w-6 mr-2 text-red"
                      aria-hidden="true"
                    />

                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-red"
                    >
                      정말 삭제하시겠습니까 ??
                    </Dialog.Title>
                  </div>
                  <div className="mt-3 flex-center text-center sm:mt-0 sm:text-left">
                    {type && (
                      <p className="underline">
                        카테고리에 포함된 모든 북마크가 삭제됩니다.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="outline-none w-full bg-red text-white inline-flex justify-center rounded-lg border border-red shadow-sm px-4 py-2 text-base font-medium active:-translate-y-0.5 hover:shadow-2xl sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClickDelete}
                >
                  삭제
                </button>
                <button
                  type="button"
                  className="outline-none mt-3 w-full inline-flex justify-center rounded-lg border shadow-sm px-4 py-2 bg-white text-base font-medium dark:text-black active:-translate-y-0.5 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  취소
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DeleteModal;

DeleteModal.propTypes = {
  type: PropTypes.string,
  setModal: PropTypes.func,
  setConfirm: PropTypes.func,
};
