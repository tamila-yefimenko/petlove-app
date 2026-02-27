import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useWindowWidth,
} from "../../redux/hooks";
import s from "./AddPetForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addPetSchema } from "./validation";
import { PetFormValues } from "../../utils/types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../../utils/uploadFile";
import clsx from "clsx";
import Button from "../Button/Button";
import { selectFiltersForFetch } from "../../redux/noticesFilters/selectors";
import { fetchSpecies } from "../../redux/noticesFilters/operations";
import { getSelectStyles } from "../../utils/selectStyles";
import Select from "react-select";
import { addPet } from "../../redux/user/operations";
import { Controller } from "react-hook-form";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { HiOutlineCalendar } from "react-icons/hi2";

const AddPetForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const width = useWindowWidth();
  const isTablet = width >= 768;

  const { speciesList } = useAppSelector(selectFiltersForFetch);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSpecies());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PetFormValues>({
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

  const selectedSpecies =
    speciesOptions.find((o) => o.value === watch("species")) ?? null;

  const sexOptions = [
    { value: "female", icon: "icon-female1" },
    { value: "male", icon: "icon-male" },
    { value: "multiple", icon: "icon-healthicons_sexual-reproductive-health" },
  ];

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

  const onSubmit = async (data: PetFormValues) => {
    try {
      await dispatch(addPet(data)).unwrap();
      navigate("/profile");
    } catch (error) {
      toast.error(error as string);
    }
  };

  const capitalize = (text?: string) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  return (
    <div className={s.addForm}>
      <div className={s.titleWrapper}>
        <h2 className={s.title}>Add my pet/</h2>
        <p className={s.details}>personal details</p>
      </div>

      <div className={s.sexAvatarWrapper}>
        <div className={s.sexGroup}>
          {sexOptions.map(({ value, icon }) => (
            <label key={value} className={s.sexItem}>
              <input type="radio" value={value} {...register("sex")} hidden />

              <span
                className={clsx(
                  s.sexLabel,
                  s[value],
                  watch("sex") === value && s.sexActive,
                )}>
                <svg className={clsx(s.icon)}>
                  <use href={`/icons/sprite.svg#${icon}`} />
                </svg>
              </span>
            </label>
          ))}
          {errors.sex && (
            <p className={s.error}>{capitalize(errors.sex.message)}</p>
          )}
        </div>

        <div className={s.avatarWrapper}>
          {avatarPreview ? (
            <img src={avatarPreview} alt="pet's photo" className={s.avatar} />
          ) : (
            <div className={s.bigIconWrapper}>
              <svg className={s.bigIcon}>
                <use href="/icons/sprite.svg#icon-icons8_cat-footprint-1" />
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className={s.upload}>
        <div
          className={clsx(
            s.item,
            s.readonly,
            errors.imgURL && s.errorBorder,
            watch("imgURL") ? s.itemValue : s.placeholder,
          )}>
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
        <div className={s.inputWrapper}>
          <input
            {...register("title")}
            placeholder="Title"
            className={clsx(
              s.item,
              watch("title") && s.itemValue,
              errors.title && s.errorInput,
              errors.title && s.errorBorder,
            )}
          />
          {errors.title && <p className={s.error}>{errors.title.message}</p>}
        </div>

        <div className={s.inputWrapper}>
          <input
            {...register("name")}
            placeholder="Pet's name"
            className={clsx(
              s.item,
              watch("name") && s.itemValue,
              errors.name && s.errorInput,
              errors.name && s.errorBorder,
            )}
          />
          {errors.name && <p className={s.error}>{errors.name.message}</p>}
        </div>

        <div className={s.dateSpecies}>
          <div className={s.dateWrapper}>
            <Controller
              control={control}
              name="birthday"
              render={({ field }) => (
                <DatePicker
                  onChange={(value) => {
                    if (!value || Array.isArray(value)) {
                      field.onChange("");
                      return;
                    }

                    const formatted = value.toISOString().split("T")[0];
                    field.onChange(formatted);
                  }}
                  value={field.value ? new Date(field.value) : null}
                  format="dd.MM.yyyy"
                  locale="en-GB"
                  clearIcon={null}
                  calendarIcon={
                    <HiOutlineCalendar className={s.calendarIcon} />
                  }
                  className={clsx(
                    s.datePicker,
                    errors.birthday && s.errorBorder,
                    {
                      [s.hasValue]: !!field.value,
                    },
                  )}
                  dayPlaceholder="00"
                  monthPlaceholder="00"
                  yearPlaceholder="0000"
                  showLeadingZeros
                />
              )}
            />
            {errors.birthday && (
              <p className={s.error}>{errors.birthday.message}</p>
            )}
          </div>

          <div className={s.typeWrapper}>
            <Select
              styles={getSelectStyles(isTablet, true, !!errors.species)}
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

            {errors.species && (
              <p className={s.error}>{capitalize(errors.species.message)}</p>
            )}
          </div>
        </div>

        <div className={s.buttonsWrapper}>
          <Button
            className={s.button}
            type="button"
            variant="gray"
            size="medium"
            onClick={() => {
              navigate("/profile");
            }}>
            Back
          </Button>

          <Button
            className={s.button}
            type="submit"
            variant="orange"
            size="medium"
            disabled={isSubmitting}>
            Go to profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPetForm;
