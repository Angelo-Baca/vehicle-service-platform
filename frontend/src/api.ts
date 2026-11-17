export type Vehicle = {
  id: number;
  make: string;
  model: string;
  year: number;
};

export type VehicleInput = Omit<Vehicle, "id">;


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";



async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Unable to reach the API. Check the backend connection.");
  }

  const raw = await response.text();
  let payload: unknown = null;

  try {
    payload = raw ? JSON.parse(raw) : null;
  } catch {
    // Server may return non-JSON errors.
  }

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : `Request failed (HTTP ${response.status}).`;

    throw new Error(message);
  }

  return payload as T;
}


export async function listVehicles(): Promise<Vehicle[]> {
  // Existing Express controller responds with { message: Vehicle[] }.
  const result = await request<{ message: Vehicle[] }>("/vehicles");
  if (!Array.isArray(result.message)) throw new Error("Unexpected API response format.");
  return result.message;
}

export const createVehicle = (data: VehicleInput) => request<Vehicle>("/vehicles", { method: "POST", body: JSON.stringify(data) });
export const updateVehicle = (id: number, data: VehicleInput) => request<Vehicle>(`/vehicles/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteVehicle = (id: number) => request<Vehicle>(`/vehicles/${id}`, { method: "DELETE" });
