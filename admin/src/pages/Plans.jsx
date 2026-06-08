import PageHeader from "../components/common/PageHeader";
import Table from "../components/Table";
export default function Plans() {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-3xl font-black">Membership Plans CRUD</h1>
          <p className="text-stone-500">
            Create, read, update and delete records from this module.
          </p>
        </div>
        <button className="admin-btn px-5 py-3 rounded-xl font-bold">
          + Add New
        </button>
      </div>
      <Table title="Membership Plans CRUD List" />
    </div>
  );
}
