# Egypt Dreams – Admin Dashboard Implementation

Implement the Admin Dashboard UI based on the provided dashboard reference image, following the existing project's architecture, structure, and `AGENTS.md` instructions.

## 1. Before Starting
- Inspect the existing project structure, `AGENTS.md`, admin routes, components, authentication flow, and available frontend functionality.
- Inspect the existing backend API documentation:
  `https://touristy.runasp.net/swagger/index.html`
- API Base URL: `https://touristy.runasp.net`
- Identify the existing API endpoints and data models relevant to the dashboard.
- Reuse existing API integrations and frontend logic wherever available.

## 2. Dashboard Layout
Follow the provided reference image for the overall layout and section arrangement:

- Left sidebar navigation.
- Main dashboard content area.
- Statistics cards.
- Top Trips / Booking Leaders section.
- Daily Report section.

Adapt the design to the Egypt Dreams visual identity rather than copying the reference image's branding.

## 3. Sidebar Navigation
- Audit all existing admin routes and backend modules.
- Preserve all existing sidebar items and their functionality.
- Include relevant modules that administrators can actually manage through the existing backend.
- Organize related items into clear groups.
- Keep existing routes, permissions, and authentication behavior intact.
- Do not invent routes, modules, or unsupported functionality.
- If a backend module has no corresponding frontend page, report it separately instead of creating a fake or incomplete page.

## 4. API & Data Integration
- Use the existing Touristy API only where supported by its documented endpoints.
- Connect dashboard statistics and report sections to real available API data.
- Reuse existing API services, hooks, types, and utilities.
- Do not use dummy data, hardcoded statistics, or fabricated records.
- Do not invent API endpoints, fields, or response structures.
- If a required endpoint or data field does not exist, leave that specific section unconnected and report what is missing.

## 5. Design & Responsiveness
Apply the Egypt Dreams design system:

- Headings: Cormorant Garamond.
- Body: Lato.
- Colors:
  - `#FFFFFF`
  - `#000000`
  - `#888888`
  - `#F7EDE1`
  - `#E8B34A`
  - `#013E51`
- Follow the existing design instructions for card radii, borders, shadows, spacing, and gradients.
- Use the actual Egypt Dreams logo and available project assets.
- Make the dashboard responsive across desktop, tablet, and mobile.
- Keep the UI clean, consistent, and professional.

## 6. Strict Restrictions
- Frontend implementation only.
- Do not create, modify, or delete any backend code.
- Do not change API contracts, endpoints, database models, or backend logic.
- Do not modify existing authentication behavior.
- Do not replace working functionality with mock implementations.
- Do not create unnecessary or duplicate files.
- Do not refactor unrelated parts of the project.
- Do not add external icon libraries or download assets; use only available project assets and icons.

## 7. Final Verification
- Check that existing admin routes and functionality remain intact.
- Verify that dashboard sections use only real available API data.
- Report any missing API endpoints or unsupported backend modules.
- Summarize the files changed and what was implemented.

Implement the dashboard with minimal, targeted changes while preserving the existing project functionality.