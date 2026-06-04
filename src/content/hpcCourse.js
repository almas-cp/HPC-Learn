const pinakaaArchitecture = {
  title: "AMD PINAKAA Studio",
  subtitle: "A layered HPC and AI software ecosystem built around benchmarks, applications, middleware, base system software, monitoring, and security.",
  pillars: [
    {
      id: "cluster-monitoring",
      title: "Cluster Monitoring",
      subtitle: "Prometheus, Ganglia, Suparikshan, C-CHAKSHU",
      color: "#d8a419"
    },
    {
      id: "privacy-safety-security",
      title: "Privacy, Safety & Security",
      subtitle: "Open Source & Indigenous Frameworks",
      color: "#d8a419"
    }
  ],
  layers: [
    {
      id: "studio-tools",
      title: "Studio Tools",
      color: "#2878b8",
      sections: [
        { id: "performance-benchmarks", title: "Performance Benchmarks", items: ["OSU", "Stream", "Graph500", "Linktest", "MLPerf", "HPL", "rocHPL", "rccl-tests", "HPCG", "Hdf5"] },
        { id: "applications", title: "Applications", items: ["Gromacs", "LAMMPS", "nekbone", "Quantum-Espresso", "NAMD"] },
        { id: "visualization-tools", title: "Visualization Tools", items: ["ParaView", "VMD", "Grads", "Ferret"] },
        { id: "dev-tools", title: "Dev Tools", items: ["ParaDE", "CHAP"] }
      ]
    },
    {
      id: "middleware-management",
      title: "Middleware and Management",
      color: "#ef7622",
      sections: [
        { id: "communication-libraries", title: "Communication Libraries", items: ["RCCL", "MVAPICH", "OpenMPI"] },
        { id: "provisioning-resource-management", title: "Provisioning & Resource Management", items: ["Flux", "Kubernetes", "Warewulf", "Spark", "Apptainer"] },
        { id: "ai-frameworks", title: "AI Frameworks", items: ["TensorFlow", "Keras", "Pandas", "XGBoost", "Opt-PyTorch", "Numpy"] },
        { id: "file-system", title: "File System", items: ["Lustre", "NFS"] }
      ]
    },
    {
      id: "base-system-software",
      title: "Base System Software",
      color: "#5ca63a",
      sections: [
        { id: "drivers-os", title: "Drivers & OS", items: ["ROCm Drivers", "AlmaLinux"] },
        { id: "toolchain", title: "Toolchain", items: ["uProf", "rocprof", "TAU", "Gprof-ng", "ROCgdb", "Gdb"] },
        { id: "math-libraries", title: "Math Libraries", items: ["AOCL", "PETSc", "CLAP", "rocBLAS", "rocFFT"] },
        { id: "compilers-transpilers", title: "Compilers & Transpilers", items: ["AOCC", "ParaScc", "CAPC", "GCC", "LLVM"] },
        { id: "parallel-programming-models", title: "Parallel Prog. Models", items: ["SYCL", "OpenMP", "HIP"] }
      ]
    }
  ]
};

const sectionNotes = {
  "Performance Benchmarks": {
    role: "the measurement layer for proving whether compute, memory, communication, AI, graph, and I/O paths are healthy.",
    focus: "Use benchmark results as signals, not trophies. A benchmark should answer a specific operational question about one part of the PINAKAA stack.",
    example: "If an application slows down after a cluster change, compare OSU, Stream, HPL/HPCG, rccl-tests, and Hdf5 before blaming the application."
  },
  Applications: {
    role: "the scientific and engineering workloads that users actually run on PINAKAA.",
    focus: "Applications combine algorithms, libraries, communication, storage, and accelerator runtimes. Their performance is the final result of the whole stack.",
    example: "A Gromacs or NAMD job can be limited by GPU kernels, MPI latency, CPU placement, file I/O, or driver compatibility."
  },
  "Visualization Tools": {
    role: "the tools that turn simulation and analysis outputs into inspectable visual information.",
    focus: "Visualization performance depends on data size, file format, remote rendering, memory pressure, and storage layout.",
    example: "A ParaView pipeline that loads slowly may be blocked by storage throughput or metadata behavior rather than the rendering engine."
  },
  "Dev Tools": {
    role: "the developer-facing tools that help users prepare, inspect, and improve code on the platform.",
    focus: "Developer tools should connect source code, build settings, runtime configuration, profiling, and debugging into one workflow.",
    example: "When a parallel code behaves differently across nodes, developer tooling should expose launch settings, environment modules, compiler choices, and runtime logs."
  },
  "Middleware and Management": {
    role: "the orange coordination layer that makes distributed execution usable at cluster scale.",
    focus: "Middleware handles communication, scheduling, provisioning, containers, workflow orchestration, AI frameworks, and shared storage.",
    example: "A training job uses AI frameworks, GPU collectives, container runtime, scheduler placement, and file systems before it reaches the base software layer."
  },
  "Communication Libraries": {
    role: "the runtime communication layer for moving data between ranks, nodes, and accelerators.",
    focus: "Communication libraries determine scaling behavior when a workload stops being single-node.",
    example: "If strong scaling flattens early, compare MPI and RCCL behavior before tuning application code."
  },
  "Provisioning & Resource Management": {
    role: "the operational layer for preparing nodes, allocating resources, and running distributed services.",
    focus: "Provisioning creates consistency; resource management creates policy-controlled access; orchestration keeps services and workflows coordinated.",
    example: "A reproducible benchmark run depends on consistent node images, scheduler placement, and container/runtime configuration."
  },
  "AI Frameworks": {
    role: "the software layer that turns PINAKAA into a machine-learning and data-analysis platform.",
    focus: "AI frameworks depend on kernels, Python environments, GPU runtime support, data loading, and collective communication.",
    example: "A model can show low GPU utilization because storage input, preprocessing, or inter-GPU communication is the bottleneck."
  },
  "File System": {
    role: "the shared data layer for application input, output, checkpoints, and user workflows.",
    focus: "File system choice affects metadata behavior, throughput, reliability, and how well many ranks can access data together.",
    example: "A checkpoint storm from thousands of ranks should be planned for Lustre-style parallel I/O rather than a simple shared path."
  },
  "Base System Software": {
    role: "the green foundation that exposes hardware, compiles code, debugs failures, and accelerates math.",
    focus: "The base layer is where driver compatibility, compiler behavior, math kernels, profilers, debuggers, and programming models become real execution.",
    example: "If a framework cannot see AMD GPUs, inspect ROCm drivers and host OS compatibility before changing model code."
  },
  "Drivers & OS": {
    role: "the host foundation that exposes devices and provides a stable Linux runtime.",
    focus: "Drivers and operating systems are part of performance, reliability, security, and reproducibility.",
    example: "A mismatched ROCm driver can break every application above it, even if the application source code is correct."
  },
  Toolchain: {
    role: "the inspection and debugging layer for understanding what code and hardware are doing.",
    focus: "Profilers locate time and resource pressure; debuggers inspect correctness and runtime state.",
    example: "Before optimizing a kernel, use profiling to prove whether the bottleneck is compute, memory, communication, or I/O."
  },
  "Math Libraries": {
    role: "the optimized numerical building blocks used by simulations, solvers, and AI workloads.",
    focus: "Tuned math libraries reduce the need to hand-write low-level kernels and can change performance without changing application source.",
    example: "Quantum-Espresso performance can shift strongly when FFT and BLAS paths change."
  },
  "Compilers & Transpilers": {
    role: "the layer that turns source code into optimized executable code for CPUs, accelerators, and parallel runtimes.",
    focus: "Compiler choice affects vectorization, ABI compatibility, source portability, debugging, and library linkage.",
    example: "A code can be correct but slow if compiler flags prevent vectorization or link the wrong MPI stack."
  },
  "Parallel Prog. Models": {
    role: "the source-level models developers use to express concurrency on CPUs and accelerators.",
    focus: "Programming model choice affects portability, compiler needs, runtime behavior, and profiling/debugging workflows.",
    example: "HIP may expose AMD GPU capability directly, while SYCL may prioritize portability across backends."
  },
  "Cluster Monitoring": {
    role: "the gold observability pillar for seeing what the cluster is doing.",
    focus: "Monitoring connects application symptoms to CPU, GPU, memory, fabric, storage, scheduler, and service behavior.",
    example: "If HPL suddenly drops, telemetry can reveal thermal throttling, fabric errors, clock changes, or file system pressure."
  },
  "Privacy, Safety & Security": {
    role: "the gold governance pillar that applies to every horizontal layer.",
    focus: "Security protects login, job launch, containers, file systems, services, data movement, and supply-chain trust.",
    example: "A containerized AI workflow still needs secure image provenance, data permissions, scheduler policy, and auditability."
  }
};

