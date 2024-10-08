import React, { useState } from "react";
import { BaseComponent } from "./../components/index";
import { columns } from "../enum/DataTable";
import { Form } from "antd";
import { useNameContext } from "../context/NameContext.js";
import { options } from "../enum/ListOption.js";
import { ruleInputRequired, ruleInputMin } from "../validators/input.js";

const Home = () => {
  const { CustomButton, InputComponent, SelectComponent, TableComponent } =
    BaseComponent;
  const {
    loading,
    error,
    names: dataSource,
    handleTableChange,
    onFinish,
    currentPage,
    pageSize,
    total,
    onFinishSearch
  } = useNameContext();


  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2 mt-5">
        <div className="flex justify-center items-center">
          <Form
            name="basic"
            onFinish={onFinish}
            initialValues={{
              name: "",
            }}
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
          total={total}
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
