# Copilot Instructions for AI Agents

## Project Overview
This is a Next.js 15 project for managing employee leave requests. The app uses the `/src/app` directory structure with Next.js App Router. Major UI components are built with Material UI (MUI) and some custom styling. Data is currently mocked in code; there is no backend integration yet.

## Key Architecture & Patterns
- **Pages & Routing:**
  - All pages are under `src/app/`. Use file-based routing (e.g., `employees/page.tsx`, `leaveRequests/page.tsx`).
  - Dynamic routes use bracket notation, e.g., `employees/[emp-id]/page.tsx`.
- **Components:**
  - Shared UI components are in `src/app/components/` (e.g., `EmployeesTable.tsx`, `EmployeeDetail.tsx`, `SearchBar.tsx`).
  - Components use MUI for layout and controls. Use `sx` prop for inline styling.
- **Data Flow:**
  - Employee and leave request data is mocked in-page or in components. No API calls or server-side data fetching yet.
  - Example: `employees/page.tsx` and `[emp-id]/page.tsx` use hardcoded arrays for employee data.
- **State Management:**
  - Local state is managed with React hooks (`useState`). No global state or context is used.
- **Navigation:**
  - Use Next.js `useRouter` for client-side navigation (e.g., row click in `EmployeesTable` navigates to employee detail).

## Developer Workflows
- **Start Dev Server:**
  - `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`)
- **Build for Production:**
  - `npm run build`
- **Linting:**
  - `npm run lint` (uses ESLint and `eslint-config-next`)
- **No tests or backend integration yet.**

## Project-Specific Conventions
- **TypeScript:** All code is written in TypeScript. Use explicit interfaces for props and data models (see `Employee` interface in `EmployeesTable.tsx`).
- **MUI Usage:** Prefer MUI components for layout and controls. Use the `sx` prop for custom styles.
- **File Naming:**
  - Page files are always named `page.tsx`.
  - Component files use PascalCase (e.g., `EmployeeDetail.tsx`).
- **Mock Data:**
  - Employee data is hardcoded in page/component files. Update these arrays to change sample data.

## Integration Points
- **No external API or backend yet.**
- **No authentication or user management.**
- **No persistent storage.**

## Examples
- To add a new employee field, update the `Employee` interface in `EmployeesTable.tsx` and all mock data arrays.
- To add a new page, create a new folder under `src/app/` and add a `page.tsx` file.
- To customize UI, edit MUI component props and `sx` styles in the relevant component file.

## Key Files & Directories
- `src/app/employees/page.tsx` — Employee list and search UI
- `src/app/employees/[emp-id]/page.tsx` — Employee detail page
- `src/app/components/EmployeesTable.tsx` — Table component for employees
- `src/app/components/EmployeeDetail.tsx` — Card component for employee details
- `src/app/leaveRequests/page.tsx` — Leave requests page (placeholder)

---

If any section is unclear or missing, please provide feedback so this guide can be improved.