import { useSelector, useDispatch } from 'react-redux'
import { closeEditing, closeModal } from '../../context/Slices/Modal/ModalSlice'

function NewModal ({ children }) {
  const dispatch = useDispatch()
  const { isOpen, title, width } = useSelector((state) => state.modal)

  const handleClose = () => {
    dispatch(closeModal())
    dispatch(closeEditing())
  }

  return (
    <>
      {isOpen && (
        <>
          <div
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-gray-700 bg-opacity-70"
          >
            <div className={`relative ${width}`}>
              <div className="relative bg-white rounded-lg shadow-2xl0">
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                    {title}
                  </h3>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="p-6 space-y-6">{children}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default NewModal
