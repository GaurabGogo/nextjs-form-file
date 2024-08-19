import React from "react";
import Accordion from "@/components/UI/Accordion";

const FaqPage = () => {
  const accordionItems = [
    {
      title: "Section 1",
      content: "Content for section 1",
    },
    {
      title: "Section 2",
      content: "Content for section 2",
    },
    {
      title: "Section 3",
      content: "Content for section 3",
    },
  ];

  return (
    <div className="container">
      <h1>Accordion Example</h1>
      <Accordion items={accordionItems} />
    </div>
  );
};

export default FaqPage;
