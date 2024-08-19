import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { IoIosClose } from "react-icons/io";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const certificate = [
  {
    title: "Apple",
    fileUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8xaOM1dpbkEuv3xyRd9OPMl7opxAI5DQuCg&s",
    thumb:
      "https://slidemodel.com/wp-content/uploads/FF0417-01-free-certificate-template-16x9-1.jpg",
    type: "image", // Added type field
  },
  {
    title: "Google",
    fileUrl:
      "https://www.google.com/about/company/user-experience/policies/google-chrome-frame-developer-policy/",
    thumb:
      "https://slidemodel.com/wp-content/uploads/FF0417-01-free-certificate-template-16x9-1.jpg",
    type: "pdf", // Added type field
  },
];

const CertificatePage = () => {
  const [index, setIndex] = useState(0);
  const [content, setContent] = useState({
    fileUrl: null,
    title: null,
    type: null,
  });
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setContent({
      fileUrl: certificate[index].fileUrl,
      title: certificate[index].title,
      type: certificate[index].type,
    });
  }, [index]);

  return (
    <>
      <section className="certificate-page-section section-padding">
        <div className="container">
          <div className="certificate-container">
            {certificate?.map((item, idx) => (
              <div className="certificate-card" key={idx}>
                <h2>{item?.title}</h2>
                <div
                  className="img-container"
                  onClick={() => {
                    setIndex(idx);
                    setShowDialog(true);
                  }}
                >
                  <img src={item?.thumb} alt="thumb" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Dialog
        header="Header"
        visible={showDialog}
        style={{ width: "80vw", height: "80vh" }}
        onHide={() => setShowDialog(false)}
        className="pdf-dialog"
        dismissableMask
      >
        <div
          className="left-nav"
          onClick={() => {
            if (index > 0) setIndex(index - 1);
          }}
        >
          <AiFillCaretLeft />
        </div>
        <div
          className="right-nav"
          onClick={() => {
            if (index < certificate.length - 1) setIndex(index + 1);
          }}
        >
          <AiFillCaretRight />
        </div>
        <div className="close-btn" onClick={() => setShowDialog(false)}>
          <IoIosClose />
        </div>
        <div className="content-container">
          {content.type === "pdf" ? (
            <iframe src={content.fileUrl} title="PDF Viewer" />
          ) : (
            <div className="img-container">
              <img src={content.fileUrl} alt={content.title} />
            </div>
          )}
        </div>
        <div className="legend flex justify-between items-center">
          <p>{content.title}</p>
          <p>
            {index + 1}/{certificate.length}
          </p>
        </div>
      </Dialog>
    </>
  );
};

export default CertificatePage;