const itemNotes = {
  OSU: ["OSU micro-benchmarks isolate MPI latency, bandwidth, message rate, and collective communication behavior.", "Use OSU when validating MPI, fabric configuration, rank placement, or node-to-node communication health.", "OSU belongs above communication libraries but its results often point down to OpenMPI, MVAPICH, fabric settings, process binding, or node health."],
  Stream: ["Stream measures sustainable memory bandwidth through simple vector operations.", "It is a base sanity check for NUMA placement, memory channel configuration, compiler vectorization, and CPU frequency behavior.", "If Stream is weak, many memory-bound applications will also underperform regardless of peak FLOPS."],
  Graph500: ["Graph500 stresses irregular graph traversal instead of dense numerical kernels.", "It exposes memory latency, cache behavior, communication, and data-structure effects that HPL-style benchmarks hide.", "Use it when graph analytics or sparse, irregular workloads matter to the deployment."],
  Linktest: ["Linktest validates link-level communication stability across the cluster interconnect.", "It is useful before production campaigns because intermittent link problems often appear as application slowdowns or random job failures.", "Treat Linktest as an operational health check for the communication fabric."],
  MLPerf: ["MLPerf evaluates AI workload performance using realistic training and inference patterns.", "It is a full-stack signal that includes framework behavior, kernels, communication, data loading, and system configuration.", "When MLPerf scales poorly, compare data input, framework settings, GPU collectives, and telemetry before changing models."],
  HPL: ["HPL measures dense linear algebra performance and is often used to express peak cluster capability.", "It is valuable, but it can overstate usefulness for memory-bound, sparse, I/O-heavy, or communication-heavy workloads.", "Use HPL to validate dense compute paths, not as the only definition of system performance."],
  rocHPL: ["rocHPL adapts the HPL dense linear algebra benchmark for AMD accelerator paths.", "It validates GPU math throughput, ROCm runtime behavior, and accelerator-aware system configuration.", "Strong rocHPL results depend on drivers, math libraries, GPU clocks, process placement, and communication."],
  "rccl-tests": ["rccl-tests validate AMD GPU collective communication through RCCL.", "They isolate operations such as all-reduce and all-gather that distributed AI training relies on.", "If multi-GPU training scales poorly, rccl-tests help separate framework issues from communication issues."],
  HPCG: ["HPCG measures sparse linear algebra, memory access, and communication patterns closer to many scientific workloads.", "It complements HPL by exposing bottlenecks that dense matrix multiplication can hide.", "Use HPCG when you need a more realistic view of solver-like workload behavior."],
  Hdf5: ["Hdf5 is a structured scientific data format and I/O path used by many simulation and analysis workflows.", "Its performance depends on collective I/O, file system striping, metadata behavior, and application write patterns.", "Hdf5 issues can make a compute-capable system feel slow during checkpointing or data analysis."],
  Gromacs: ["Gromacs is a molecular dynamics application for biomolecules and materials.", "It balances CPU work, GPU offload, domain decomposition, neighbor search, PME settings, and communication.", "Gromacs teaches why application tuning must consider MPI, OpenMP, GPU runtime, math libraries, and monitoring together."],
  LAMMPS: ["LAMMPS supports particle simulations across materials science, chemistry, and mesoscale modeling.", "Different pair styles and packages shift bottlenecks between CPU compute, GPU kernels, communication, and I/O.", "Good LAMMPS deployment depends on consistent compilers, MPI, libraries, and accelerator runtime support."],
  nekbone: ["nekbone is a proxy application for spectral-element CFD workloads.", "Proxy apps preserve important kernel and communication behavior while being easier to analyze than full production codes.", "Use nekbone to reason about compiler, MPI, memory, and solver behavior before moving to larger Nek workloads."],
  "Quantum-Espresso": ["Quantum-Espresso targets electronic-structure calculations.", "It depends heavily on FFTs, BLAS-like operations, diagonalization, MPI communication, and careful runtime configuration.", "It is a strong example of why optimized math libraries and communication paths matter in PINAKAA."],
  NAMD: ["NAMD is a biomolecular dynamics application designed for large-scale parallel simulation.", "Its performance depends on domain decomposition, GPU acceleration, communication, and load balancing.", "When NAMD performs poorly, inspect both application settings and middleware/base-system dependencies."],
  ParaView: ["ParaView supports large-scale scientific visualization pipelines.", "It can stress storage, memory, remote rendering, and data-parallel processing paths.", "Slow ParaView work may indicate data layout, file format, or file system issues rather than graphics-only problems."],
  VMD: ["VMD is widely used for molecular visualization and trajectory analysis.", "It connects application outputs from molecular dynamics codes to visual inspection and analysis workflows.", "Large trajectories can be limited by I/O and memory, so VMD usage should be considered with file system planning."],
  Grads: ["GrADS supports atmospheric, climate, and geoscience data analysis.", "It works with multidimensional gridded data where metadata and file formats shape usability.", "GrADS belongs in the visualization layer but often exposes storage and data-layout issues."],
  Ferret: ["Ferret is used for oceanographic, climate, and gridded data analysis.", "It helps learners understand why visualization tools need efficient access to multidimensional scientific datasets.", "Interactive analysis can be limited by metadata access, storage throughput, and dataset organization."],
  ParaDE: ["ParaDE is a developer environment block in PINAKAA Studio.", "It should help users move between source code, build settings, launch configuration, and runtime inspection.", "Its value is making the deeper stack visible enough for developers to debug and tune parallel programs."],
  CHAP: ["CHAP is a development and analysis tool block in the PINAKAA Studio map.", "It belongs with developer tooling because it bridges user workflows and system-level execution details.", "Learn CHAP as part of the path from source code to compiler, runtime, scheduler, profiler, and debugger signals."],
  RCCL: ["RCCL provides collective communication for AMD GPU workloads.", "Distributed AI training and multi-GPU workloads depend on efficient collectives such as all-reduce.", "Use rccl-tests and telemetry to validate RCCL behavior before blaming AI framework code."],
  MVAPICH: ["MVAPICH is an MPI implementation family used for high-performance communication.", "It is important when fabric support, rank placement, and MPI collectives shape application scaling.", "Compare MVAPICH behavior with benchmarks and application traces when communication becomes the bottleneck."],
  OpenMPI: ["OpenMPI is a widely used open-source MPI implementation.", "It provides message passing for distributed processes and supports many cluster fabrics and launch environments.", "OpenMPI choices affect latency, bandwidth, collectives, process binding, and application startup behavior."],
  Flux: ["Flux is a resource management and job scheduling framework for HPC environments.", "It helps coordinate jobs, resources, workflows, and policy in distributed systems.", "Flux belongs in middleware because it decides how work is placed and managed above the base system layer."],
  Kubernetes: ["Kubernetes orchestrates containerized services and workflows.", "In PINAKAA, it is useful for service-oriented and cloud-native pieces around the HPC environment.", "It must be integrated carefully with accelerators, storage, networking, and HPC scheduling policy."],
  Warewulf: ["Warewulf provisions cluster node images and helps keep compute nodes consistent.", "Provisioning consistency is essential for reproducible benchmarks and stable application behavior.", "If nodes drift in drivers, libraries, or OS image, upper-layer tools can fail unpredictably."],
  Spark: ["Spark supports distributed data processing and analytics workflows.", "It is useful for data preparation and analysis patterns that do not fit traditional MPI execution.", "Spark performance depends on memory, storage, scheduler integration, and data locality."],
  Apptainer: ["Apptainer packages user-space environments for HPC-friendly container execution.", "It improves reproducibility while still relying on host drivers, filesystems, and scheduler integration.", "A container can package Python dependencies, but it cannot replace host ROCm driver compatibility."],
  TensorFlow: ["TensorFlow is an AI framework for training and inference workloads.", "On PINAKAA it depends on GPU runtime support, kernels, communication libraries, data pipelines, and Python environment consistency.", "Low TensorFlow GPU utilization may be caused by storage input, preprocessing, or communication rather than model math."],
  Keras: ["Keras provides a higher-level neural network interface commonly used with TensorFlow.", "It improves productivity but still inherits performance limits from the backend, hardware runtime, and data pipeline.", "Keras models should be tuned with awareness of batch size, accelerator use, and distributed communication."],
  Pandas: ["Pandas supports tabular data preparation and analysis in Python.", "It often appears before or after AI workloads, even when training runs on accelerators.", "Pandas can become memory-bound or single-node limited, so data movement strategy matters in HPC workflows."],
  XGBoost: ["XGBoost implements gradient-boosted decision trees for machine-learning workflows.", "It can be used for structured data workloads where tree methods outperform neural networks.", "Performance depends on memory, threading, accelerator support, input format, and data partitioning."],
  "Opt-PyTorch": ["Opt-PyTorch represents optimized PyTorch-style training workflows in the PINAKAA AI stack.", "It depends on GPU kernels, communication collectives, data loading, and Python packaging discipline.", "When scaling PyTorch, validate RCCL behavior, batch sizing, storage input, and framework build compatibility."],
  Numpy: ["NumPy is the foundational Python numerical array library.", "It underpins many data, AI, and scientific workflows even when heavy compute moves to specialized libraries.", "NumPy performance depends on array layout, vectorization, linked math libraries, and memory bandwidth."],
  Lustre: ["Lustre is a parallel file system designed for high aggregate bandwidth across many clients.", "It is suited to large parallel I/O, checkpoints, and high-throughput scientific data workflows.", "Lustre still requires attention to striping, metadata pressure, and application write patterns."],
  NFS: ["NFS provides simpler shared file access for users and services.", "It is useful for moderate shared access but can bottleneck many-node workloads or metadata-heavy patterns.", "Choose NFS for simplicity, not for large parallel checkpoint storms."],
  "ROCm Drivers": ["ROCm drivers expose AMD accelerator capability to the operating system and user-space runtimes.", "They are foundational for GPU frameworks, HIP code, rocBLAS, rocFFT, and profiling/debugging tools.", "If GPU workloads cannot discover hardware, inspect ROCm driver and runtime compatibility first."],
  AlmaLinux: ["AlmaLinux provides the stable Linux operating system foundation in the PINAKAA base layer.", "The OS contributes kernel behavior, package compatibility, security policy, and service management.", "Stable OS images reduce runtime drift and make benchmark/application results reproducible."],
  uProf: ["uProf is an AMD profiling tool for CPU and system performance analysis.", "It helps identify hotspots, utilization patterns, and hardware-level behavior.", "Use uProf when CPU execution, memory behavior, or system-level performance needs inspection."],
  rocprof: ["rocprof profiles AMD GPU workloads and ROCm execution paths.", "It helps identify kernel timing, GPU activity, and accelerator bottlenecks.", "Use rocprof when HIP, rocBLAS, rocFFT, AI frameworks, or GPU kernels behave unexpectedly."],
  TAU: ["TAU is a performance analysis framework for profiling and tracing parallel programs.", "It can help connect application behavior to MPI, threads, accelerators, and runtime events.", "TAU is useful when a workload needs broad performance visibility rather than one narrow counter."],
  "Gprof-ng": ["Gprof-ng profiles compiled applications and helps locate CPU-side hotspots.", "It supports performance investigation when source-level or function-level timing matters.", "Use it as part of a toolchain path before making optimization decisions."],
  ROCgdb: ["ROCgdb supports debugging AMD GPU programs in ROCm environments.", "It helps inspect GPU-side correctness issues and runtime state.", "Use ROCgdb when accelerator code behaves incorrectly, not just when it is slow."],
  Gdb: ["Gdb is the standard debugger for native compiled programs.", "It is essential for inspecting process state, stack traces, breakpoints, and correctness failures.", "In HPC, Gdb is often combined with launch wrappers, rank selection, and reproducible test cases."],
  AOCL: ["AOCL is AMD's optimized CPU math library collection.", "It accelerates BLAS, LAPACK, FFT, and related numerical operations on AMD CPUs.", "AOCL can improve applications without source changes when linked correctly."],
  PETSc: ["PETSc provides scalable solvers for scientific computing.", "It supports sparse linear algebra, nonlinear solvers, time integration, and parallel solver workflows.", "PETSc performance depends on MPI, preconditioners, math libraries, and problem structure."],
  CLAP: ["CLAP appears in the PINAKAA math library layer as a numerical support component.", "Learn it as part of the optimized math stack that applications rely on rather than a standalone application.", "Its role is to support reusable numerical capability below simulations and AI workflows."],
  rocBLAS: ["rocBLAS provides BLAS operations accelerated on AMD GPUs.", "It is a key dependency for dense linear algebra, AI kernels, and scientific applications.", "When rocBLAS performance shifts, inspect ROCm version, GPU clocks, matrix shapes, and library linkage."],
  rocFFT: ["rocFFT provides FFT operations accelerated on AMD GPUs.", "FFT performance matters in applications such as electronic structure, signal processing, and spectral methods.", "rocFFT depends on ROCm runtime compatibility, data layout, and problem sizes."],
  AOCC: ["AOCC is AMD's optimizing compiler for AMD CPU platforms.", "It can improve vectorization and code generation for CPU-heavy workloads.", "Compiler choice should be tested with representative applications, not just micro-benchmarks."],
  ParaScc: ["ParaScc appears in the compiler and transpiler layer for parallel-code support.", "Treat it as part of PINAKAA's source-to-execution toolchain.", "Its learning role is to connect source portability, compilation, and parallel runtime behavior."],
  CAPC: ["CAPC appears in the compiler and transpiler layer as a specialized compilation component.", "It belongs near AOCC, GCC, LLVM, and ParaScc because it influences how code becomes executable.", "Learn it by asking what source form it accepts, what target it produces, and how it affects runtime behavior."],
  GCC: ["GCC is a broad open-source compiler suite used throughout HPC.", "It supports C, C++, Fortran, OpenMP, and many system builds.", "GCC choices affect optimization, ABI compatibility, debugging, and library linkage."],
  LLVM: ["LLVM is a compiler infrastructure and toolchain ecosystem.", "It underpins many compilers and supports modern optimization and code-generation workflows.", "LLVM matters when portability, tooling, and compiler infrastructure are part of the platform strategy."],
  SYCL: ["SYCL is a C++ programming model for heterogeneous and accelerator programming.", "It aims to express parallel code with portability across backend implementations.", "SYCL sits in PINAKAA's programming model layer because it shapes compiler and runtime requirements."],
  OpenMP: ["OpenMP provides directive-based parallel programming for CPUs and accelerators.", "It is widely used because it can introduce parallelism incrementally into existing code.", "OpenMP performance depends on compiler support, runtime configuration, placement, and scheduling choices."],
  HIP: ["HIP is AMD's GPU programming model for writing accelerator kernels.", "It exposes GPU execution while integrating with ROCm libraries and tools.", "HIP code often pairs with rocprof, ROCgdb, rocBLAS, rocFFT, and ROCm driver compatibility."],
  Prometheus: ["Prometheus collects time-series metrics and supports alerting workflows.", "It helps monitor services, nodes, accelerators, and application-facing signals.", "Use Prometheus to connect observed slowdowns to telemetry such as utilization, errors, latency, and saturation."],
  Ganglia: ["Ganglia is a monitoring system historically common in cluster environments.", "It provides distributed metric visibility across nodes.", "Ganglia helps learners understand why cluster-wide observability is necessary for operations."],
  Suparikshan: ["Suparikshan is part of PINAKAA's indigenous monitoring and validation pillar.", "Its role is to support inspection, health validation, and operational confidence.", "Learn it as a local capability for connecting symptoms to the correct layer of the architecture."],
  "C-CHAKSHU": ["C-CHAKSHU is represented in the monitoring pillar as an indigenous visibility framework.", "It should be understood as a cluster-awareness and diagnostic capability.", "Its value is helping operators see system behavior instead of relying on guesses."],
  Privacy: ["Privacy controls who can access sensitive data, where it can move, and how it is exposed in workflows.", "HPC and AI workloads may involve scientific, industrial, healthcare, defense, or proprietary data.", "Privacy must be designed across job policy, storage permissions, telemetry, and data lifecycle."],
  Safety: ["Safety is about preventing harmful system behavior and reducing operational risk.", "It includes guardrails around workloads, resource use, automation, and data handling.", "Safety belongs beside every layer because mistakes in one layer can affect users, data, or infrastructure."],
  Security: ["Security protects identities, systems, data, containers, services, and supply chains.", "It shapes login, scheduling, filesystem access, image provenance, auditability, and network policy.", "Security is cross-cutting because every PINAKAA layer can introduce risk."],
  "Open Source & Indigenous Frameworks": ["Open-source and indigenous frameworks improve transparency, adaptability, and sovereign control.", "They still require governance, patching, review, and operational discipline.", "This block matters because trust is both technical and institutional in large computing platforms."]
};

