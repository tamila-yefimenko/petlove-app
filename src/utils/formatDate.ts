export const formatDate = (dateString: string) => {
  if (!dateString) return "";

  const normalized = dateString.replace("+0000", "Z");

  const date = new Date(normalized);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
