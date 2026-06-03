---
{
  "id": "monitoring-security",
  "title": "Monitoring & Security",
  "description": "Observability, health checks, accounting, access control, isolation, privacy, and operational security.",
  "order": 7,
  "estimatedMinutes": 60,
  "color": "#d6a52d",
  "dependencies": ["ai-on-hpc"],
  "outcomes": ["Read operational signals", "Explain security boundaries", "Connect accounting to governance"],
  "lessons": [
    {
      "id": "monitoring-observability",
      "title": "Cluster Observability",
      "overview": "Monitoring collects signals from nodes, jobs, networks, storage, power, thermals, and schedulers so operators can keep the system useful.",
      "lessonType": "interactive-diagram",
      "order": 1,
      "estimatedMinutes": 20,
      "learningObjectives": ["Identify useful metrics", "Explain job-level telemetry", "Connect alerts to operations"],
      "content": [
        { "type": "paragraph", "body": "Observability in HPC spans resource utilization, node health, error counters, GPU telemetry, network congestion, file system latency, scheduler state, power, and temperature. The goal is to understand system behavior before users notice failures." },
        { "type": "paragraph", "body": "Job-level metrics help users and support teams see whether a job used requested resources well. Low CPU utilization, GPU memory pressure, or excessive I/O waits can point to tuning opportunities." },
        { "type": "diagram", "title": "Signal Sources", "nodes": ["Node metrics", "GPU telemetry", "Network counters", "File system stats", "Scheduler accounting"] },
        { "type": "example", "body": "A sudden rise in retransmits on one network leaf may explain why tightly coupled MPI jobs placed under that switch slowed down." }
      ],
      "summary": "Monitoring converts cluster behavior into actionable signals for reliability, support, capacity planning, and tuning.",
      "quiz": [
        { "id": "q-mon-1", "question": "What is a useful job-level signal?", "choices": ["CPU, GPU, memory, I/O, or network utilization", "Only the user's favorite color", "Only file names", "Only course completion"], "answer": 0, "explanation": "Resource utilization helps explain job behavior." },
        { "id": "q-mon-2", "question": "Why monitor network error counters?", "choices": ["They can reveal fabric issues affecting jobs", "They replace authentication", "They create compilers", "They change source code style"], "answer": 0, "explanation": "Network counters are key operational signals." }
      ],
      "flashcards": [
        { "id": "fc-mon-1", "front": "Observability", "back": "Collecting and interpreting system signals to understand behavior and failures." },
        { "id": "fc-mon-2", "front": "Job telemetry", "back": "Metrics tied to a job that show resource use and bottlenecks." }
      ]
    },
    {
      "id": "security-access-isolation",
      "title": "Access Control and Isolation",
      "overview": "HPC security balances collaboration and performance with identity, authorization, network segmentation, software provenance, and workload isolation.",
      "lessonType": "text",
      "order": 2,
      "estimatedMinutes": 21,
      "learningObjectives": ["Explain authentication and authorization", "Identify isolation boundaries", "Understand shared-system risk"],
      "content": [
        { "type": "paragraph", "body": "Authentication proves identity; authorization determines what that identity may do. HPC centers often integrate SSH, MFA, identity providers, project accounts, group memberships, and scheduler associations." },
        { "type": "paragraph", "body": "Isolation is challenging because users share login nodes, file systems, networks, and accelerators. Security controls must protect data and system integrity without destroying performance or usability." },
        { "type": "diagram", "title": "Security Layers", "nodes": ["Identity", "Scheduler policy", "File permissions", "Network boundaries", "Audit logs"] },
        { "type": "example", "body": "A project with controlled data may require restricted groups, encrypted transfer paths, audit logging, and nodes with approved software images." }
      ],
      "summary": "Security in HPC is layered: identity, policy, isolation, provenance, and auditability all matter.",
      "quiz": [
        { "id": "q-sec-1", "question": "What is authorization?", "choices": ["Determining what an authenticated user is allowed to do", "Running a GPU kernel", "Caching training data", "Increasing clock speed"], "answer": 0, "explanation": "Authorization grants or denies actions." },
        { "id": "q-sec-2", "question": "Why is HPC isolation complex?", "choices": ["Many users share high-performance resources", "No one runs jobs", "All files are public by default", "Schedulers cannot track accounts"], "answer": 0, "explanation": "Shared resources require careful boundaries." }
      ],
      "flashcards": [
        { "id": "fc-sec-1", "front": "Authentication", "back": "Verifying who a user or service is." },
        { "id": "fc-sec-2", "front": "Authorization", "back": "Deciding what an authenticated identity may access or perform." }
      ]
    },
    {
      "id": "security-accounting-governance",
      "title": "Accounting and Governance",
      "overview": "Usage accounting, quotas, audit logs, data policy, and incident response make shared HPC services accountable and sustainable.",
      "lessonType": "text",
      "order": 3,
      "estimatedMinutes": 19,
      "learningObjectives": ["Explain allocation accounting", "Understand quotas and policy", "Recognize audit and incident response value"],
      "content": [
        { "type": "paragraph", "body": "Clusters are expensive shared instruments. Accounting records CPU-hours, GPU-hours, storage, queue wait, and project usage. These records support allocation decisions, chargeback, reporting, and capacity planning." },
        { "type": "paragraph", "body": "Governance includes data classification, export control, software licensing, retention, backups, vulnerability response, and acceptable use. Clear policy helps users work confidently and helps operators respond consistently." },
        { "type": "diagram", "title": "Governance Loop", "nodes": ["Policy", "Accounting", "Audit", "Review", "Improve"] },
        { "type": "example", "body": "If one workflow consumes unexpected GPU-hours, accounting data can show whether it was a legitimate scaling run, a runaway job array, or compromised credentials." }
      ],
      "summary": "Accounting and governance provide the control plane for fair, secure, and sustainable HPC operations.",
      "quiz": [
        { "id": "q-gov-1", "question": "What does usage accounting support?", "choices": ["Allocation, chargeback, reporting, and planning", "Only UI animation", "Only compiler syntax", "Only flashcard review"], "answer": 0, "explanation": "Accounting turns usage into governance data." },
        { "id": "q-gov-2", "question": "Why keep audit logs?", "choices": ["To investigate activity and support accountability", "To replace backups", "To speed up every kernel", "To remove all policies"], "answer": 0, "explanation": "Audit logs help reconstruct activity and support investigations." }
      ],
      "flashcards": [
        { "id": "fc-gov-1", "front": "Usage accounting", "back": "Recording resource consumption by users, jobs, and projects." },
        { "id": "fc-gov-2", "front": "Governance", "back": "Policies and processes for secure, fair, compliant, and sustainable operation." }
      ]
    }
  ]
}
---
