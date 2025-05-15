// src/services/api-instance.ts

import axios from "axios";

export const ApiInstance = axios.create({
  baseURL: "https://apic.polytech.kz/api/v1",
});
