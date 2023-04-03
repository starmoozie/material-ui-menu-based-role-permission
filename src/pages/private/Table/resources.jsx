import * as yup from "yup";
import TextField from "../../../components/fields/Text/index.jsx";

export const columns = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
    Cell: ({ data }) => {
      return <>{data.name}</>;
    }
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Calories",
    Cell: ({ data }) => {
      return <>{data.calories}</>;
    }
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Fat (g)",
    Cell: ({ data }) => {
      return <>{data.fat}</>;
    }
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Carbs (g)",
    Cell: ({ data }) => {
      return <>{data.carbs}</>;
    }
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Protein (g)",
    Cell: ({ data }) => {
      return <>{data.protein}</>;
    }
  }
];

export const fields = [
  {
    name: "name",
    Cell: (props) => {
      return <TextField {...props} />;
    }
  }
];

export const details = [
  {
    name: "name",
    Cell: ({ data }) => {
      return <>{JSON.stringify(data)}</>;
    }
  }
];

export const validation = yup
  .object({
    name: yup.string().required().default("cok")
  })
  .required();
