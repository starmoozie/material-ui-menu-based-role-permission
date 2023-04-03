import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

export const DefaultModal = (props) => {
  const { childs, data, handleCloseModal } = props;

  return (
    <>
      <DialogContent>
        {childs.map((child) => {
          const { name, Cell } = child;

          return <Cell data={data} key={name} name={name} />;
        })}
      </DialogContent>
      <DialogActions sx={{ pr: 3, pb: 3 }}>
        <Button variant="contained" onClick={() => handleCloseModal()}>
          Close
        </Button>
      </DialogActions>
    </>
  );
};
