import React from "react"; 
import { Table } from "antd";

function TableComponent(props) {
  const {
    columns,
    pageSize,
    dataSource,
    currentPage,
    total,
    handleTableChange,
    pagination = {
      pageSizeOptions: ["2", "10", "20", "100"],
      defaultPageSize: 2,
      showSizeChanger: true,
    },
    ...rest
  } = props;

  return (
    <Table
      columns={columns}
      dataSource={dataSource} 
      pagination={{
        ...pagination,
        current: currentPage,
        pageSize,
        total: total,
      }}
      onChange={handleTableChange}
      {...rest}
    />
  );
}

export default TableComponent;
