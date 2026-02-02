import { useEffect, useRef, useState } from "react";
import s from "./ModalEditUser.module.css";
import ClearBtn from "../ClearBtn/ClearBtn";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectAvatar,
  selectEmail,
  selectName,
  selectPhone,
} from "../../redux/user/selectors";
import clsx from "clsx";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editUserSchema } from "./validation";
import { toast } from "react-toastify";
import { editUser } from "../../redux/user/operations";
import { uploadToCloudinary } from "../../utils/uploadFile";
import { EditUserFormValues } from "../../utils/types";

interface ModalEditUserProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalEditUser: React.FC<ModalEditUserProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();

  const name = useAppSelector(selectName);
  const email = useAppSelector(selectEmail);
  const phone = useAppSelector(selectPhone);
  const avatar = useAppSelector(selectAvatar);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    avatar ?? null,
  );

  const modalRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<EditUserFormValues>({
    resolver: yupResolver(editUserSchema) as any,
    defaultValues: {
      avatar: avatar ?? "",
      name: name ?? "",
      email: email ?? "",
      phone: phone ?? "",
    },
  });

  const onSubmit = async (data: EditUserFormValues) => {
    const payload = Object.fromEntries(
      Object.entries(dirtyFields).map(([key]) => [
        key,
        data[key as keyof EditUserFormValues],
      ]),
    );

    if (Object.keys(payload).length === 0) {
      toast.info("Nothing to update!");
      return;
    }

    try {
      await dispatch(editUser(payload)).unwrap();
      onClose();
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);

    const uploadedUrl = await uploadToCloudinary(file);

    setValue("avatar", uploadedUrl, {
      shouldValidate: true,
    });
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <ClearBtn
          className={s.clearBtn}
          onClick={onClose}
          iconClassName={s.clearIcon}
        />
        <h2 className={s.title}>Edit information</h2>
        <div className={s.avatarWrapper}>
          {avatarPreview ? (
            <img src={avatarPreview} alt="avatar" className={s.avatar} />
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
            className={clsx(
              s.item,
              s.readonly,
              watch("avatar") && s.itemValue,
            )}>
            {watch("avatar") || "https://..."}
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
          {errors.avatar && <p className={s.error}>{errors.avatar.message}</p>}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <input
            className={clsx(
              s.item,
              name && s.itemValue,
              errors.name && s.errorInput,
            )}
            {...register("name")}
            placeholder="Name"
          />
          {errors.name && <p className={s.error}>{errors.name.message}</p>}

          <input
            className={clsx(
              s.item,
              email && s.itemValue,
              errors.email && s.errorInput,
            )}
            {...register("email")}
            placeholder="name@gmail.com"
          />
          {errors.email && <p className={s.error}>{errors.email.message}</p>}

          <input
            className={clsx(
              s.item,
              s.last,
              phone && s.itemValue,
              errors.phone && s.errorInput,
            )}
            {...register("phone")}
            placeholder="+380"
          />
          {errors.phone && <p className={s.error}>{errors.phone.message}</p>}

          <Button
            type="submit"
            variant="orange"
            size="medium"
            fullWidth
            disabled={isSubmitting}>
            Go to profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ModalEditUser;
