import "./styles.css";
import { createVehicle, deleteVehicle, listVehicles, updateVehicle, type Vehicle, type VehicleInput } from "./api";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Application root not found");

let vehicles: Vehicle[] = [];
let query = "";
let editingId: number | null = null;
let deletingId: number | null = null;
let busy = false;
let errorMessage = "";
let notice = "";
let loaded = false;

const escapeHtml = (value: string | number) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char] ?? char);

function filteredVehicles() {
  const term = query.trim().toLowerCase();
  return vehicles.filter((vehicle) => `${vehicle.make} ${vehicle.model} ${vehicle.year} ${vehicle.id}`.toLowerCase().includes(term));
}

function renderRows() {
  const rows = filteredVehicles();
  const tbody = document.querySelector<HTMLTableSectionElement>("#vehicle-rows");
  if (!tbody) return;
  tbody.innerHTML = rows.length ? rows.map((vehicle) => `
    <tr>
      <td><span class="vehicle-icon">◈</span><span class="vehicle-name"><strong>${escapeHtml(vehicle.make)} ${escapeHtml(vehicle.model)}</strong><small>Vehicle #${escapeHtml(vehicle.id)}</small></span></td>
      <td>${escapeHtml(vehicle.make)}</td>
      <td>${escapeHtml(vehicle.model)}</td>
      <td>${escapeHtml(vehicle.year)}</td>
      <td><span class="status-dot"></span> Registered</td>
      <td class="actions"><button class="icon-button" data-edit="${vehicle.id}" aria-label="Edit vehicle ${vehicle.id}" title="Edit">✎</button><button class="icon-button danger" data-delete="${vehicle.id}" aria-label="Delete vehicle ${vehicle.id}" title="Delete">✕</button></td>
    </tr>`).join("") : `<tr><td colspan="6" class="empty">${loaded ? "No vehicles match your search." : "Loading vehicles…"}</td></tr>`;
  document.querySelector<HTMLElement>("#result-count")!.textContent = `${rows.length} vehicle${rows.length === 1 ? "" : "s"}`;
}

const environmentLabel = import.meta.env.PROD
  ? "PRODUCTION"
  : "DEVELOPMENT";

const locationLabel = import.meta.env.PROD
  ? "CLOUD DEPLOYMENT"
  : "LOCAL DEVELOPMENT";

