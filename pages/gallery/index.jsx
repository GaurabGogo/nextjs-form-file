import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { GrLocation } from "react-icons/gr";

const galleryData = [
  {
    title: "Beach",
    slug: "beach",
    type: "Event",
    location: "San Francisco, CA",
    date: "2023-03-01",
  },
  {
    title: "Beach",
    slug: "himalayan",
    type: "Event",
    location: "San Francisco, CA",
    date: "2023-03-01",
  },
  {
    title: "Beach",
    slug: "beach",
    type: "Event",
    location: "San Francisco, CA",
    date: "2023-03-01",
  },
];

const GalleryPage = () => {
  const router = useRouter();

  const handleNavigation = (slug) => {
    router.push(`/gallery/${slug}`);
  };

  return (
    <section className="section-padding gallery-page-section">
      <div className="container">
        <div className="gallery-container">
          {galleryData.map((gallery) => (
            <div key={gallery.slug} className="card">
              <div className="image-container">
                <Image
                  src={`/gallery/1.jpg`}
                  alt={gallery.title}
                  width={300}
                  height={200}
                />
              </div>

              <div className="card-content">
                <span className="card-type">{gallery.type}</span>
                <h3 className="card-title">{gallery.title}</h3>
                <p className="card-location">
                  <GrLocation />
                  {gallery.location}
                </p>
                <p className="card-date">{gallery.date}</p>
                <button
                  className="btn primary-btn"
                  onClick={() => handleNavigation(gallery.slug)}
                >
                  View Gallery
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
