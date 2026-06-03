---
{
  "id": "hpc-fundamentals",
  "title": "HPC Fundamentals",
  "description": "Core ideas, workloads, performance vocabulary, and the difference between capacity and capability computing.",
  "order": 1,
  "estimatedMinutes": 58,
  "color": "#52ad46",
  "outcomes": ["Define HPC and its value", "Read basic performance metrics", "Distinguish throughput, latency, scale-up, and scale-out"],
  "lessons": [
    {
      "id": "hpc-what-is-hpc",
      "title": "What Makes a System High Performance",
      "overview": "HPC combines many processors, fast memory, accelerators, storage, networking, and software into one coordinated environment for solving large computational problems.",
      "lessonType": "text",
      "order": 1,
      "estimatedMinutes": 18,
      "learningObjectives": ["Define HPC in practical terms", "Identify typical HPC workloads", "Explain why coordination matters more than raw hardware alone"],
      "content": [
        { "type": "paragraph", "body": "High Performance Computing is the practice of using tightly coordinated computing resources to solve problems that are too large, too slow, or too data intensive for a single ordinary machine. Weather models, molecular dynamics, computational fluid dynamics, seismic imaging, genomics, and large AI training runs are common examples." },
        { "type": "paragraph", "body": "An HPC system is not just a fast server. It is a complete environment: compute nodes, accelerators, high-bandwidth memory, low-latency interconnects, parallel file systems, schedulers, compilers, communication libraries, monitoring, and operational policies. The system is designed so many independent components can act like one scientific instrument." },
        { "type": "diagram", "title": "HPC Stack", "nodes": ["Applications", "Programming Models", "Middleware", "System Software", "Compute, Network, Storage"] },
        { "type": "example", "body": "A single laptop may run a simulation at 1,000 particles per second. A cluster can divide the domain across 512 GPU-enabled nodes and exchange boundary data over a fast network, making a high-resolution simulation feasible in hours instead of months." }
      ],
      "summary": "HPC is a coordinated stack for large-scale computation. Hardware is important, but software, networking, storage, and operational discipline determine whether the system is actually useful.",
      "quiz": [
        { "id": "q-hpc-1", "question": "Which statement best describes HPC?", "choices": ["A coordinated computing environment for large-scale problems", "A single desktop with a high clock speed", "A cloud file storage service", "A database backup tool"], "answer": 0, "explanation": "HPC depends on coordinated compute, network, storage, and software resources." },
        { "id": "q-hpc-2", "question": "Why is networking important in many HPC workloads?", "choices": ["It lets distributed tasks exchange data quickly", "It replaces the need for compilers", "It stores user home directories", "It guarantees better source code"], "answer": 0, "explanation": "Parallel tasks often need low-latency communication to remain efficient." }
      ],
      "flashcards": [
        { "id": "fc-hpc-1", "front": "What is HPC?", "back": "Coordinated use of many compute, storage, networking, and software resources to solve large computational problems." },
        { "id": "fc-hpc-2", "front": "Name three common HPC workload domains.", "back": "Weather modeling, molecular dynamics, CFD, seismic imaging, genomics, or large AI training." }
      ]
    },
    {
      "id": "hpc-performance-vocabulary",
      "title": "Performance Vocabulary",
      "overview": "Performance discussions use precise terms such as FLOPS, latency, bandwidth, utilization, speedup, efficiency, and scalability.",
      "lessonType": "interactive-diagram",
      "order": 2,
      "estimatedMinutes": 20,
      "learningObjectives": ["Interpret FLOPS, latency, and bandwidth", "Calculate speedup and parallel efficiency", "Recognize bottleneck language"],
      "content": [
        { "type": "paragraph", "body": "FLOPS measures floating-point operations per second, but peak FLOPS is only a ceiling. Real applications may be limited by memory bandwidth, cache misses, communication latency, file system throughput, synchronization, or serial sections of code." },
        { "type": "paragraph", "body": "Speedup compares runtime on one resource count to runtime on a larger resource count. Parallel efficiency divides speedup by the number of resources. If a job runs 8 times faster on 16 nodes, efficiency is 50 percent." },
        { "type": "code", "language": "text", "body": "speedup = baseline_runtime / parallel_runtime\nefficiency = speedup / number_of_nodes" },
        { "type": "diagram", "title": "Common Bottlenecks", "nodes": ["Compute bound", "Memory bound", "Network bound", "I/O bound", "Synchronization bound"] }
      ],
      "summary": "Useful performance analysis looks beyond peak FLOPS and asks which subsystem limits the workload.",
      "quiz": [
        { "id": "q-perf-1", "question": "A job runs in 100 minutes on 1 node and 20 minutes on 8 nodes. What is the speedup?", "choices": ["5x", "8x", "20x", "80x"], "answer": 0, "explanation": "100 divided by 20 equals a 5x speedup." },
        { "id": "q-perf-2", "question": "What does memory bandwidth describe?", "choices": ["How much data can move between memory and processors per second", "How many files a user owns", "How many jobs are queued", "How many compilers are installed"], "answer": 0, "explanation": "Bandwidth describes data movement rate." }
      ],
      "flashcards": [
        { "id": "fc-perf-1", "front": "What is parallel efficiency?", "back": "Speedup divided by the number of parallel resources used." },
        { "id": "fc-perf-2", "front": "Why can peak FLOPS mislead?", "back": "Applications may be limited by memory, network, I/O, synchronization, or serial work." }
      ]
    },
    {
      "id": "hpc-capacity-capability",
      "title": "Capacity vs Capability Computing",
      "overview": "HPC centers balance many medium-sized production jobs with a smaller number of extreme jobs that require a large fraction of the machine.",
      "lessonType": "text",
      "order": 3,
      "estimatedMinutes": 20,
      "learningObjectives": ["Compare capacity and capability computing", "Explain queue policy tradeoffs", "Connect workload shape to scheduling strategy"],
      "content": [
        { "type": "paragraph", "body": "Capacity computing maximizes the number of useful jobs completed over time. It often involves many independent or modestly parallel workloads such as parameter sweeps, ensemble simulations, and routine model runs." },
        { "type": "paragraph", "body": "Capability computing uses a large portion of the system for one demanding job. These jobs may push memory, interconnect, checkpoint, and scheduler limits. They are important when scientific resolution or time-to-answer requires a very large run." },
        { "type": "example", "body": "A climate group may run 1,000 ensemble members as capacity work, then reserve thousands of nodes for a single high-resolution storm simulation as capability work." },
        { "type": "diagram", "title": "Workload Mix", "nodes": ["Many small jobs", "Medium MPI jobs", "GPU training", "Large capability run"] }
      ],
      "summary": "Capacity emphasizes throughput across many jobs; capability emphasizes solving one problem at extreme scale.",
      "quiz": [
        { "id": "q-cap-1", "question": "Which job is the best example of capability computing?", "choices": ["One simulation using thousands of nodes", "A daily cron job compressing logs", "A small spreadsheet calculation", "A web request handler"], "answer": 0, "explanation": "Capability jobs use a large fraction of the system for a single hard problem." },
        { "id": "q-cap-2", "question": "What does capacity computing optimize?", "choices": ["Useful throughput across many jobs", "The number of login nodes", "Only peak theoretical FLOPS", "The color of dashboard charts"], "answer": 0, "explanation": "Capacity computing is about completing many useful workloads efficiently." }
      ],
      "flashcards": [
        { "id": "fc-cap-1", "front": "Capacity computing", "back": "Running many useful jobs efficiently to maximize throughput." },
        { "id": "fc-cap-2", "front": "Capability computing", "back": "Using a large share of a system for one problem that needs extreme scale." }
      ]
    }
  ]
}
---
