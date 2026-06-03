---
{
  "id": "system-software",
  "title": "System Software",
  "description": "Operating systems, drivers, compilers, math libraries, containers, and environment modules.",
  "order": 3,
  "estimatedMinutes": 61,
  "color": "#3f8f35",
  "dependencies": ["cluster-architecture"],
  "outcomes": ["Use environment modules", "Explain compiler and library roles", "Understand driver/runtime compatibility"],
  "lessons": [
    {
      "id": "software-os-drivers",
      "title": "Operating Systems and Drivers",
      "overview": "The OS, kernel, device drivers, and accelerator runtimes create the base layer on which every HPC application depends.",
      "lessonType": "text",
      "order": 1,
      "estimatedMinutes": 20,
      "learningObjectives": ["Explain why OS consistency matters", "Describe driver and runtime roles", "Recognize compatibility risk"],
      "content": [
        { "type": "paragraph", "body": "HPC sites typically standardize compute node images so jobs see predictable kernels, libraries, drivers, security settings, and mount points. Even small differences can break applications compiled against specific runtime versions." },
        { "type": "paragraph", "body": "GPU and accelerator software stacks include kernel drivers, user-space runtimes, math libraries, profilers, debuggers, and communication plugins. These pieces must match firmware and application expectations." },
        { "type": "diagram", "title": "Base Software Layer", "nodes": ["Kernel", "Device drivers", "Accelerator runtime", "System libraries", "Security policy"] },
        { "type": "example", "body": "A ROCm or CUDA application may compile successfully but fail at runtime if the node driver and user-space runtime are incompatible." }
      ],
      "summary": "Stable system software is a foundation. Drivers, kernels, and runtimes must align with applications and hardware.",
      "quiz": [
        { "id": "q-os-1", "question": "Why do clusters standardize node images?", "choices": ["To provide predictable runtime environments", "To make every user write the same code", "To remove schedulers", "To avoid networking"], "answer": 0, "explanation": "Consistency reduces runtime and compatibility failures." },
        { "id": "q-os-2", "question": "What can happen if GPU drivers and runtimes mismatch?", "choices": ["Runtime failures or missing device support", "Automatic performance perfection", "No need for libraries", "More storage metadata"], "answer": 0, "explanation": "Driver/runtime mismatches are a common source of accelerator failures." }
      ],
      "flashcards": [
        { "id": "fc-os-1", "front": "Why standardize compute images?", "back": "To keep kernels, drivers, libraries, and policies predictable across jobs." },
        { "id": "fc-os-2", "front": "Driver/runtime compatibility", "back": "Kernel drivers and user-space runtimes must match hardware and application expectations." }
      ]
    },
    {
      "id": "software-compilers-libraries",
      "title": "Compilers and Math Libraries",
      "overview": "Compiler choice, optimization flags, MPI implementations, BLAS, FFT, and solver libraries strongly influence application performance.",
      "lessonType": "code",
      "order": 2,
      "estimatedMinutes": 21,
      "learningObjectives": ["Explain compiler optimization", "Identify common math libraries", "Understand ABI and MPI compatibility"],
      "content": [
        { "type": "paragraph", "body": "Compilers translate source code into binaries optimized for a target CPU or accelerator. Flags can enable vector instructions, link-time optimization, OpenMP, GPU offload, or architecture-specific tuning." },
        { "type": "paragraph", "body": "Math libraries package highly tuned implementations of dense linear algebra, sparse solvers, FFTs, random numbers, and collectives. Using a vendor-tuned BLAS can be much faster than hand-written loops." },
        { "type": "code", "language": "bash", "body": "module load gcc openmpi openblas\nmpicc -O3 -march=native solver.c -lopenblas -o solver\nsrun -n 128 ./solver" },
        { "type": "diagram", "title": "Build Chain", "nodes": ["Source", "Compiler", "MPI", "Math libraries", "Executable"] }
      ],
      "summary": "Good builds use compatible compilers and libraries tuned for the machine and programming model.",
      "quiz": [
        { "id": "q-comp-1", "question": "What is one purpose of compiler optimization flags?", "choices": ["Generate faster code for a target architecture", "Create user accounts", "Allocate scheduler priority", "Back up databases"], "answer": 0, "explanation": "Optimization flags influence generated machine code." },
        { "id": "q-comp-2", "question": "Why use tuned math libraries?", "choices": ["They provide optimized kernels for common numerical operations", "They replace the operating system", "They prevent all bugs", "They store cluster logs"], "answer": 0, "explanation": "Libraries like BLAS and FFT implementations are heavily optimized." }
      ],
      "flashcards": [
        { "id": "fc-comp-1", "front": "What does MPI provide?", "back": "A message-passing interface for communication between distributed processes." },
        { "id": "fc-comp-2", "front": "Why load matching compiler and MPI modules?", "back": "ABI and runtime compatibility can break when build components are mixed incorrectly." }
      ]
    },
    {
      "id": "software-modules-containers",
      "title": "Modules and Containers",
      "overview": "Environment modules and HPC containers help users switch complex software stacks without modifying the base system.",
      "lessonType": "code",
      "order": 3,
      "estimatedMinutes": 20,
      "learningObjectives": ["Use module commands", "Explain container benefits", "Know when containers do not remove hardware dependencies"],
      "content": [
        { "type": "paragraph", "body": "Environment modules modify variables such as PATH, LD_LIBRARY_PATH, MANPATH, and compiler wrappers. They let users select software versions and keep incompatible stacks separate." },
        { "type": "paragraph", "body": "Containers package user-space dependencies for repeatability. HPC container runtimes such as Apptainer are designed for shared clusters and can expose GPUs, high-speed networks, and parallel file systems without giving users full root privileges." },
        { "type": "code", "language": "bash", "body": "module avail\nmodule load python/3.11 openmpi/5\napptainer exec --nv pytorch.sif python train.py" },
        { "type": "example", "body": "A container can carry a Python environment, but it still relies on compatible host GPU drivers and network libraries for full accelerator and MPI performance." }
      ],
      "summary": "Modules manage site software; containers improve reproducibility but still depend on host hardware integration.",
      "quiz": [
        { "id": "q-mod-1", "question": "What does an environment module usually change?", "choices": ["Shell environment variables", "Physical rack cabling", "CPU transistor count", "Quiz answers"], "answer": 0, "explanation": "Modules adjust variables so commands and libraries resolve to selected versions." },
        { "id": "q-mod-2", "question": "What do containers help with?", "choices": ["Reproducible user-space environments", "Replacing every device driver", "Cooling the data center", "Automatically tuning all algorithms"], "answer": 0, "explanation": "Containers package dependencies, but hardware integration still matters." }
      ],
      "flashcards": [
        { "id": "fc-mod-1", "front": "Environment modules", "back": "A tool for switching software stacks by changing shell environment variables." },
        { "id": "fc-mod-2", "front": "HPC container caveat", "back": "Containers package user space, but host drivers and hardware libraries still matter." }
      ]
    }
  ]
}
---
