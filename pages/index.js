import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { joinNowValidationSchema } from "@/lib/validation";
import { useCallback, useRef, useState } from "react";
import MyDropzone from "@/components/MyDropzone";
import Image from "next/image";
import { Button } from "primereact/button";
import { FaTrash } from "react-icons/fa6";
import "react-image-crop/src/ReactCrop.scss";
import AvatarEditor from "react-avatar-editor";
import { TbPhotoEdit } from "react-icons/tb";
import { Dialog } from "primereact/dialog";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

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
  { name: "I Istanbul", code: "IST" },
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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(joinNowValidationSchema),
  });

  const [editorVisible, setEditorVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null); // State for cropped image
  const editor = useRef(null);

  const handleDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setPreview(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const handleSave = () => {
    if (editor.current) {
      const canvas = editor.current.getImage();
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      // Create a new canvas with transparency
      const transparentCanvas = document.createElement("canvas");
      transparentCanvas.width = width;
      transparentCanvas.height = height;
      const transparentContext = transparentCanvas.getContext("2d");

      // Draw a transparent background
      transparentContext.clearRect(0, 0, width, height);

      // Draw the circular cropped image
      transparentContext.save();
      transparentContext.beginPath();
      transparentContext.arc(width / 2, height / 2, width / 2, 0, 2 * Math.PI);
      transparentContext.clip();
      transparentContext.drawImage(canvas, 0, 0);
      transparentContext.restore();

      // Convert the transparent canvas to a data URL
      const dataUrl = transparentCanvas.toDataURL();
      setCroppedImage(dataUrl); // Update the cropped image state
      setPreview(dataUrl);
      setEditorVisible(false);
    }
  };

  const onSubmit = async (data) => {
    if (!croppedImage && preview) {
      // Prompt user to crop the image
      alert("Please crop the image before submitting.");
      setEditorVisible(true);
      return;
    }

    console.log(data);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify({
          ...data,
          profilePicture: croppedImage || preview,
        }), // Include croppedImage if available
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
                <div className="preview-image">
                  <Image src={preview} alt="Preview" height={400} width={400} />
                </div>
                <div className="preview-actions">
                  <p title={file.name}>{truncate(file.name, 40)}</p>
                  <div className="btn-container">
                    <button
                      type="button"
                      className="btn edit-btn"
                      onClick={() => {
                        setEditorVisible(true);
                      }}
                    >
                      <TbPhotoEdit />
                    </button>
                    <button
                      type="button"
                      className="btn remove-btn"
                      onClick={() => {
                        setPreview(null);
                        setFile(null);
                        setCroppedImage(null);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <MyDropzone onDrop={handleDrop} id="headshot" />
            )}
          </div>

          <div className="btn-container mt-8">
            {isSubmitting ? (
              <Button
                type="submit"
                label="Submitting..."
                className="btn submit-btn"
                disabled
              />
            ) : (
              <Button type="submit" label="Submit" className="btn submit-btn" />
            )}
            <p>Do not submit passwords through forms. Report malicious form.</p>
          </div>
        </form>
      </div>
      <Dialog visible={editorVisible} onHide={() => setEditorVisible(false)}>
        {preview && (
          <>
            <h4>Crop Image</h4>
            <AvatarEditor
              image={preview}
              width={250}
              borderRadius={99999}
              height={250}
              scale={1 + scale / 100}
              ref={editor}
            />
            <button
              className="btn close-btn"
              onClick={() => setEditorVisible(false)}
            >
              <IoMdClose />
            </button>
            <div className="crop-actions">
              <input
                type="range"
                min="0"
                max="100"
                value={scale}
                className="slider"
                onChange={(e) => setScale(e.target.value)}
              />
              <button className="btn save-btn" onClick={handleSave}>
                Save <FaCheckCircle />
              </button>
            </div>
          </>
        )}
      </Dialog>
    </section>
  );
};

export default MyForm;