const sectionDependencyBlocks = {
  "Performance Benchmarks": ["Communication Libraries", "Toolchain", "Math Libraries", "File System", "Prometheus", "Security"],
  Applications: ["Communication Libraries", "Math Libraries", "Parallel Prog. Models", "File System", "Cluster Monitoring"],
  "Visualization Tools": ["File System", "NFS", "Lustre", "Cluster Monitoring", "Security"],
  "Dev Tools": ["Toolchain", "Compilers & Transpilers", "Parallel Prog. Models", "Prometheus"],
  "Middleware and Management": ["Base System Software", "Communication Libraries", "Provisioning & Resource Management", "File System", "Security"],
  "Communication Libraries": ["OpenMPI", "MVAPICH", "RCCL", "Cluster Monitoring", "Security"],
  "Provisioning & Resource Management": ["AlmaLinux", "ROCm Drivers", "Apptainer", "Kubernetes", "Cluster Monitoring"],
  "AI Frameworks": ["ROCm Drivers", "RCCL", "rocBLAS", "rocFFT", "File System", "Prometheus"],
  "File System": ["Lustre", "NFS", "Cluster Monitoring", "Security", "Applications"],
  "Base System Software": ["Drivers & OS", "Toolchain", "Math Libraries", "Compilers & Transpilers", "Parallel Prog. Models"],
  "Drivers & OS": ["ROCm Drivers", "AlmaLinux", "Security", "Cluster Monitoring"],
  Toolchain: ["uProf", "rocprof", "TAU", "ROCgdb", "Gdb", "Compilers & Transpilers"],
  "Math Libraries": ["ROCm Drivers", "rocBLAS", "rocFFT", "AOCL", "PETSc", "Applications"],
  "Compilers & Transpilers": ["AOCC", "GCC", "LLVM", "OpenMP", "HIP", "Toolchain"],
  "Parallel Prog. Models": ["HIP", "OpenMP", "SYCL", "Compilers & Transpilers", "rocprof"],
  "Cluster Monitoring": ["Prometheus", "Ganglia", "Suparikshan", "C-CHAKSHU", "Security"],
  "Privacy, Safety & Security": ["Privacy", "Safety", "Security", "Open Source & Indigenous Frameworks", "Cluster Monitoring"]
};

