import React from "react";
import TableComponent from "./TableComponent.jsx";
import { columns, dataSource } from "../../enum/DataTable.js";

export default {
  title: "Table",
  component: TableComponent,
};

export const TableOne = () => (
  <TableComponent
    columns={columns}
    dataSource={dataSource}
    pagination={{
      pageSizeOptions: ["10", "20", "100"],
      defaultPageSize: 10,
      showSizeChanger: true, 
    }}
  />
);
