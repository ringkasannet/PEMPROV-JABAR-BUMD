export const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://ringkasan.net";
