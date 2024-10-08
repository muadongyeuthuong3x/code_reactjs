import React, { createContext, useState, useContext, useEffect } from "react";
import { getNamesApi, addNameApi, editNameApi, getNamesApiPagination, searchActive, getNamesApiPaginationSeach } from "../api/name.api";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { BaseComponent } from "./../components/index";
import { options, valueAll , valueCompleted , valueIncomplete } from "../enum/ListOption"


const { CustomButton } = BaseComponent;

const NameContext = createContext();

export const useNameContext = () => {
  return useContext(NameContext);
};

export const NameProvider = ({ children }) => {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [total, setTotal] = useState(2);
  const [statusSearch , setStatusSearch] = useState(valueAll)

  useEffect(() => {
    fetchUsers({currentPa : 1});
  }, []);

  const handleTableChange = async (pagination) => {
    const { current: currentPa, pageSize: pageSizePa } = pagination;
    switch (statusSearch) {
      case valueAll:
        await fetchUsers({ currentPa: currentPa });
        break;

      case valueCompleted:
        await searchUsers({ active: true, page: currentPa, size: pageSizePa });
        break;

      case valueIncomplete:
        await searchUsers({ active: false, page: currentPa, size: pageSizePa });
        break;

      default:
        return;
    }
    setCurrentPage(currentPa);
    setPageSize(pageSizePa);
  };

  const createButton = ({ id, active }) => {
    return (
      <CustomButton variant="primary" onClick={() => changeActive(id)}>
        {active ? "Active" : "No Active"}
      </CustomButton>
    );
  };

  const changeActive = async (idChange) => {
    try {
      let dataChange = {};
      setNames((prevNames) => {
        return prevNames.map((item) => {
          if (item.id == idChange) {
            const activeCheck = !item.active;
            const data =  {
              ...item,
              active: activeCheck,
              action: createButton({ id: idChange, active: activeCheck }),
            };

            dataChange = data ;
            return data;
          }
          return item;
        });
      });
    await editNameApi({ userId: idChange, user: dataChange });
    
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    const idNew = uuidv4();
    const { name } = values;
    const newEntry = {
      id: idNew,
      name,
      active: true,
    };
    try {
      const res = await addNameApi(newEntry);
      const objectNew = {
        ...res,
        key: res["id"],
        action: createButton({
          id: res["id"],
          active: res["active"],
        }),
      };
      setNames((prevNames) => [objectNew, ...prevNames]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async ({currentPa = 1}) => {
    setLoading(true);
    setCurrentPage(1);
    try {
      const dataResponse = await getNamesApiPagination({page: currentPa ,size : pageSize});
      const totalCount = await getNamesApi();
      setTotal(totalCount)
      const updatedData = dataResponse.map((e) => {
        const idOld = e["id"];
        return {
          ...e,
          action: createButton({ id: idOld, active: e["active"] }),
          key: idOld,
        };
      });

      setNames(() => [...updatedData]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async ({active, pageSize, currentPage}) => {
    setLoading(true);
    try {
      const dataResponse = await getNamesApiPaginationSeach({page: currentPage ,size : pageSize , active});
      const totalCount = await searchActive({active});
      setTotal(totalCount)
      const updatedData = dataResponse.map((e) => {
        const idOld = e["id"];
        return {
          ...e,
          action: createButton({ id: idOld, active: e["active"] }),
          key: idOld,
        };
      });
      setNames(() => [...updatedData]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishSearch = async (value) => {
    const { select } = value;
    setStatusSearch(select);
    switch (select) {
      case valueAll:
        await fetchUsers({currentPa : 1});
        break;

      case valueCompleted:
        await searchUsers({ active: true, pageSize, currentPage: 1 });
        break;

      case valueIncomplete:
        await searchUsers({ active: false, pageSize, currentPage : 1 });
        break;

      default:
        return;
    }
  };


  return (
    <NameContext.Provider
      value={{
        names,
        loading,
        error,
        changeActive,
        handleTableChange,
        onFinish,
        currentPage,
        pageSize,
        total,
        onFinishSearch
      }}
    >
      {children}
    </NameContext.Provider>
  );
};
