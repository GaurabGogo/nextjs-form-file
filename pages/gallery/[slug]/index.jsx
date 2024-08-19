"use client";
import fs from "fs";
import Image from "next/image";
import Link from "next/link";
import path from "path";

export async function getServerSideProps(context) {
  const { query } = context;
  const { slug } = query;

  // Get the directory path
  const directoryPath = path.join(process.cwd(), `/public/gallery/${slug}`);

  const isImage = (filename) => {
    const ext = path.extname(filename).toLowerCase();
    return ext === ".jpg" || ext === ".png";
  };

  try {
    // Check if directory exists
    if (!fs.existsSync(directoryPath)) {
      return {
        notFound: true,
      };
    }

    // Read files from the directory
    const filenames = fs.readdirSync(directoryPath);

    // Filter and map through filenames to create a list of file details
    const files = filenames
      .filter(isImage) // Filter out non-image files
      .map((filename) => {
        const filePath = path.join(directoryPath, filename);

        // Get file stats for additional details if needed
        const fileStats = fs.statSync(filePath);

        return {
          filename,
          path: `/gallery/${slug}/${filename}`,
          size: fileStats.size, // Size in bytes
          createdAt: fileStats.birthtime.toISOString(), // Convert Date to ISO string
        };
      });

    return {
      props: {
        query,
        files,
      },
    };
  } catch (error) {
    console.error("Error reading directory:", error);
    return {
      notFound: true,
    };
  }
}

const FilesPage = ({ files, query }) => {
  return (
    <section className="section-padding single-gallery-page-section">
      <div className="container">
        <div className="gallery-container">
          {files.map((file) => (
            <div key={file.filename} className="card">
              <div className="image-container">
                <Image
                  src={file.path}
                  alt={file.filename}
                  width={300}
                  height={200}
                  className="image"
                />
              </div>

              <div className="card-content">
                <h3 className="card-title">{file.filename}</h3>
                <p className="card-text">Size: {file.size} bytes</p>
                <p className="card-text">
                  Created: {new Date(file.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilesPage;
