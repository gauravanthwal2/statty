import { BsPencilSquare } from "react-icons/bs";
import { v4 as uuid } from "uuid";

export const COLUMNS = [
  {
    Header: "Oracle Id",
    accessor: "OracleId",
    key: uuid(),
  },
  {
    Header: "Name",
    accessor: "FirstName",
    key: uuid(),
  },
  {
    Header: "Email",
    accessor: "Email",
    key: uuid(),
  },
  {
    Header: "Career Stage",
    accessor: "CareerStage",
    key: uuid(),
  },
  {
    Header: "Training Name",
    accessor: "TrainingName",
    key: uuid(),
  },
  {
    Header: "Training Phase",
    accessor: "Phase",
    key: uuid(),
  },
  {
    Header: "Status",
    accessor: "Status",
    key: uuid(),
  },
];
