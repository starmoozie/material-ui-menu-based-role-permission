import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const FormModal = (props) => {
  const { handleSubmit, onSubmit, childs, data, control, errors } = props;

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: -3 }}
    >
      <DialogContent>
        {childs.map((child) => {
          const { name, Cell } = child;

          return (
            <Cell
              data={data}
              key={name}
              name={name}
              control={control}
              errors={errors}
            />
          );
        })}
      </DialogContent>
      <DialogActions sx={{ pr: 3, pb: 3 }}>
        <Button variant="contained" type={"submit"}>
          Submit
        </Button>
      </DialogActions>
    </Box>
  );
};