const sectionGlossary = {
  "Performance Benchmarks": [
    ["Micro-benchmark", "A small test that isolates one system property such as latency, bandwidth, memory speed, or I/O behavior."],
    ["Strong scaling", "Running a fixed problem on more resources to see whether time-to-solution improves efficiently."],
    ["Baseline", "A known-good measurement used to compare future runs after hardware, driver, OS, or configuration changes."]
  ],
  Applications: [
    ["Domain decomposition", "Splitting a scientific problem across ranks, threads, nodes, or accelerators."],
    ["Hotspot", "The part of an application consuming the most time or limiting throughput."],
    ["Time-to-solution", "The end-to-end duration that matters to users, including compute, communication, and I/O."]
  ],
  "Visualization Tools": [
    ["Remote rendering", "Rendering images near the data or compute resource, then streaming the visual result to the user."],
    ["Pipeline", "A sequence of data loading, filtering, transformation, and rendering steps."],
    ["Metadata pressure", "Slowdown caused by many file lookups, directory operations, or small-file operations."]
  ],
  "Dev Tools": [
    ["Build configuration", "Compiler, linker, library, module, and flag choices that shape the final executable."],
    ["Runtime inspection", "Looking at the behavior of a program while it runs, including logs, symbols, traces, and counters."],
    ["Reproducer", "A minimal command, input, and environment that triggers the behavior being debugged."]
  ],
  "Middleware and Management": [
    ["Scheduler", "The component that decides when and where jobs run according to resources and policy."],
    ["Orchestration", "Coordinating services, containers, jobs, and workflows across distributed infrastructure."],
    ["Resource policy", "Rules that control access to CPUs, GPUs, memory, storage, queues, and services."]
  ],
  "Communication Libraries": [
    ["MPI rank", "One process participating in a distributed MPI program."],
    ["Collective", "A communication operation involving many ranks or accelerators, such as all-reduce."],
    ["Affinity", "The binding relationship between processes, CPUs, GPUs, memory, and network devices."]
  ],
  "Provisioning & Resource Management": [
    ["Node image", "The operating system and software image used to boot or configure compute nodes."],
    ["Container runtime", "Software that executes packaged user environments while relying on host kernel and driver support."],
    ["Drain", "Marking a node unavailable for new work while operators investigate or repair it."]
  ],
  "AI Frameworks": [
    ["Data pipeline", "The path that loads, transforms, batches, and feeds data into training or inference."],
    ["Kernel", "A low-level compute operation executed on CPU or accelerator hardware."],
    ["Distributed training", "Training a model across multiple devices or nodes while synchronizing model state."]
  ],
  "File System": [
    ["Striping", "Distributing file data across storage targets to improve parallel throughput."],
    ["Checkpoint", "A saved application state used to restart long-running work after interruption."],
    ["Metadata server", "The file-system service that manages names, permissions, directories, and file attributes."]
  ],
  "Base System Software": [
    ["Runtime", "The software layer that provides services needed while programs execute."],
    ["ABI", "The binary compatibility contract between compiled code, libraries, and the operating system."],
    ["Device discovery", "The process by which software detects available CPUs, GPUs, memory, and attached devices."]
  ],
  "Drivers & OS": [
    ["Kernel module", "Driver code loaded into the operating system kernel to control hardware."],
    ["User-space runtime", "Libraries and services used by applications without running inside the kernel."],
    ["Compatibility matrix", "The supported combinations of OS, kernel, drivers, runtime, and application stack."]
  ],
  Toolchain: [
    ["Profiler", "A tool that measures where time and resources are spent."],
    ["Debugger", "A tool that inspects program state to diagnose correctness failures."],
    ["Trace", "A timeline of events that helps explain ordering, waiting, and interaction between components."]
  ],
  "Math Libraries": [
    ["BLAS", "A family of standard dense linear algebra operations such as matrix multiplication."],
    ["FFT", "Fast Fourier Transform, a common algorithmic building block in simulations and signal processing."],
    ["Linkage", "The process of connecting an application to the libraries it will call at build or run time."]
  ],
  "Compilers & Transpilers": [
    ["Vectorization", "Generating instructions that operate on multiple data elements at once."],
    ["Optimization flag", "A compiler setting that changes generated code for speed, size, debug visibility, or compatibility."],
    ["Transpiler", "A tool that converts source code from one form or programming model into another."]
  ],
  "Parallel Prog. Models": [
    ["Host-device copy", "Moving data between CPU memory and accelerator memory."],
    ["Thread team", "A group of threads cooperating on a parallel region."],
    ["Portability", "The ability to run a code across hardware or software backends with minimal source changes."]
  ],
  "Cluster Monitoring": [
    ["Telemetry", "Measurements collected from systems, services, jobs, and hardware over time."],
    ["Alert", "A notification triggered when a metric or event crosses an operational threshold."],
    ["Saturation", "A condition where a resource is fully used and becomes the limiting factor."]
  ],
  "Privacy, Safety & Security": [
    ["Least privilege", "Granting only the access required for a user, job, service, or process to do its work."],
    ["Audit trail", "A record of actions used to explain who did what and when."],
    ["Provenance", "The origin and change history of data, code, models, images, or packages."]
  ]
};

