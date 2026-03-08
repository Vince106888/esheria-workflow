# Mockup Brief - Institution Analytics Dashboard

## Page purpose
Tenant-scoped analytics surface for legal operations outcomes and compliance performance.

## Audience
Institution leadership, legal ops managers, compliance leads.

## Core modules
- KPI ribbon: throughput, median turnaround, SLA breach rate, high-risk finding rate.
- Trend panel: weekly throughput vs SLA compliance.
- Bottleneck map: workflow step latency and queue accumulation.
- Risk distribution panel: severity/type/department split.
- Team performance panel: reviewer workload and decision cycle times.
- Export controls: PDF snapshot, CSV extracts, scheduled reports.

## Visual hierarchy
1. KPI ribbon and trend line
2. Bottleneck map and risk distribution
3. Team table and export controls

## Data and interaction behaviors
- Strict tenant scoping with visible tenant watermark in header.
- Filter dimensions: date range, department, workflow template, matter type.
- Drill-through from chart segment to underlying matter list.

## Layer coloring
- Customer analytics: deep blue + teal.
- Risk series: amber/red only for severity signals.
- Neutral greys for baseline operational metrics.

## Typography and spacing
- Font pairing: Plus Jakarta Sans (UI) + IBM Plex Mono (metric labels).
- Generous chart spacing for slide readability.

## Export targets
- 1920x1080 slide visual.
- 1366x768 product-ready analytics view.
- Print-safe PDF layout variant.
