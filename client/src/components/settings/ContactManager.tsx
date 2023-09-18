import Modal from "../include/Modal";

export const ContactManager = () => {
  return (
    <Modal title={"Add To Contacts"}>
      <form action="" className="space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Add To Contacts</h2>
          <button className="font-semibold border-[1.5px] border-primary px-4 py-1 rounded-full btn-effect">Save</button>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between space-x-6">
              <label htmlFor="fName" className="">First Name</label>
              <input className="py-1 px-2" id="fName" />
            </div>
            <div className="flex justify-between space-x-6">
              <label htmlFor="lName" className="">Last Name</label>
              <input className="py-1 px-2" />
            </div>
            <div className="flex justify-between space-x-6">
              <label htmlFor="email" className="">Email</label>
              <input className="py-1 px-2" />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  )
}
