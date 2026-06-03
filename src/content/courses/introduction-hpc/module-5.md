---
{
  "id": "parallel-programming",
  "title": "Parallel Programming",
  "description": "Shared memory, distributed memory, GPU programming, hybrid applications, and correctness concerns.",
  "order": 5,
  "estimatedMinutes": 66,
  "color": "#295ba8",
  "dependencies": ["middleware-resource-management"],
  "outcomes": ["Choose MPI, OpenMP, or GPU models", "Understand decomposition", "Recognize parallel correctness risks"],
  "lessons": [
    {
      "id": "parallel-decomposition",
      "title": "Decomposition and Communication",
      "overview": "Parallel programs divide work and data, then coordinate through communication, synchronization, and reduction patterns.",
      "lessonType": "interactive-diagram",
      "order": 1,
      "estimatedMinutes": 22,
      "learningObjectives": ["Explain domain and task decomposition", "Identify halo exchange and reduction patterns", "Connect decomposition to load balance"],
      "content": [
        { "type": "paragraph", "body": "A parallel program must divide work into pieces that can run at the same time. Domain decomposition splits data by region, while task decomposition splits work by function. The right choice depends on data dependencies and workload balance." },
        { "type": "paragraph", "body": "Communication patterns include point-to-point messages, halo exchanges, broadcasts, gathers, reductions, and barriers. Good programs do enough communication for correctness without drowning computation in synchronization overhead." },
        { "type": "diagram", "title": "Parallel Patterns", "nodes": ["Split domain", "Compute local work", "Exchange halos", "Reduce results", "Write output"] },
        { "type": "example", "body": "A stencil simulation divides a grid across ranks. Each rank updates local cells, then exchanges boundary values with neighboring ranks before the next time step." }
      ],
      "summary": "Parallel design starts with decomposition and succeeds when communication, load balance, and locality fit the problem.",
      "quiz": [
        { "id": "q-dec-1", "question": "What is domain decomposition?", "choices": ["Splitting data or spatial regions across workers", "Compressing source code", "Replacing a scheduler", "Changing file permissions"], "answer": 0, "explanation": "Domain decomposition assigns parts of a data domain to workers." },
        { "id": "q-dec-2", "question": "What is a reduction?", "choices": ["Combining values from many workers into a result", "Deleting job history", "Reducing screen brightness", "Installing fewer libraries"], "answer": 0, "explanation": "Reductions combine partial results such as sums or maxima." }
      ],
      "flashcards": [
        { "id": "fc-dec-1", "front": "Halo exchange", "back": "Neighbor communication that shares boundary data between decomposed regions." },
        { "id": "fc-dec-2", "front": "Load balance", "back": "Keeping workers similarly busy so no rank or thread becomes the long pole." }
      ]
    },
    {
      "id": "parallel-mpi-openmp",
      "title": "MPI, OpenMP, and Hybrid Models",
      "overview": "MPI handles distributed memory processes; OpenMP coordinates threads inside a shared-memory node; hybrid codes often use both.",
      "lessonType": "code",
      "order": 2,
      "estimatedMinutes": 23,
      "learningObjectives": ["Compare MPI and OpenMP", "Read a simple hybrid launch", "Identify when hybrid designs help"],
      "content": [
        { "type": "paragraph", "body": "MPI is a library standard for message passing between processes. It is the dominant model for multi-node distributed memory HPC. OpenMP uses compiler directives and runtime calls to parallelize work across threads within shared memory." },
        { "type": "paragraph", "body": "Hybrid programs use fewer MPI ranks per node and several threads per rank. This can reduce communication pressure, improve memory use, or match hardware topology, but it adds complexity around thread safety and affinity." },
        { "type": "code", "language": "bash", "body": "export OMP_NUM_THREADS=8\nsrun --nodes=4 --ntasks-per-node=8 --cpus-per-task=8 ./hybrid_solver" },
        { "type": "diagram", "title": "Hybrid Layout", "nodes": ["Node", "MPI ranks", "OpenMP threads", "Shared memory", "Network messages"] }
      ],
      "summary": "MPI scales across nodes; OpenMP uses threads inside nodes; hybrid models combine both for topology-aware performance.",
      "quiz": [
        { "id": "q-mpi-1", "question": "What does MPI primarily provide?", "choices": ["Message passing between processes", "Browser routing", "Database migrations", "Image compression"], "answer": 0, "explanation": "MPI is the standard message-passing interface." },
        { "id": "q-mpi-2", "question": "Where does OpenMP usually operate?", "choices": ["Shared memory inside a node", "Only object storage", "Only the login page", "Only external APIs"], "answer": 0, "explanation": "OpenMP coordinates threads in shared memory." }
      ],
      "flashcards": [
        { "id": "fc-mpi-1", "front": "MPI", "back": "Message Passing Interface for communication among distributed processes." },
        { "id": "fc-mpi-2", "front": "Hybrid MPI plus OpenMP", "back": "A program using MPI processes and threaded regions together." }
      ]
    },
    {
      "id": "parallel-gpu-programming",
      "title": "GPU Programming Concepts",
      "overview": "GPU programming exposes massive parallelism but requires attention to memory movement, occupancy, kernels, and programming frameworks.",
      "lessonType": "code",
      "order": 3,
      "estimatedMinutes": 21,
      "learningObjectives": ["Explain kernels and device memory", "Recognize common GPU programming models", "Understand why data movement matters"],
      "content": [
        { "type": "paragraph", "body": "GPUs contain many execution units optimized for throughput. Programmers launch kernels that run many lightweight threads over data. Effective GPU programs expose enough parallelism and use memory coalescing, shared memory, and occupancy wisely." },
        { "type": "paragraph", "body": "Programming options include CUDA, HIP, OpenMP offload, OpenACC, SYCL, Kokkos, RAJA, and domain frameworks. Portability layers help target multiple architectures, but tuning still matters." },
        { "type": "code", "language": "cpp", "body": "// Pseudocode\nparallel_for(each cell) {\n  next[cell] = stencil(current, neighbors(cell));\n}" },
        { "type": "example", "body": "A kernel that transfers data between host and device every iteration may be slower than a CPU version. Keeping data resident on the GPU can be the real optimization." }
      ],
      "summary": "GPU performance depends on parallelism, memory behavior, and minimizing unnecessary host-device movement.",
      "quiz": [
        { "id": "q-gpu-1", "question": "What is a GPU kernel?", "choices": ["A function launched to run many parallel threads on the GPU", "A Linux package manager", "A scheduler account", "A storage mount point"], "answer": 0, "explanation": "Kernels execute parallel work on GPU devices." },
        { "id": "q-gpu-2", "question": "Why minimize host-device copies?", "choices": ["Data transfer can dominate runtime", "It changes course prerequisites", "It disables the compiler", "It removes all memory needs"], "answer": 0, "explanation": "PCIe or fabric transfers can be expensive relative to computation." }
      ],
      "flashcards": [
        { "id": "fc-gpu-1", "front": "GPU kernel", "back": "A device function executed by many parallel GPU threads." },
        { "id": "fc-gpu-2", "front": "GPU data movement rule", "back": "Keep data on the device when possible and avoid unnecessary host-device transfers." }
      ]
    }
  ]
}
---
