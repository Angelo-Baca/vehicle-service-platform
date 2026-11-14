
# Validation and Testing Notes

## Phase 3 — Verified

- GET all vehicles from PostgreSQL
- GET vehicle by ID
- POST a new vehicle
- PUT an existing vehicle
- DELETE an existing vehicle
- Persistence after server restart
- GET nonexistent vehicle returns HTTP 404
- GET invalid vehicle ID returns HTTP 400
- PUT nonexistent vehicle returns HTTP 404
- DELETE nonexistent vehicle returns HTTP 404
- TypeScript compilation succeeds

## Phase 4 — Planned

- Validate make, model, and year for POST and PUT
- Reject missing or incorrectly typed fields
- Enforce reasonable field lengths and year ranges
- Validate vehicle IDs consistently across routes
- Return standardized HTTP 400 responses for invalid request bodies
- Introduce automated integration tests
- Add centralized error handling
- Test database failures and malformed JSON

These items are planned improvements, not completed functionality.
