import { toast } from "react-toastify";
import AddPetForm from "../../components/AddPetForm/AddPetForm";
import { Container } from "../../components/Container/Container";
import { useAppSelector } from "../../redux/hooks";
import { selectError } from "../../redux/user/selectors";
import s from "./AddPetPage.module.css";

const AddPetPage: React.FC = () => {
  const error = useAppSelector(selectError);

  return (
    <Container className={s.addPetContainer}>
      <div className={s.addPetPage}>
        <div className={s.wrapper}></div>
        <AddPetForm />
        {error && toast.error(error)}
      </div>
    </Container>
  );
};

export default AddPetPage;
