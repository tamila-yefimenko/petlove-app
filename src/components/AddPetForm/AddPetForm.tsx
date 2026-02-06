import { useEffect, useState } from "react";
import {
  selectBirthday,
  selectError,
  selectImgUrl,
  selectName,
  selectSex,
  selectSpecies,
  selectTitle,
} from "../../redux/addPet/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import s from "./AddPetForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addPetSchema } from "./validation";
import { AddPetFormValues } from "../../utils/types";
import { toast } from "react-toastify";
import { addPet } from "../../redux/addPet/operations";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../../utils/uploadFile";
import clsx from "clsx";
import Button from "../Button/Button";
import { selectFiltersForFetch } from "../../redux/noticesFilters/selectors";
import { fetchSex, fetchSpecies } from "../../redux/noticesFilters/operations";
import { getSelectStyles } from "../../utils/selectStyles";
import Select from "react-select";

const AddPetForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { speciesList, sexList } = useAppSelector(selectFiltersForFetch);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSpecies());
    dispatch(fetchSex());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddPetFormValues>({
    resolver: yupResolver(addPetSchema),
    defaultValues: {
      name: "",
      title: "",
      imgURL: "",
      species: "",
      birthday: "",
      sex: "",
    },
  });

  const speciesOptions = speciesList.map((item) => ({
    value: item,
    label: item,
  }));

  const sexOptions = sexList.map((item) => ({
    value: item,
    label: item,
  }));

  const selectedSpecies =
    speciesOptions.find((o) => o.value === watch("species")) ?? null;

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));

    try {
      const uploadedUrl = await uploadToCloudinary(file);
      setValue("imgURL", uploadedUrl, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch {
      toast.error("Image upload failed");
    }
  };

  const onSubmit = async (data: AddPetFormValues) => {
    try {
      await dispatch(addPet(data)).unwrap();
      navigate("/profile");
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <>
      <h2>add my pet/</h2>
      <p>personal details</p>

      <div className={s.sexGroup}>
        {sexOptions.map(({ value, label }) => (
          <label key={value} className={s.sexItem}>
            <input type="radio" value={value} {...register("sex")} hidden />
            <span
              className={clsx(
                s.sexLabel,
                watch("sex") === value && s.sexActive,
              )}>
              {label}
            </span>
          </label>
        ))}
      </div>

      {errors.sex && <p className={s.error}>{errors.sex.message}</p>}

      <div className={s.avatarWrapper}>
        {avatarPreview ? (
          <img src={avatarPreview} alt="pet's photo" className={s.avatar} />
        ) : (
          <div className={s.bigIconWrapper}>
            <svg className={s.bigIcon}>
              <use href="/icons/sprite.svg#icon-user-02" />
            </svg>
          </div>
        )}
      </div>

      <div className={s.upload}>
        <div
          className={clsx(s.item, s.readonly, watch("imgURL") && s.itemValue)}>
          {watch("imgURL") || "Enter URL"}
        </div>

        <label className={s.uploadInput}>
          Upload photo{" "}
          <svg className={s.uploadIcon}>
            <use href="/icons/sprite.svg#icon-upload-cloud" />
          </svg>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleAvatarChange}
          />
        </label>

        {errors.imgURL && <p className={s.error}>{errors.imgURL.message}</p>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <input
          {...register("title")}
          placeholder="Title"
          className={clsx(s.item, errors.title && s.errorInput)}
        />
        {errors.name && <p className={s.error}>{errors.name.message}</p>}

        <input
          {...register("name")}
          placeholder="Pet's name"
          className={clsx(s.item, errors.name && s.errorInput)}
        />
        {errors.birthday && (
          <p className={s.error}>{errors.birthday.message}</p>
        )}

        <input
          type="date"
          {...register("birthday")}
          className={clsx(s.item, errors.birthday && s.errorInput)}
        />
        {errors.birthday && (
          <p className={s.error}>{errors.birthday.message}</p>
        )}

        <Select
          styles={getSelectStyles(true)}
          classNamePrefix="react-select"
          className={s.select}
          options={speciesOptions}
          placeholder="Type of pet"
          value={selectedSpecies}
          onChange={(opt) =>
            setValue("species", opt?.value ?? "", {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        />

        {errors.species && <p className={s.error}>{errors.species.message}</p>}

        <Button
          type="button"
          variant="gray"
          size="medium"
          onClick={() => {
            navigate("/profile");
          }}>
          Back
        </Button>

        <Button
          type="submit"
          variant="orange"
          size="medium"
          disabled={isSubmitting}>
          Go to profile
        </Button>
      </form>
    </>
  );
};

export default AddPetForm;
