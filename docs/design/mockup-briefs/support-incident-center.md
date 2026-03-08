# Mockup Brief - Support and Incident Center

## Page purpose
Central internal surface for incident triage, tenant-impact assessment, and coordinated support response.

## Audience
Support engineers, incident commanders, operator admins.

## Core modules
- Incident status board: new, triaging, mitigated, resolved.
- Impact map: affected tenants, connectors, workflow templates.
- SLA clock panel: response/resolve targets and breach risks.
- Case timeline: alerts, operator actions, customer communications.
- Runbook panel: predefined remediation paths by connector/service.
- Postmortem stub: root cause, corrective action, owner, due date.

## Visual hierarchy
1. Active incident count + SLA clocks
2. Impact map and status board
3. Timeline and runbook controls

## Data and interaction behaviors
- Incident severity drives visual emphasis and action gating.
- One-click links to workflow monitor and service traces.
- Mandatory incident note on every privileged operation.

## Layer coloring
- Internal ops: charcoal/slate base.
- Severity scale: yellow -> orange -> red.
- Resolved states: muted green.

## Typography and spacing
- Font pairing: Space Grotesk (headlines) + Source Sans 3 (dense content).
- High contrast cards, clear timestamp alignment.

## Export targets
- 1920x1080 executive ops slide.
- 1600x900 day-to-day support console variant.