const architectureModules = buildModules();

export const courses = [
  {
    id: "amd-pinakaa-studio",
    title: "AMD PINAKAA Studio",
    description: "A guided static learning map for the AMD PINAKAA Studio HPC and AI software ecosystem.",
    architecture: pinakaaArchitecture,
    modules: architectureModules,
    estimatedMinutes: architectureModules.reduce((sum, module) => sum + module.estimatedMinutes, 0)
  }
];

export function getCourseById(courseId) {
  return courses.find((course) => course.id === courseId) || courses[0];
}

function buildModules() {
  const modules = [
    moduleOf({
      id: "pinakaa-overview",
      order: 1,
      title: "PINAKAA Studio Overview",
      color: "#123e66",
      description: "The full architecture map and how every block relates to the whole system.",
      lessons: [
        lessonFromParts({
          id: "amd-pinakaa-studio",
          title: "AMD PINAKAA Studio",
          blockKey: "module:pinakaa-overview",
          overview: "AMD PINAKAA Studio is a layered HPC and AI software ecosystem. The map is the learning path: blue blocks are user-facing tools, orange blocks coordinate distributed execution, green blocks provide the system foundation, and gold pillars apply across everything.",
          objectives: ["Read the map from bottom to top", "Use side pillars as cross-cutting concerns", "Trace every tool to its dependencies"],
          paragraphs: [
            "The green Base System Software layer is closest to hardware and runtime execution. It includes the operating system, ROCm drivers, compilers, profilers, debuggers, math libraries, and programming models.",
            "The orange Middleware and Management layer turns the base into a coordinated platform. It handles communication, provisioning, orchestration, AI frameworks, containers, and shared storage.",
            "The blue Studio Tools layer is where learners see benchmarks, applications, visualization tools, and developer tools. These are the blocks most users click first, but they depend on the layers below."
          ],
          diagram: ["Base System Software", "Middleware and Management", "Studio Tools", "Monitoring", "Privacy, Safety & Security"],
          example: "If NAMD performs poorly, the investigation can start in the blue application block, move to OpenMPI or RCCL in middleware, then continue into ROCm drivers, compiler settings, math libraries, file systems, and monitoring telemetry."
        }),
        lessonFromParts({
          id: "pinakaa-dependency-flow",
          title: "PINAKAA Dependency Flow",
          blockKey: "lesson:pinakaa-dependency-flow",
          overview: "Every visible block in the diagram is a learning entry point, but no block works alone. PINAKAA should be understood as dependency paths rather than isolated names.",
          objectives: ["Trace a tool through lower layers", "Identify where failures usually originate", "Separate workload, runtime, and operations concerns"],
          paragraphs: [
            "A benchmark result can be shaped by CPU affinity, GPU runtime compatibility, MPI selection, file system metadata pressure, scheduler placement, and security policy.",
            "A learning path through the map should ask three questions: what does this block do, what blocks does it depend on, and what monitoring or security signal tells us whether it is healthy.",
            "This is why the app now gives each block individual material while preserving the central architecture map."
          ],
          diagram: ["Select a PINAKAA map block", "Understand its role", "Check lower-layer dependencies", "Validate with monitoring and security", "Make an operational decision"],
          example: "Clicking rocBLAS should teach rocBLAS itself, but the learner should also understand that rocBLAS depends on ROCm drivers, GPU runtime health, compiler choices, and profiling signals."
        })
      ]
    })
  ];

  pinakaaArchitecture.layers.forEach((layer) => {
    if (layer.id === "middleware-management" || layer.id === "base-system-software") {
      modules.push(sectionModule({
        id: layer.id,
        order: modules.length + 1,
        title: layer.title,
        color: layer.color,
        items: [],
        asLayer: true
      }));
    }

    layer.sections.forEach((section) => {
      modules.push(sectionModule({
        id: section.id,
        order: modules.length + 1,
        title: section.title,
        color: layer.color,
        items: section.items
      }));
    });
  });

  pinakaaArchitecture.pillars.forEach((pillar) => {
    const items = pillar.id === "cluster-monitoring"
      ? ["Prometheus", "Ganglia", "Suparikshan", "C-CHAKSHU"]
      : ["Privacy", "Safety", "Security", "Open Source & Indigenous Frameworks"];

    modules.push(sectionModule({
      id: pillar.id,
      order: modules.length + 1,
      title: pillar.title,
      color: pillar.color,
      items,
      asLayer: true
    }));
  });

  return modules;
}

