import { Role } from '@org/data';

/**
 * Defines role hirerarchy from highest to lowest privilige.
 * Higher roles inherit permissions of lower roles.
 */

const ROLE_HIERARCHY: Record<Role, Role[]> = {
  [Role.OWNER]: [Role.OWNER, Role.ADMIN, Role.VIEWER],
  [Role.ADMIN]: [Role.ADMIN, Role.VIEWER],
  [Role.VIEWER]: [Role.VIEWER],
};

/**
 * Checks whether a user's role satisfies a required role.
 */
export function hasRequiredRole (
  userRole: Role,
  requiredRole: Role
): boolean {
  return ROLE_HIERARCHY[userRole]?.includes(requiredRole) ?? false;
}