function render() {
  app!.innerHTML = `
    <div class="layout">
      <aside class="sidebar">
        <div class="brand"><span class="brand-mark">V<span>·</span></span><div><strong>VELOCITY</strong><small>SERVICE PLATFORM</small></div></div>
        <div class="nav-label">WORKSPACE</div>
        <div class="nav-item active"><span>▦</span> Overview</div>
        <div class="nav-item"><span>▤</span> Vehicle Inventory</div>
        <div class="sidebar-bottom"><div class="environment"><span class="status-dot"></span> ${locationLabel}</div><small>Backend: Express + PostgreSQL</small><small>Frontend: TypeScript + Vite</small></div>
      </aside>
      <main class="main">
        <header class="topbar"><div class="breadcrumb">Workspace <span>/</span> <strong>Overview</strong></div><div class="top-right"><span class="environment-tag">${environmentLabel}</span><span class="avatar">VS</span></div></header>
        <div class="content">
          <div class="eyebrow">FLEET MANAGEMENT <span class="eyebrow-line"></span> OPERATIONS</div>
          <div class="heading-row"><div><h1>Vehicle overview<span class="blue-period">.</span></h1><p class="subtitle">A central place to manage your vehicle inventory.</p></div><button class="primary" id="add-vehicle"><span>＋</span> Add vehicle</button></div>
          <section class="metrics">
            <div class="metric"><div class="metric-label">TOTAL VEHICLES <span>↗</span></div><div class="metric-number">${vehicles.length.toLocaleString()}</div><div class="metric-foot"><span class="metric-accent">●</span> Live database records</div></div>
            <div class="metric"><div class="metric-label">REGISTERED MAKES <span>◇</span></div><div class="metric-number">${new Set(vehicles.map(v => v.make.trim().toLowerCase())).size}</div><div class="metric-foot">Across your inventory</div></div>
            <div class="metric"><div class="metric-label">LATEST MODEL YEAR <span>◷</span></div><div class="metric-number">${vehicles.length ? Math.max(...vehicles.map(v => v.year)) : "—"}</div><div class="metric-foot">Most recent model in fleet</div></div>
          </section>
          <section class="inventory-panel"><div class="panel-heading"><div><div class="eyebrow small">INVENTORY / VEHICLES</div><h2>Vehicle registry</h2><p>Manage vehicles stored in your PostgreSQL database.</p></div><div class="count-chip" id="result-count"></div></div>
          <div class="toolbar"><label class="search-box"><span>⌕</span><input id="search" type="search" placeholder="Search make, model, year, or ID…" value="${escapeHtml(query)}" aria-label="Search vehicles" /></label><span class="table-caption">LIVE API DATA</span></div>
          <div class="table-wrap"><table><thead><tr><th>VEHICLE</th><th>MAKE</th><th>MODEL</th><th>YEAR</th><th>STATUS</th><th class="actions">ACTIONS</th></tr></thead><tbody id="vehicle-rows"></tbody></table></div>
          <div class="panel-footer"><span>Data source: <strong>GET /vehicles</strong></span><button class="refresh" id="refresh">↻ Refresh inventory</button></div></section>
          <footer class="footer"><span>VELOCITY / VEHICLE SERVICE PLATFORM</span><span>Built with TypeScript · Express · PostgreSQL</span></footer>
        </div>
      </main>
    </div>
    <div id="toast" class="toast" role="status" aria-live="polite"></div>
    <dialog id="vehicle-dialog" class="dialog"><form id="vehicle-form" novalidate><div class="dialog-top"><div><div class="eyebrow small">VEHICLE MANAGEMENT</div><h2 id="form-title">Add vehicle</h2></div><button type="button" class="close-button" id="close-dialog" aria-label="Close">✕</button></div><p class="dialog-description">Vehicle details are saved to your PostgreSQL database.</p><label>Make<input name="make" maxlength="100" required placeholder="e.g. Toyota" /></label><label>Model<input name="model" maxlength="100" required placeholder="e.g. Tacoma" /></label><label>Year<input name="year" type="number" min="1886" max="2100" required placeholder="e.g. 2024" /></label><div class="form-error" id="form-error" role="alert"></div><div class="dialog-actions"><button type="button" class="secondary" id="cancel-form">Cancel</button><button type="submit" class="primary" id="save-vehicle">Save vehicle</button></div></form></dialog>
    <dialog id="delete-dialog" class="dialog"><div class="dialog-top"><h2>Delete vehicle?</h2><button class="close-button" id="close-delete" aria-label="Close">✕</button></div><p class="dialog-description" id="delete-description">This action cannot be undone.</p><div class="form-error" id="delete-error" role="alert"></div><div class="dialog-actions"><button class="secondary" id="cancel-delete">Cancel</button><button class="delete-confirm" id="confirm-delete">Delete vehicle</button></div></dialog>
  `;
  renderRows();
  bindEvents();
  if (errorMessage) showToast(errorMessage, true);
  else if (notice) showToast(notice);
}

