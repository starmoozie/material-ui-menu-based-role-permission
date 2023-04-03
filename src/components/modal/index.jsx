import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleDefaultValues } from "../../_utils";
import { FormModal } from "./Form";
import { DefaultModal } from "./Default";

export default function Modal() {
  const modal = useSelector((state) => state.modal);

  return <>{modal.open ? <ModalComponent {...modal} /> : <></>}</>;
}

const ModalComponent = (props) => {
  const { action, data } = props;
  const modalChilds = useSelector((state) => state.modalChilds);
  const childs = modalChilds[action.name.toLowerCase()];

  const defaultValues = handleDefaultValues(
    props,
    modalChilds?.validation,
    childs
  );
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: {
        open: false,
        action: "",
        data: ""
      }
    });
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm({
    resolver: yupResolver(modalChilds?.validation),
    defaultValues: defaultValues
  });

  const onSubmit = (body) => {
    console.log(action.action, body);
    handleCloseModal();
  };

  return (
    <Dialog open={true} onClose={handleCloseModal} fullWidth maxWidth="md">
      <DialogTitle>{action?.name}</DialogTitle>
      {action.action ? (
        <FormModal
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          childs={childs}
          data={data}
          control={control}
          errors={errors}
        />
      ) : (
        <DefaultModal
          childs={childs}
          data={data}
          handleCloseModal={handleCloseModal}
        />
      )}
    </Dialog>
  );
};
