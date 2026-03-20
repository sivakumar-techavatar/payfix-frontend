import { useState } from "react";
import Collapse from "@mui/material/Collapse";

export default function FaqSection({
  title = "",
  faqs = [],
}: {
  title?: string;
  faqs?: {
    q: string;
    a: string;
  }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section>
      <div>
        {title && (
          <div className="sec-title center">
            <div
              className="eyebrow-bar"
              style={{ margin: "0 auto 14px" }}
            ></div>

            <span className="eyebrow">Common Questions</span>
            <h2>{title}</h2>
          </div>
        )}

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={faq.q}>
              <button className="faq-q" onClick={() => toggleFaq(index)}>
                {faq.q}
                <i
                  className={`fa fa-chevron-down ${
                    openIndex === index ? "rotate" : ""
                  }`}
                />
              </button>

              <Collapse in={openIndex === index} timeout="auto">
                <div className="faq-a">{faq.a}</div>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
