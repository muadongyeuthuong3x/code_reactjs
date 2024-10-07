import React from "react"; // Import useState
import { Table } from "antd";


function TableComponent(props) {
  const {
    columns,
    totalRow = 0,
    pageSize,
    dataSource,
    currentPage,
    handleTableChange,
    pagination = {
      pageSizeOptions: ["10", "20", "100"],
      defaultPageSize: 10,
      showSizeChanger: true,
    },
    ...rest
  } = props;


  return (
    <Table
      bordered
      columns={columns}
      dataSource={dataSource}
      pagination={{
        ...pagination,
        current: currentPage,
        pageSize,
        total: totalRow,
      }}
      onChange={handleTableChange}
      {...rest}
    />
  );
}

export default TableComponent;
