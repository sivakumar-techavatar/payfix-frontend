import { Icon } from "@/components/common/Icon";

export const PanIndiaBanner = () => {
  return (
    <div className="pan-india">
      <div className="pan-india-inner container">
        <h2>
          <Icon
            name="globe"
            style={{ marginRight: 10, color: "rgba(255,255,255,.7)" }}
          />
          Serving Businesses Across Every State in India
        </h2>
        <p>
          Onsite: Tamil Nadu · Puducherry · Bangalore · Hyderabad &nbsp;|&nbsp;
          All other locations served remotely &nbsp;|&nbsp; Onsite visits
          available on request
        </p>
      </div>
    </div>
  );
};

export default PanIndiaBanner;
