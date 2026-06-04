export const abbreviationExpansions = {
  ABI: "Application Binary Interface",
  AI: "Artificial Intelligence",
  AMD: "Advanced Micro Devices",
  AOCC: "AMD Optimizing C/C++ Compiler",
  AOCL: "AMD Optimizing CPU Libraries",
  API: "Application Programming Interface",
  BLAS: "Basic Linear Algebra Subprograms",
  CAPC: "Compiler and Accelerator Programming Component",
  "C-CHAKSHU": "C-CHAKSHU cluster visibility and diagnostics framework",
  CFD: "Computational Fluid Dynamics",
  CHAP: "Cluster Health and Analysis Platform",
  CLAP: "Common Linear Algebra Package",
  CPU: "Central Processing Unit",
  FFT: "Fast Fourier Transform",
  FLOPS: "Floating-Point Operations Per Second",
  GCC: "GNU Compiler Collection",
  GDB: "GNU Debugger",
  Gdb: "GNU Debugger",
  GPU: "Graphics Processing Unit",
  GrADS: "Grid Analysis and Display System",
  Grads: "Grid Analysis and Display System",
  Graph500: "Graph 500 graph analytics benchmark",
  GROMACS: "GROningen MAchine for Chemical Simulations",
  Gromacs: "GROningen MAchine for Chemical Simulations",
  "Gprof-ng": "GNU next-generation profiler",
  HDF5: "Hierarchical Data Format version 5",
  Hdf5: "Hierarchical Data Format version 5",
  HIP: "Heterogeneous-compute Interface for Portability",
  HPL: "High Performance Linpack",
  HPC: "High Performance Computing",
  HPCG: "High Performance Conjugate Gradients",
  IOPS: "Input/Output Operations Per Second",
  "I/O": "Input/Output",
  KVM: "Kernel-based Virtual Machine",
  LAMMPS: "Large-scale Atomic/Molecular Massively Parallel Simulator",
  LLVM: "Low Level Virtual Machine compiler infrastructure",
  MLPerf: "Machine Learning Performance benchmark suite",
  MPI: "Message Passing Interface",
  MVAPICH: "MPI over InfiniBand, Omni-Path, Ethernet/X, and Slingshot",
  NAMD: "Nanoscale Molecular Dynamics",
  NFS: "Network File System",
  NIC: "Network Interface Card",
  NUMA: "Non-Uniform Memory Access",
  NumPy: "Numerical Python",
  Numpy: "Numerical Python",
  OpenMP: "Open Multi-Processing",
  OpenMPI: "Open Message Passing Interface",
  OS: "Operating System",
  OSU: "Ohio State University MPI Micro-Benchmarks",
  ParaDE: "Parallel Development Environment",
  ParaScc: "Parallel Source-to-Code Compiler",
  PETSc: "Portable, Extensible Toolkit for Scientific Computation",
  PINAKAA: "PINAKAA Studio HPC and AI software ecosystem",
  PME: "Particle Mesh Ewald",
  RCCL: "ROCm Communication Collectives Library",
  "rccl-tests": "ROCm Communication Collectives Library tests",
  ROCgdb: "ROCm GNU Debugger",
  ROCm: "Radeon Open Compute",
  rocBLAS: "ROCm Basic Linear Algebra Subprograms library",
  rocFFT: "ROCm Fast Fourier Transform library",
  rocHPL: "ROCm High Performance Linpack",
  rocprof: "ROCm profiler",
  SYCL: "Standard C++-based heterogeneous programming model",
  TAU: "Tuning and Analysis Utilities",
  VMD: "Visual Molecular Dynamics",
  XGBoost: "Extreme Gradient Boosting"
};

const abbreviationPattern = new RegExp(
  `(${Object.keys(abbreviationExpansions)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|")})`,
  "g"
);

export function expansionFor(value) {
  return abbreviationExpansions[value] || null;
}

export function titleWithExpansion(value) {
  const text = String(value);
  const exact = expansionFor(text);
  if (exact) return `${text}: ${exact}`;

  const matches = [...new Set(text.match(abbreviationPattern) || [])];
  if (!matches.length) return text;
  return `${text} | ${matches.map((match) => `${match}: ${expansionFor(match)}`).join(" | ")}`;
}

export function GlossedText({ text }) {
  const value = String(text ?? "");
  const parts = value.split(abbreviationPattern).filter((part) => part !== "");

  return parts.map((part, index) => {
    const expansion = expansionFor(part);
    if (!expansion) return part;

    return (
      <abbr key={`${part}-${index}`} className="abbr-term" title={expansion}>
        {part}
      </abbr>
    );
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