function showToast(message: string, isError = false) {
  const toast = document.querySelector<HTMLElement>("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast visible ${isError ? "error" : ""}`;
}

function vehicleDialog() { return document.querySelector<HTMLDialogElement>("#vehicle-dialog")!; }
function deleteDialog() { return document.querySelector<HTMLDialogElement>("#delete-dialog")!; }

function openForm(id: number | null) {
  editingId = id;
  const form = document.querySelector<HTMLFormElement>("#vehicle-form")!;
  form.reset();
  document.querySelector<HTMLElement>("#form-error")!.textContent = "";
  document.querySelector<HTMLElement>("#form-title")!.textContent = id === null ? "Add vehicle" : "Edit vehicle";
  if (id !== null) {
    const vehicle = vehicles.find(v => v.id === id);
    if (!vehicle) return;
    (form.elements.namedItem("make") as HTMLInputElement).value = vehicle.make;
    (form.elements.namedItem("model") as HTMLInputElement).value = vehicle.model;
    (form.elements.namedItem("year") as HTMLInputElement).value = String(vehicle.year);
  }
  vehicleDialog().showModal();
}

function bindEvents() {
  document.querySelector<HTMLButtonElement>("#add-vehicle")!.onclick = () => openForm(null);
  document.querySelector<HTMLInputElement>("#search")!.oninput = (event) => {
    query = (event.target as HTMLInputElement).value;
    renderRows();
  };
  document.querySelector<HTMLButtonElement>("#refresh")!.onclick = () => void loadVehicles();
  document.querySelector<HTMLElement>("#vehicle-rows")!.onclick = (event) => {
    const target = event.target as HTMLElement;
    const edit = target.closest<HTMLButtonElement>("[data-edit]");
    const del = target.closest<HTMLButtonElement>("[data-delete]");
    if (edit) openForm(Number(edit.dataset.edit));
    if (del) {
      deletingId = Number(del.dataset.delete);
      const vehicle = vehicles.find(v => v.id === deletingId);
      document.querySelector<HTMLElement>("#delete-description")!.textContent = `Delete ${vehicle?.make ?? "this"} ${vehicle?.model ?? "vehicle"} (ID ${deletingId})? This cannot be undone.`;
      document.querySelector<HTMLElement>("#delete-error")!.textContent = "";
      deleteDialog().showModal();
    }
  };
  document.querySelector<HTMLButtonElement>("#close-dialog")!.onclick = () => vehicleDialog().close();
  document.querySelector<HTMLButtonElement>("#cancel-form")!.onclick = () => vehicleDialog().close();
  document.querySelector<HTMLButtonElement>("#close-delete")!.onclick = () => deleteDialog().close();
  document.querySelector<HTMLButtonElement>("#cancel-delete")!.onclick = () => deleteDialog().close();
  document.querySelector<HTMLFormElement>("#vehicle-form")!.onsubmit = (event) => void saveVehicle(event);
  document.querySelector<HTMLButtonElement>("#confirm-delete")!.onclick = () => void removeVehicle();
}

async function saveVehicle(event: SubmitEvent) {
  event.preventDefault();
  if (busy) return;
  const form = event.currentTarget as HTMLFormElement;
  const make = (form.elements.namedItem("make") as HTMLInputElement).value.trim();
  const model = (form.elements.namedItem("model") as HTMLInputElement).value.trim();
  const yearText = (form.elements.namedItem("year") as HTMLInputElement).value;
  const year = Number(yearText);
  const error = document.querySelector<HTMLElement>("#form-error")!;
  if (!make || !model || make.length > 100 || model.length > 100 || !yearText || !Number.isInteger(year) || year < 1886 || year > 2100) {
    error.textContent = "Enter a make and model (up to 100 characters) and a valid year from 1886 to 2100.";
    return;
  }
  const data: VehicleInput = { make, model, year };
  const button = document.querySelector<HTMLButtonElement>("#save-vehicle")!;
  busy = true; button.disabled = true; button.textContent = "Saving…";
  try {
    if (editingId === null) await createVehicle(data);
    else await updateVehicle(editingId, data);
    vehicleDialog().close();
    notice = editingId === null ? "Vehicle added successfully." : "Vehicle updated successfully.";
    errorMessage = "";
    await loadVehicles();
  } catch (err) { error.textContent = err instanceof Error ? err.message : "Unable to save vehicle."; }
  finally { busy = false; button.disabled = false; button.textContent = "Save vehicle"; }
}

async function removeVehicle() {
  if (busy || deletingId === null) return;
  const button = document.querySelector<HTMLButtonElement>("#confirm-delete")!;
  busy = true; button.disabled = true; button.textContent = "Deleting…";
  try {
    await deleteVehicle(deletingId);
    deleteDialog().close();
    notice = "Vehicle deleted successfully.";
    errorMessage = "";
    await loadVehicles();
  } catch (err) { document.querySelector<HTMLElement>("#delete-error")!.textContent = err instanceof Error ? err.message : "Unable to delete vehicle."; }
  finally { busy = false; button.disabled = false; button.textContent = "Delete vehicle"; }
}

async function loadVehicles() {
  try {
    vehicles = await listVehicles();
    errorMessage = "";
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : "Unable to load vehicles.";
  } finally {
    loaded = true;
    render();
  }
}

render();
void loadVehicles();
