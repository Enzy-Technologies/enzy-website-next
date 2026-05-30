// Shared constants for the pricing tool's password gate. The actual password is
// only ever compared on the server (see ./api route handler) and is never
// shipped to the client. The cookie just stores an opaque "granted" marker.
export const PRICING_TOOL_COOKIE = "pricing_tool_access"
export const PRICING_TOOL_COOKIE_VALUE = "granted"
