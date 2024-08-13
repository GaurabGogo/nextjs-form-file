import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  joinNowValidationSchema,
  joinNowValidationSchema as validationSchema,
} from "@/lib/validation";
import { useCallback, useState } from "react";
import MyDropzone from "./MyDropzone";
import Image from "next/image";
import { Button } from "primereact/button";
import { FaTrash } from "react-icons/fa6";
import ReactCrop from "react-image-crop";
import "react-image-crop/src/ReactCrop.scss";

const truncate = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

const cities = [
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
];

const professions = [
  { name: "Plumber", code: "PLM" },
  { name: "Electrician", code: "ELC" },
  { name: "Electronics Engineer", code: "ELE" },
  { name: "Mechanical Engineer", code: "MEC" },
  { name: "Civil Engineer", code: "CVL" },
];

const wards = [
  { name: "Ward 1", code: "W1" },
  { name: "Ward 2", code: "W2" },
  { name: "Ward 3", code: "W3" },
  { name: "Ward 4", code: "W4" },
  { name: "Ward 5", code: "W5" },
];

const MyForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(joinNowValidationSchema),
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setPreview(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <section className="section-padding">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field-wrapper">
            <label htmlFor="firstName">First Name*</label>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputText
                  id="firstName"
                  {...field}
                  className={`field-input ${
                    errors.firstName ? "p-invalid" : ""
                  }`}
                />
              )}
            />
            {errors.firstName && (
              <small className="p-error">{errors.firstName.message}</small>
            )}
          </div>
          <div className="field-wrapper">
            <label htmlFor="middleName">Middle Name</label>
            <Controller
              name="middleName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputText
                  id="middleName"
                  {...field}
                  className={`field-input ${
                    errors.middleName ? "p-invalid" : ""
                  }`}
                />
              )}
            />
            {errors.middleName && (
              <small className="p-error">{errors.middleName.message}</small>
            )}
          </div>
          <div className="field-wrapper">
            <label htmlFor="lastName">Last Name*</label>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputText
                  id="lastName"
                  {...field}
                  className={`field-input ${
                    errors.lastName ? "p-invalid" : ""
                  }`}
                />
              )}
            />
            {errors.lastName && (
              <small className="p-error">{errors.lastName.message}</small>
            )}
          </div>
          <div className="field-wrapper">
            <label htmlFor="city">City*</label>
            <Controller
              name="city"
              control={control}
              defaultValue={cities[0]}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  id="city"
                  options={cities}
                  optionLabel="name"
                  editable
                  placeholder="Select a City"
                  className={`field-dropdown ${errors.city ? "p-invalid" : ""}`}
                />
              )}
            />
            {errors.city && (
              <small className="p-error">{errors.city.message}</small>
            )}
          </div>
          <div className="field-wrapper">
            <label htmlFor="profession">Profession*</label>
            <Controller
              name="profession"
              control={control}
              defaultValue={professions[0]}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  id="profession"
                  options={professions}
                  optionLabel="name"
                  editable
                  placeholder="Select a Profession"
                  className={`field-dropdown ${
                    errors.profession ? "p-invalid" : ""
                  }`}
                />
              )}
            />
            {errors.profession && (
              <small className="p-error">{errors.profession.message}</small>
            )}
          </div>
          <div className="field-wrapper">
            <label htmlFor="ward">Ward</label>
            <Controller
              name="ward"
              control={control}
              defaultValue={wards[0]}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  id="ward"
                  options={wards}
                  optionLabel="name"
                  editable
                  placeholder="Select a Ward"
                  className={`field-dropdown ${errors.ward ? "p-invalid" : ""}`}
                />
              )}
            />
            {errors.ward && (
              <small className="p-error">{errors.ward.message}</small>
            )}
          </div>
          <div className="field-wrapper">
            <label htmlFor="phone">
              <h4>Phone Number (Including Country Code) *</h4>
              <p>Example: 9779852025735</p>
            </label>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputText
                  id="phone"
                  {...field}
                  className={`field-input ${errors.phone ? "p-invalid" : ""}`}
                />
              )}
            />
            {errors.phone && (
              <small className="p-error">{errors.phone.message}</small>
            )}
          </div>
          <div className="field-wrapper">
            <label htmlFor="headshot">Headshot/ Profile Picture</label>
            {preview ? (
              <div className="preview-box">
                <div className="preview-image ">
                  <Image src={preview} alt="Preview" height={400} width={400} />
                </div>
                <div className="preview-actions">
                  <p title={file.name}>{truncate(file.name, 40)}</p>
                  <button
                    className="btn remove-btn"
                    onClick={() => {
                      setPreview(null);
                      setFile(null);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ) : (
              <MyDropzone onDrop={handleDrop} id="headshot" />
            )}
          </div>

          <div className="btn-container">
            <Button type="submit" label="Submit" className="btn submit-btn" />
            <p>
              Do not submit passwords through Airtable forms. Report malicious
              form
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MyForm;
