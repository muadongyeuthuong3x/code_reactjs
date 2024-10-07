import CustomButton from "../components/buttons/ButtonComponent";

export const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

export const dataSource = Array.from({
  length: 20,
}).map((_, i) => ({
  key: i,
  name: `Mạnh Cường ${i}`,
  action: <CustomButton variant="primary"> Active </CustomButton>,
}));
