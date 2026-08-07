import type { Access, FieldAccess, PayloadRequest } from "payload";

// ---------------------------------------------------------------------------
// Autorización centralizada — ÚNICO punto de verdad para reglas de acceso.
// Toda colección/global importa de aquí; nunca se escriben chequeos de rol
// inline en los schemas.
// ---------------------------------------------------------------------------

export type Role = "admin" | "editor";

function hasRole(req: PayloadRequest, ...roles: Role[]): boolean {
  const user = req.user;
  if (!user || user.collection !== "users") return false;
  return roles.includes(user.role as Role);
}

/** Solo administradores. */
export const isAdmin: Access = ({ req }) => hasRole(req, "admin");

/** Administradores y editores (todo el equipo de contenido). */
export const isAdminOrEditor: Access = ({ req }) => hasRole(req, "admin", "editor");

/** Administradores, o el propio usuario sobre su documento en `users`. */
export const isAdminOrSelf: Access = ({ req, id }) => {
  if (hasRole(req, "admin")) return true;
  if (!req.user || req.user.collection !== "users") return false;
  return req.user.id === id;
};

/** Lectura pública (contenido publicado del sitio). */
export const anyone: Access = () => true;

/**
 * Lectura para colecciones con borradores: el público solo ve lo publicado;
 * el equipo (admin/editor) también ve borradores.
 */
export const publishedOrEditor: Access = ({ req }) => {
  if (hasRole(req, "admin", "editor")) return true;
  return { _status: { equals: "published" } };
};

/** Acceso a nivel de campo: solo administradores pueden modificarlo. */
export const fieldAdminOnly: FieldAccess = ({ req }) => hasRole(req, "admin");
