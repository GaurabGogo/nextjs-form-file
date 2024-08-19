import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import ResponsiveTable from "@/components/UI/ResponsiveTable";

const DownloadPage = () => {
  const data = React.useMemo(
    () => [
      {
        col1: "1",
        col2: "Android App",
        col3: ".apk",
        col4: "8.68 MB",
        link: "https://play.google.com/store/apps/details?id=com.example.app",
      },
      {
        col1: "2",
        col2: "Press Release",
        col3: ".pdf",
        col4: "684 KB",
        link: "https://example.com/press-release.pdf",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Particular",
        accessor: "col2",
      },
      {
        Header: "Type",
        accessor: "col3",
      },
      {
        Header: "Size",
        accessor: "col4",
      },
      {
        Header: "Actions",
        accessor: "link",
        Cell: ({ cell: { value } }) => (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-end items-center sm:justify-center"
          >
            <button className="download-btn">
              <FaCloudDownloadAlt />
            </button>
          </a>
        ),
      },
    ],
    []
  );

  return (
    <section className="download-page-section">
      <div className="container">
        <div className="download-page-table">
          <h1>My Responsive Table</h1>
          <ResponsiveTable columns={columns} data={data} />
        </div>
      </div>
    </section>
  );
};

export default DownloadPage;
