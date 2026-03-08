# Mockup Brief - Institution Workspace

## Page purpose
Primary tenant home for legal operations managers and reviewers to manage matters, intake, and pending decisions.

## Audience
Institution legal operations users (`tenant-scoped`).

## Core modules
- Global header: tenant switch guard (single tenant view), search, notifications, user menu.
- Left navigation: Workspace, Intake Queue, Reviews, Analytics, Integrations, Settings.
- KPI strip (top): active matters, avg turnaround, SLA breach risk, pending approvals.
- Main panel A: Intake queue with priority/status chips.
- Main panel B: Review assignments and overdue tasks.
- Main panel C: Recent high-risk findings with drill-through links.
- Right rail: workflow alerts, connector health (tenant-visible), quick actions.

## Visual hierarchy
1. KPI strip (immediate operational posture)
2. Intake queue (highest volume workflow surface)
3. Review tasks and risk highlights
4. Secondary alerts/actions

## Data and interaction behaviors
- Every table/filter must preserve tenant context.
- Quick actions: create intake, assign reviewer, escalate, export pack.
- Row click opens matter detail with timeline and evidence panel.

## Layer coloring
- Experience/customer modules: deep teal family.
- Workflow status accents: neutral blue/amber/red for state severity.
- Compliance/risk indicators: amber/red only for true risk semantics.

## Typography and spacing
- Font pairing: IBM Plex Sans (UI) + IBM Plex Mono (IDs/metrics).
- Type scale: 32/24/18/14.
- 8px spacing grid, 24px card gutters, 16:9 safe layout.

## Export targets
- PNG hero for deck slide.
- SVG component frame for architecture docs.
- 1920x1080 composition and 1440x900 product view variant.
