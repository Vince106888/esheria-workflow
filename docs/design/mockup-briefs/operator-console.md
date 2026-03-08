# Mockup Brief - Operator Console

## Page purpose
Internal control-plane surface for tenant provisioning, policy controls, feature flags, and governance actions.

## Audience
Esheria internal operators (`cross-tenant`, role-gated).

## Core modules
- Global header: environment badge, operator role, incident indicator.
- Left navigation: Tenants, Policies, Integrations, Workflow Ops, Incidents, Internal Analytics, Billing.
- Tenant lifecycle board: prospect -> trial -> active -> at-risk.
- Policy panel: auth mode, claim templates, boundary policies.
- Integration manager panel: connector status matrix per tenant.
- Governance log: privileged actions with reason codes and approvals.

## Visual hierarchy
1. Tenant lifecycle and risk board
2. Policy and connector controls
3. Governance/audit timeline

## Data and interaction behaviors
- Mandatory reason input for privileged actions.
- Two-step confirmation for override/replay/impersonation actions.
- Visible scope labels on every panel: `tenant`, `global`, `internal-only`.

## Layer coloring
- Operator/control-plane modules: slate + magenta accents.
- Warning states: amber.
- Restricted actions: red with lock icon.

## Typography and spacing
- Font pairing: Sora (headlines) + Inter Tight (dense controls).
- Compact control density with 8px baseline grid.
- Preserve 16:9 export-safe margins.

## Export targets
- 1920x1080 boardroom slide visual.
- 2560x1440 technical review detail variant.
