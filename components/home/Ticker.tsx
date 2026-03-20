import { Box } from "@mui/material";

const tickerItems = [
  {
    label: "Payroll Processing",
    icon: (
      <>
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </>
    )
  },
  {
    label: "PF & ESIC Filing",
    icon: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    )
  },
  {
    label: "TDS & Form 16",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </>
    )
  },
  {
    label: "Professional Tax",
    icon: (
      <>
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
        <line x1="4" y1="22" x2="4" y2="15"/>
      </>
    )
  },
  {
    label: "Labour Law Compliance",
    icon: (
      <>
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 01-3.46 0"/>
      </>
    )
  }
];

const Ticker = () => {
  return (
    <Box className="ticker-bar" aria-hidden="true">

      <Box className="ticker-track">

        {[...tickerItems, ...tickerItems].map((item, i) => (
          <Box className="ticker-item" key={i}>

            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{
                verticalAlign: "-2px",
                marginRight: "5px"
              }}
            >
              {item.icon}
            </svg>

            {item.label}

          </Box>
        ))}

      </Box>

    </Box>
  );
};

export default Ticker;