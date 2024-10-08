import  axiosInstance  from "../axiosConfig/axios.config";

const getNamesApiPagination = async ({page ,size}) => {
  try {
    const response = await axiosInstance.get("/users", {
      params: {
        _page: page,
        _limit: size,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getNamesApi = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data.length;
  } catch (error) {
    throw error;
  }
};


const addNameApi = async (user) => {
  try {
    const response = await axiosInstance.post('/users', user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const editNameApi = async ({ userId , user }) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const searchActive = async ({ active }) => {
  try {
    const response = await axiosInstance.get(`/users/?active=${active}`);
    return response.data.length;
  } catch (error) {
    throw error;
  }
};

const getNamesApiPaginationSeach = async ({active, page ,size}) => {
  try {
    const response = await axiosInstance.get(`/users/?active=${active}`, {
      params: {
        _page: page,
        _limit: size,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getNamesApi , addNameApi, editNameApi, getNamesApiPagination, searchActive, getNamesApiPaginationSeach };
