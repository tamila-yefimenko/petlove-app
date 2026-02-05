import { Container } from "../../components/Container/Container";
import s from "./AddPetPage.module.css";

const AddPetPage: React.FC = () => {
  return (
    <Container className={s.addPetContainer}>
      <div className={s.addPetPage}>
        <div className={s.wrapper}></div>
      </div>
    </Container>
  );
};

export default AddPetPage;
