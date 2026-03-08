# Mockup Brief - Workflow Monitoring View

## Page purpose
Real-time operational monitoring for workflow runs, step latency, retries, and intervention queue.

## Audience
Esheria workflow operations team.

## Core modules
- Run health banner: active runs, failed runs, retry queue depth, connector degraded count.
- Live state machine panel: run counts by state.
- Timeline stream: run events with trace/workflow IDs.
- Failure diagnostics table: run id, failed step, connector, error class, retry option.
- Action drawer: retry, replay from step, escalate to support.

## Visual hierarchy
1. Health banner and failure count
2. Failure diagnostics table
3. Event timeline and state machine view

## Data and interaction behaviors
- Filters: tenant, workflow template, connector, severity, time window.
- Inline link from failure row to correlated traces/logs.
- All interventions require actor attribution and reason code.

## Layer coloring
- Data-plane runtime: cobalt/teal.
- Connector issues: amber/red.
- Recovery actions: green confirmation states.

## Typography and spacing
- Font pairing: Manrope (UI) + JetBrains Mono (runtime IDs/events).
- Use denser table rhythm (40px rows) for ops readability.

## Export targets
- 1920x1080 incident-ready view.
- Cropped 1:1 module export for incident-center deck inserts.