function sectionModule({ id, order, title, color, items, asLayer = false }) {
  const section = sectionNotes[title];
  const overviewTitle = title;
  const overviewLesson = lessonFromParts({
    id,
    title: overviewTitle,
    blockKey: asLayer ? `module:${slug(id)}` : `section:${slug(id)}`,
    overview: `${title} is ${section.role}`,
    objectives: [
      `Explain the role of ${title}`,
      "Identify the blocks connected to this area",
      "Use this area to diagnose real PINAKAA workflows"
    ],
    paragraphs: [
      section.focus,
      asLayer
        ? `${title} is a major horizontal layer in the architecture. It groups several lower-level sections that work together as one operational layer.`
        : `${title} is a map section. Each tile inside it has its own lesson because learners need to understand both the group and the individual technologies.`,
      "When using PINAKAA, this area should be interpreted together with dependencies below it and the monitoring/security pillars beside it.",
      `A useful study habit is to connect ${title} to concrete evidence: benchmark numbers, profiler traces, scheduler placement, file-system behavior, telemetry, or security policy. That turns the architecture map into a diagnostic workflow instead of a diagram to memorize.`,
      `When this area is unhealthy, symptoms usually appear somewhere else first. A learner should trace the symptom backward through adjacent blocks, then downward into runtime, OS, driver, compiler, storage, and monitoring signals.`
    ],
    diagram: ["AMD PINAKAA Studio", title, "Individual technology blocks", "Lower-layer dependencies", "Operational signals"],
    example: section.example,
    relatedBlocks: buildRelatedBlocks(title, title),
    glossary: glossaryFor(title, title),
    checks: checklistFor(title, title)
  });

  const lessons = [overviewLesson, ...items.map((item) => itemLesson(item, title))];
  return moduleOf({
    id,
    order,
    title,
    color,
    description: section.focus,
    lessons
  });
}

