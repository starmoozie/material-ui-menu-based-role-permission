export const flattenArrayObject = (arr = [], parent) =>
  arr.reduce((list, { children, ...e }) => {
    list.push(parent ? { parent, ...e } : e);
    if (children) list.push(...flattenArrayObject(children, e.name));
    return list;
  }, []);

export const hasAccess = (menu, permission) =>
  menu.permission?.find((item) => item.type.toLowerCase() === permission);

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const groupBy = (items, key) =>
  items?.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item]
    }),
    {}
  );

export const arrayToObject = (array) =>
  array?.reduce((a, b) => ({ ...a, ...b }));

export const mapDefaultValueCreate = (fields) =>
  Object.entries(fields)
    .map(([key, value]) => ({ [key]: value ? value.spec?.default : "" }))
    .reduce((acc, key) => ({ ...acc, ...key }), {});

export const mapDefaultValueEdit = (row, fields) =>
  Object.entries(row)
    .filter(([key, value]) => fields.some((field) => field.name === key))
    .reduce((accum, [k, v]) => {
      accum[k] = v;
      return accum;
    }, {});

export const handleDefaultValues = (props, validation, childsField) => {
  const { action, data } = props;

  switch (action.type.toLowerCase()) {
    case "action":
      return mapDefaultValueCreate(validation.fields);

    case "line":
      return action ? mapDefaultValueEdit(data, childsField) : data;

    case "filter":
      return {};

    default:
      return {};
  }
};
