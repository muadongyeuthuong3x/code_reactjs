import React, { useState, useEffect } from "react";
import { BaseComponent } from "./../components/index";
import { columns, dataSource } from "../enum/DataTable";
import { Form } from "antd";
import { options } from "../enum/ListOption.js";
import { ruleInputRequired, ruleInputMin } from "../validators/input.js";

const Home = () => {
  const { CustomButton, InputComponent, SelectComponent, TableComponent } = BaseComponent;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const [totalData, setTotalData] = useState(0);

  const changeActive = (idChange) => {
    const dataChange = [...dataSource];
    const findIndexId = dataSource.findIndex((e) => e.id == idChange);
    console.log(11111111, dataChange);
    if (findIndexId > -1) {
      const dataNew = (dataChange[findIndexId]["active"] = true);
      setDataSource(dataNew);
    }
  };
  
  const onFinish = (values) => {
    const idNew = dataSource[dataSource.length - 1]["id"] + 1;
    const { name } = values;
    const newDataSource = [
      ...dataSource,
      {
        id: idNew,
        name,
        active: true,
        action: <CustomButton variant="primary" onClick = { () => changeActive(idNew)}>No Active</CustomButton>,
      },
    ];
    setDataSource(newDataSource);
  };

  const onFinishSearch = (values) => {
    console.log(111111111111, values);
  };

  const handleTableChange = (pagination) => {;
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const fetchData = async (pageSize, size) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users?_page=${pageSize}&_limit=${size}`);
      const result = await response.json();
      const totalCount = response.headers.get('X-Total-Count');
      setTotalData(totalCount);
      console.log(1111111, response)
      result.map((e) => {
        e["action"] = (
          <CustomButton variant="primary"  onClick = { () => changeActive(e["id"])}>
            {e?.active ? "Active" : "No Active"}
          </CustomButton>
        );
        
      });
      setDataSource(result);
      setTotalData(totalCount)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2 mt-5">
        <div className="flex justify-center items-center">
          <Form
            name="basic"
            onFinish={onFinish}
            layout="vertical"
            className="flex justify-center w-full"
          >
            <InputComponent
              rules={[ruleInputRequired(), ruleInputMin(3, "Name")]}
              name="name"
            />
            <CustomButton variant="primary" htmlType="submit" ml="ml-5">
              Add Data
            </CustomButton>
          </Form>
          <Form
            name="search"
            initialValues={{
              select: options[0].value,
            }}
            onFinish={onFinishSearch}
            layout="vertical"
            className="flex justify-center w-full"
          >
            <SelectComponent
              options={options}
              defaultValue={options[0].value}
              width={200}
              name="select"
            />
            <CustomButton variant="primary" htmlType="submit" ml="ml-5">
              Search
            </CustomButton>
          </Form>
        </div>

        <TableComponent
          columns={columns}
          currentPage={currentPage}
          pageSize={pageSize}
          dataSource={dataSource}
          handleTableChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default Home;
