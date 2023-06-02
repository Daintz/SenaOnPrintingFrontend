import Modal from '../../components/Modal/Modal'
import ListSupplyCategory from '../../components/SupplyCategory/ListSupplyCategory'
import CreateSupplyCategory from '../../components/SupplyCategory/CreateSupplyCategory'
import { useSelector } from 'react-redux'
import UpdateSupplyCategory from '../../components/SupplyCategory/UpdateSupplyCategory'

const SupplyCategory = () => {
  const { isEditing } = useSelector((state) => state.modal)

  return (
    <>
      <div className="p-4">
        <div className="p-4 border-gray-200 border-dashed rounded-lg">
          <div className="flex items-center justify-center rounded">
            <div className="relative overflow-x-auto">
              <ListSupplyCategory />
              <Modal>
                {isEditing ? <UpdateSupplyCategory /> : <CreateSupplyCategory />}
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SupplyCategory
