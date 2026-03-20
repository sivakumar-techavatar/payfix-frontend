export const getMailId = () => process.env.NEXT_PUBLIC_MAIL_ID;
export const getPhNo = () => process.env.NEXT_PUBLIC_CONTACT_NUMBER;

export const openWA = (message?: string, link?: string) => {
  const phone = getPhNo();

  if (!phone) return "";

  const base = message?.trim() || "Hi";

  const fullMessage = link
    ? `${base}, I'm interested in this and would like more details: ${link}`
    : base;

  const encoded = encodeURIComponent(fullMessage);

  return `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
};

export const sendWAMessage = (message?:string, link?: string) => {
  const url = openWA(message, link);
  if (url) window.open(url, "_blank", "noopener,noreferrer");
};
