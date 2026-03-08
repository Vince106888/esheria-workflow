export const diagramRegistry = [
  {
    id: "system-context",
    title: "System Context Diagram",
    file: "diagrams/mermaid/system-context.mmd",
    audiences: ["executive", "technical"],
    purpose: "Shows actors, platform core, existing services, and external enterprise systems.",
  },
  {
    id: "layered-architecture",
    title: "Layered Architecture Diagram",
    file: "diagrams/mermaid/layered-architecture.mmd",
    audiences: ["executive", "technical"],
    purpose: "Maps experience, control plane, data plane, connectors, and infra layers.",
  },
  {
    id: "dashboard-topology",
    title: "Customer vs Operator Dashboard Topology",
    file: "diagrams/mermaid/dashboard-topology.mmd",
    audiences: ["executive", "technical"],
    purpose: "Separates institution analytics from Esheria internal analytics pathways.",
  },
  {
    id: "contract-intake-sequence",
    title: "Contract Intake Workflow Sequence",
    file: "diagrams/mermaid/contract-intake-sequence.mmd",
    audiences: ["technical", "implementation"],
    purpose: "Traces intake to OCR, compliance, review, approval, export, and audit events.",
  },
  {
    id: "service-integration-map",
    title: "Service Integration Map",
    file: "diagrams/mermaid/service-integration-map.mmd",
    audiences: ["technical", "implementation"],
    purpose: "Shows connector gateway mapping to existing Esheria services and external systems.",
  },
  {
    id: "ontology-er",
    title: "Ontology ER Diagram",
    file: "diagrams/mermaid/ontology-er.mmd",
    audiences: ["technical", "implementation"],
    purpose: "Defines canonical entities and key relationships for workflow operations.",
  },
  {
    id: "deployment-topology",
    title: "Deployment Topology",
    file: "diagrams/mermaid/deployment-topology.mmd",
    audiences: ["technical", "implementation"],
    purpose: "Illustrates deployment boundaries across EKS, SageMaker, stores, and observability.",
  },
  {
    id: "control-vs-data-plane",
    title: "Control Plane vs Data Plane",
    file: "diagrams/mermaid/control-vs-data-plane.mmd",
    audiences: ["technical", "implementation"],
    purpose: "Clarifies governance/orchestration responsibilities versus execution responsibilities.",
  },
  {
    id: "auth-and-tenant-boundary",
    title: "Auth and Tenant Boundary",
    file: "diagrams/mermaid/auth-and-tenant-boundary.mmd",
    audiences: ["technical", "implementation"],
    purpose: "Shows identity flow, claim propagation, and authorization boundaries.",
  },
  {
    id: "api-boundary-map",
    title: "API Boundary Map",
    file: "diagrams/mermaid/api-boundary-map.mmd",
    audiences: ["technical", "implementation"],
    purpose: "Depicts platform API facade, connector contracts, and downstream service APIs.",
  },
  {
    id: "workflow-state-machine",
    title: "Workflow State Machine",
    file: "diagrams/mermaid/workflow-state-machine.mmd",
    audiences: ["technical", "implementation"],
    purpose: "Defines legal intake/review lifecycle states and transitions.",
  },
  {
    id: "current-vs-target-architecture",
    title: "Current vs Target Architecture",
    file: "diagrams/mermaid/current-vs-target-architecture.mmd",
    audiences: ["executive", "technical"],
    purpose: "Compares current fragmented capabilities with orchestrated platform target.",
  },
];

export const diagramRegistryByAudience = {
  executive: diagramRegistry.filter((d) => d.audiences.includes("executive")),
  technical: diagramRegistry.filter((d) => d.audiences.includes("technical")),
  implementation: diagramRegistry.filter((d) => d.audiences.includes("implementation")),
};

export default diagramRegistry;
