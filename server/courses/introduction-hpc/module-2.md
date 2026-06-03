---
{
  "id": "cluster-architecture",
  "title": "Cluster Architecture",
  "description": "How nodes, accelerators, memory, interconnects, storage, and management networks form a production cluster.",
  "order": 2,
  "estimatedMinutes": 64,
  "color": "#1f6feb",
  "dependencies": ["hpc-fundamentals"],
  "outcomes": ["Identify core cluster components", "Explain node roles", "Describe storage and network tradeoffs"],
  "lessons": [
    {
      "id": "cluster-node-anatomy",
      "title": "Anatomy of a Compute Node",
      "overview": "A compute node combines CPUs, GPUs or other accelerators, memory, local storage, network adapters, firmware, and operating system services.",
      "lessonType": "interactive-diagram",
      "order": 1,
      "estimatedMinutes": 22,
      "learningObjectives": ["Describe CPU, GPU, memory, and NIC roles", "Explain NUMA at a high level", "Recognize why locality matters"],
      "content": [
        { "type": "paragraph", "body": "A node is the unit a scheduler allocates. Modern nodes often contain multiple CPU sockets, several GPUs, high-bandwidth memory, local NVMe devices, and one or more high-speed network interface cards." },
        { "type": "paragraph", "body": "Locality matters because moving data can cost more than computing on it. NUMA means memory access time depends on which CPU socket owns the memory. GPU jobs also care about PCIe or fabric topology between CPUs, GPUs, and NICs." },
        { "type": "diagram", "title": "Node Data Paths", "nodes": ["CPU sockets", "System memory", "GPU accelerators", "NVMe scratch", "High-speed NIC"] },
        { "type": "example", "body": "A distributed AI training job may bind each process to one GPU, keep data loaders near the correct CPU socket, and use GPU-aware communication through the closest NIC." }
      ],
      "summary": "Node performance depends on compute units and on the paths between CPU, GPU, memory, storage, and network devices.",
      "quiz": [
        { "id": "q-node-1", "question": "What does NUMA primarily affect?", "choices": ["Memory access locality and latency", "Git branch names", "Scheduler account names", "File extension formats"], "answer": 0, "explanation": "NUMA describes non-uniform memory access across CPU sockets." },
        { "id": "q-node-2", "question": "Why does GPU to NIC topology matter?", "choices": ["It affects communication efficiency for distributed GPU jobs", "It changes the programming language syntax", "It removes the need for memory", "It determines user passwords"], "answer": 0, "explanation": "GPU-aware communication benefits from efficient paths between accelerators and network devices." }
      ],
      "flashcards": [
        { "id": "fc-node-1", "front": "What is a compute node?", "back": "The schedulable unit containing processors, memory, accelerators, storage, and network devices." },
        { "id": "fc-node-2", "front": "Why does locality matter?", "back": "Data movement across sockets, buses, or network links can dominate runtime." }
      ]
    },
    {
      "id": "cluster-networks-storage",
      "title": "Interconnects and Parallel Storage",
      "overview": "Low-latency networks and parallel file systems make multi-node applications and data-intensive workflows possible.",
      "lessonType": "text",
      "order": 2,
      "estimatedMinutes": 22,
      "learningObjectives": ["Distinguish management and high-speed networks", "Explain parallel file system purpose", "Identify metadata bottlenecks"],
      "content": [
        { "type": "paragraph", "body": "Most clusters have at least two networks: a management network for provisioning and control, and a high-speed fabric for application traffic. Fabrics such as InfiniBand or HPE Slingshot focus on low latency, high bandwidth, congestion control, and efficient collective operations." },
        { "type": "paragraph", "body": "Parallel file systems such as Lustre, GPFS, or BeeGFS stripe data across many storage targets. This supports high aggregate bandwidth, but workloads with millions of tiny files may become metadata-bound." },
        { "type": "diagram", "title": "Cluster Data Plane", "nodes": ["Compute nodes", "High-speed fabric", "Metadata servers", "Object storage targets", "Archive tier"] },
        { "type": "example", "body": "Checkpoint files from 2,000 ranks should be written in a coordinated pattern. Otherwise every rank may hit metadata servers at once and create a file system storm." }
      ],
      "summary": "HPC storage and networks are shared performance resources. Efficient applications minimize unnecessary small-file and communication pressure.",
      "quiz": [
        { "id": "q-net-1", "question": "What is the main role of a high-speed interconnect?", "choices": ["Fast communication between nodes", "User interface styling", "Source code formatting", "Password rotation only"], "answer": 0, "explanation": "The high-speed fabric carries performance-sensitive application traffic." },
        { "id": "q-net-2", "question": "What often hurts parallel file system metadata servers?", "choices": ["Millions of small file operations", "A single large sequential write", "Using job arrays", "Reading documentation"], "answer": 0, "explanation": "Small-file storms can overload metadata services." }
      ],
      "flashcards": [
        { "id": "fc-net-1", "front": "Why use a parallel file system?", "back": "To provide high aggregate bandwidth by distributing data and I/O work." },
        { "id": "fc-net-2", "front": "Management network vs fabric", "back": "Management controls nodes; the high-speed fabric carries performance-sensitive job traffic." }
      ]
    },
    {
      "id": "cluster-topologies",
      "title": "Topology and Failure Domains",
      "overview": "Physical layout, network topology, racks, power domains, and cooling zones influence performance and reliability.",
      "lessonType": "text",
      "order": 3,
      "estimatedMinutes": 20,
      "learningObjectives": ["Explain topology-aware placement", "Identify failure domains", "Connect topology to operations"],
      "content": [
        { "type": "paragraph", "body": "Large clusters are arranged into racks, cabinets, chassis, and network groups. Jobs placed close together may communicate faster than jobs spread across distant groups, depending on the network topology." },
        { "type": "paragraph", "body": "A failure domain is a set of components likely to fail together, such as a rack power feed or network switch. Operators use this knowledge for maintenance windows, replica placement, and risk assessment." },
        { "type": "diagram", "title": "Topology-Aware Scheduling", "nodes": ["Rack A", "Rack B", "Leaf switches", "Spine switches", "Job placement"] },
        { "type": "example", "body": "A tightly coupled MPI job may benefit from nodes within the same network island, while independent array jobs can be spread broadly to increase utilization." }
      ],
      "summary": "Topology affects both performance and reliability. Placement policies should match communication patterns and operational risk.",
      "quiz": [
        { "id": "q-topo-1", "question": "What is topology-aware scheduling?", "choices": ["Placing jobs with awareness of physical or network layout", "Sorting files alphabetically", "Disabling all GPUs", "Choosing random passwords"], "answer": 0, "explanation": "Topology-aware placement considers network and hardware layout." },
        { "id": "q-topo-2", "question": "What is a failure domain?", "choices": ["A group of components likely to fail together", "A compiler warning category", "A quiz scoring rule", "A shell variable"], "answer": 0, "explanation": "Failure domains help operators reason about correlated risk." }
      ],
      "flashcards": [
        { "id": "fc-topo-1", "front": "Topology-aware placement", "back": "Scheduling jobs while considering network or physical layout." },
        { "id": "fc-topo-2", "front": "Failure domain", "back": "A set of components with shared failure risk, such as a rack or switch group." }
      ]
    }
  ]
}
---