function itemLesson(item, sectionTitle) {
  const notes = itemNotes[item] || [
    `${item} is a named technology block in the ${sectionTitle} area of AMD PINAKAA Studio.`,
    `Learn ${item} by asking what it does, what it depends on, and which monitoring or security signals validate it.`,
    `${item} should be studied as part of the full architecture rather than as an isolated tool.`
  ];

  return lessonFromParts({
    id: slug(item),
    title: item,
    blockKey: `item:${slug(item)}`,
    overview: notes[0],
    objectives: [
      `Define what ${item} does in PINAKAA`,
      `Connect ${item} to the ${sectionTitle} section`,
      `Identify the dependencies and signals around ${item}`
    ],
    paragraphs: [
      notes[1],
      notes[2],
      `${item} sits in the ${sectionTitle} section. In practice, the learner should connect it to the layers below it, the tools beside it, and the gold monitoring/security pillars that keep the platform observable and trustworthy.`,
      `${item} should be studied through three views: the user-facing purpose, the lower-level dependency path, and the operational evidence that proves the block is healthy. This prevents shallow memorization and helps learners reason through real cluster problems.`,
      `A strong learner can explain what would break if ${item} were misconfigured, what neighboring blocks would show symptoms, and which measurements would confirm the root cause.`
    ],
    diagram: ["AMD PINAKAA Studio", `${sectionTitle} section`, `${item} block`, dependencyLabel(sectionTitle), "Monitoring and security validation"],
    example: `When investigating ${item}, start with its immediate role in ${sectionTitle}, then check the lower-layer runtime, configuration, data path, and telemetry that prove it is working.`,
    relatedBlocks: buildRelatedBlocks(item, sectionTitle),
    glossary: glossaryFor(item, sectionTitle),
    checks: checklistFor(item, sectionTitle)
  });
}

function moduleOf(module) {
  const lessons = module.lessons.map((lesson, index) => ({
    lessonType: "text",
    estimatedMinutes: 6,
    summary: lesson.summary || lesson.overview,
    quiz: [],
    flashcards: [],
    order: index + 1,
    moduleId: module.id,
    moduleTitle: module.title,
    moduleOrder: module.order,
    moduleColor: module.color,
    courseId: "amd-pinakaa-studio",
    blockKey: lesson.blockKey,
    ...lesson
  }));

  return {
    ...module,
    estimatedMinutes: lessons.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0),
    lessons
  };
}

