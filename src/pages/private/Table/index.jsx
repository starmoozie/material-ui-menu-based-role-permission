import Table from "../../../components/table";
import { columns, fields, details, validation } from "./resources";

export const TablePage = () => {
  return (
    <Table
      columns={columns}
      createFields={fields}
      editFields={fields}
      filters={fields}
      details={details}
      validation={validation}
    />
  );
};

export default TablePage;
