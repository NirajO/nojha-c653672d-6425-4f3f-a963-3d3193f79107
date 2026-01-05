import { hasRequiredRole } from './auth.js';
import { Role } from '@org/data';

describe('RBAC Role Hierarchy', () => {
  it('OWNER should satisfy ADMIN and VIEWER roles', () => {
    expect(hasRequiredRole(Role.OWNER, Role.ADMIN)).toBe(true);
    expect(hasRequiredRole(Role.OWNER, Role.VIEWER)).toBe(true);
  });

  it('ADMIN should satisfy VIEWER role', () => {
    expect(hasRequiredRole(Role.ADMIN, Role.VIEWER)).toBe(true);
  });

  it('ADMIN should NOT satisfy OWNER role', () => {
    expect(hasRequiredRole(Role.ADMIN, Role.OWNER)).toBe(false);
  });

  it('VIEWER should only satisfy VIEWER role', () => {
    expect(hasRequiredRole(Role.VIEWER, Role.VIEWER)).toBe(true);
    expect(hasRequiredRole(Role.VIEWER, Role.ADMIN)).toBe(false);
  });
});
