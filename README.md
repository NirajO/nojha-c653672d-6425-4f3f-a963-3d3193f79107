# Role-Based Task Management System (NX Monorepo)
This project is a full-stack role-based access control (RBAC) task management system built using an # NX monorepo, containing:
	1. Backend (NestJS API) - Authentication, RBAC, organizations, tasks
	2. Frontend (Angular Dashboard) - Login, role-aware UI, task management
	3. Shared Libraries - Shared TypeScript models, auth utilities, and UI components

# 1. Clone Repository
git clone <repo-url>
cd <repo-folder>

# 2. Install Dependencies
npm install

# 3. Environment Variables 
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=rbac

# 4. Run Applications
# Backend (NestJS API)
nx serve api

API runs at:
http://localhost:3333

# Frontend (Angular Dashboard)
nx serve dashboard

# Dashboard runs at:
http://localhost:4200

# 🏛️ Architecture Overview
This monorepo uses NX to organize applications and shared libraries.
# Structure
root/ 
	api/          # NestJS backend
	dashboard/    # Angular dashboard
	data/					# Shared TypeORM entities, enums, interfaces
	auth/					# Shared Auth Logic (API)
	libs/
		auth-ui/		# Shared UI components/services for frontend

# Why NX?
1. Modular structure
2. Shared logic across backend & frontend
3. Fast builds (caching, dependency graphing)
4. Cleaner architecture for large systems

# 🗄️ Data Model Explanation
The core entities:
| Entity           | Description                          |
| ---------------- | ------------------------------------ |
| **User**         | Has role, belongs to an organization |
| **Organization** | Supports hierarchical structure      |
| **Task**         | Created/owned by a user              |
| **Role Enum**    | ADMIN, MANAGER, VIEWER               |

# ERD (Text Representation)
Organization (1) ───── (∞) User
     ↑                      │
     └──── parent-child     │
                            │
User (1) ─────── (∞) Task

Users inherit permissions from their organization
Tasks are only accessible based on RBAC rules

# 🔐 Access Control Implementation
Role Permissions
ADMIN: full control over all orgs
MANAGER: manage tasks in their log
VIEWER: read-only

# JWT Authentication Flow
1. User logs in -> receives JWT containing:
   userId
   role
   organizationId
2. Token is stored in localStorage
3. Frontend attaches token via HttpInterceptor
4. Backend uses guards + role checks to determine access

# Organization Hierarchy Rules 
Example:
Parent Org
 ├── Child Org A
 ├── Child Org B
Admin sees everything
Manager sees own org and children
Viewer sees read-only tasks

# 📘 API Documentation
1. Auth
	POST /auth/login
2. Organizations
   GET /organizations
   Returns org tree.
   
   POST/organizations
   Admin-only
3. Taks
   GET /tasks
   Returns tasks permitted by user's role.

	 POST /tasks
   Create task.

	 PUT /tasks/:id
	 Update task (Manager/Admin)

   DELETE /tasks/:id
   Delete task.

# 🧭 Future Considerations
# 1. Advanced Role Delegation
   1. Temporary permissions
   2. Team-based access rules

# 2. Production Security Imporvements
	1. JWT refresh token
	2. CSRF protection
	3. Rate limiting
	4. RBAC caching

# 3. Scaling Acces Control
	1. Precomputed hierarchies
	2. Cached permission trees