function lessonFromParts({ id, title, blockKey, overview, objectives, paragraphs, diagram, example, relatedBlocks = [], glossary = [], checks = [] }) {
  return {
    id: slug(id || title),
    title,
    blockKey,
    overview,
    learningObjectives: objectives,
    relatedBlocks,
    glossary,
    checks,
    content: [
      ...paragraphs.map((body) => ({ type: "paragraph", body })),
      { type: "diagram", title: "Architecture Path", nodes: diagram },
      { type: "example", body: example }
    ]
  };
}

function buildRelatedBlocks(subject, sectionTitle) {
  const sameSection = getSectionItems(sectionTitle)
    .filter((item) => slug(item) !== slug(subject))
    .slice(0, 3);
  const dependencyBlocks = sectionDependencyBlocks[sectionTitle] || [];
  const labels = subject === sectionTitle
    ? [...sameSection, ...dependencyBlocks]
    : [sectionTitle, ...sameSection, ...dependencyBlocks];

  return unique(labels)
    .filter((label) => slug(label) !== slug(subject))
    .map((label) => relatedBlock(label, relationFor(label, sectionTitle, sameSection)))
    .filter(Boolean)
    .slice(0, 8);
}

function relationFor(label, sectionTitle, sameSection) {
  if (label === sectionTitle) return "Parent section";
  if (sameSection.includes(label)) return "Neighbor block";
  if (label === "Cluster Monitoring" || label === "Prometheus") return "Observability signal";
  if (label === "Security" || label === "Privacy" || label === "Safety") return "Governance check";
  return "Dependency";
}

function relatedBlock(label, relation) {
  const normalized = slug(label);
  const section = getSectionByTitle(label);
  if (section) {
    return {
      label,
      relation,
      lessonId: section.id,
      blockKey: `section:${section.id}`
    };
  }

  const pillar = pinakaaArchitecture.pillars.find((item) => slug(item.title) === normalized);
  if (pillar) {
    return {
      label,
      relation,
      lessonId: pillar.id,
      blockKey: `module:${pillar.id}`
    };
  }

  const layer = pinakaaArchitecture.layers.find((item) => slug(item.title) === normalized);
  if (layer) {
    const layerId = layer.id === "studio-tools" ? "pinakaa-overview" : layer.id;
    return {
      label,
      relation,
      lessonId: layerId,
      blockKey: `module:${layerId}`
    };
  }

  if (itemNotes[label]) {
    return {
      label,
      relation,
      lessonId: slug(label),
      blockKey: `item:${slug(label)}`
    };
  }

  return null;
}

function glossaryFor(subject, sectionTitle) {
  const subjectDefinition = itemNotes[subject]?.[0] || sectionNotes[subject]?.role || sectionNotes[sectionTitle]?.role;
  const terms = [
    [subject, subjectDefinition],
    ...(sectionGlossary[sectionTitle] || []),
    ["Dependency path", "The chain of lower-level blocks that must work correctly before the selected block can succeed."],
    ["Operational signal", "A measurement, log, trace, benchmark, or policy check that confirms whether a block is healthy."]
  ];

  return uniqueByTerm(terms)
    .filter(([term, definition]) => term && definition)
    .slice(0, 7)
    .map(([term, definition]) => ({ term, definition }));
}

function checklistFor(subject, sectionTitle) {
  const dependencies = (sectionDependencyBlocks[sectionTitle] || []).slice(0, 3).join(", ");
  return [
    `State what ${subject} does without naming only the acronym or product name.`,
    `Name the immediate PINAKAA area it belongs to: ${sectionTitle}.`,
    dependencies
      ? `Check the nearest dependency blocks: ${dependencies}.`
      : "Check the nearest lower-layer runtime, configuration, and data-path dependency.",
    "Identify one monitoring signal and one security or policy concern that could affect real use."
  ];
}

function getSectionItems(sectionTitle) {
  return getSectionByTitle(sectionTitle)?.items || [];
}

function getSectionByTitle(sectionTitle) {
  for (const layer of pinakaaArchitecture.layers) {
    const section = layer.sections.find((item) => item.title === sectionTitle);
    if (section) return section;
  }
  return null;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function uniqueByTerm(entries) {
  const seen = new Set();
  return entries.filter(([term]) => {
    const normalized = slug(term);
    if (seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function slug(value) {
  return String(value).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function dependencyLabel(sectionTitle) {
  const labels = {
    "Performance Benchmarks": "Communication, math, memory, I/O, and runtime paths",
    Applications: "Middleware, compilers, math libraries, drivers, and storage",
    "Visualization Tools": "Data formats, file systems, memory, and remote rendering paths",
    "Dev Tools": "Compiler, profiler, debugger, launcher, and runtime configuration",
    "Communication Libraries": "Fabric, rank placement, GPU affinity, and MPI/RCCL runtime",
    "Provisioning & Resource Management": "Node images, scheduler policy, containers, and services",
    "AI Frameworks": "Python environment, GPU kernels, collectives, and data pipeline",
    "File System": "Metadata service, striping, throughput, and access policy",
    "Drivers & OS": "Kernel, devices, ROCm runtime, packages, and security policy",
    Toolchain: "Source code, compiler output, runtime symbols, and hardware counters",
    "Math Libraries": "ROCm drivers, GPU runtime, compiler linkage, and problem shape",
    "Compilers & Transpilers": "Source model, target architecture, ABI, and linked libraries",
    "Parallel Prog. Models": "Compiler support, runtime behavior, placement, and profiling",
    "Cluster Monitoring": "Metrics, logs, traces, health checks, and alerts",
    "Privacy, Safety & Security": "Identity, data policy, isolation, audit, and trusted frameworks"
  };

  return labels[sectionTitle] || "Lower-layer runtime, configuration, and data path";
}
