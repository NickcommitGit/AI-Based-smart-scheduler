
export const osQuestions = [
  // Basic Questions
  {
    id: 1,
    question: "What is an operating system?",
    options: [
      "A system software that manages computer hardware and software resources",
      "A type of application software for editing documents",
      "A hardware component inside the computer",
      "A programming language used to create applications"
    ],
    correctAnswer: 0,
    difficulty: "basic" as const
  },
  {
    id: 2,
    question: "Which of the following is NOT an operating system?",
    options: [
      "Windows",
      "macOS",
      "Linux",
      "Oracle"
    ],
    correctAnswer: 3,
    difficulty: "basic" as const
  },
  {
    id: 3,
    question: "What is the primary function of a kernel in an operating system?",
    options: [
      "Managing the user interface",
      "Connecting to the internet",
      "Managing system resources like CPU and memory",
      "Storing user data and files"
    ],
    correctAnswer: 2,
    difficulty: "basic" as const
  },
  {
    id: 4,
    question: "Which component of an OS is responsible for managing files?",
    options: [
      "Memory Manager",
      "File System",
      "Process Scheduler",
      "Network Manager"
    ],
    correctAnswer: 1,
    difficulty: "basic" as const
  },
  {
    id: 5,
    question: "What is a process in the context of operating systems?",
    options: [
      "A computer program in execution",
      "A hardware component",
      "A type of file system",
      "A user interface element"
    ],
    correctAnswer: 0,
    difficulty: "basic" as const
  },
  // Basic Questions continue...
  {
    id: 6,
    question: "What is multitasking in operating systems?",
    options: [
      "Running multiple computers at once",
      "Executing multiple processes concurrently",
      "Having multiple users on the same system",
      "Using multiple monitors simultaneously"
    ],
    correctAnswer: 1,
    difficulty: "basic" as const
  },
  {
    id: 7,
    question: "What is virtual memory?",
    options: [
      "Memory that doesn't physically exist",
      "A technique that uses disk space as an extension of RAM",
      "A special type of RAM that is faster than regular RAM",
      "Memory used exclusively by virtual machines"
    ],
    correctAnswer: 1,
    difficulty: "basic" as const
  },
  {
    id: 8,
    question: "What is the purpose of an interrupt in an operating system?",
    options: [
      "To stop the computer from functioning",
      "To signal the occurrence of an event that needs immediate attention",
      "To increase system performance",
      "To connect peripheral devices"
    ],
    correctAnswer: 1,
    difficulty: "basic" as const
  },
  
  // Intermediate Questions
  {
    id: 9,
    question: "What is the difference between preemptive and non-preemptive scheduling?",
    options: [
      "Preemptive scheduling allows a process to be interrupted, while non-preemptive doesn't",
      "Preemptive scheduling is used only in Windows, while non-preemptive is used in Linux",
      "Preemptive scheduling is slower than non-preemptive scheduling",
      "There is no difference between them"
    ],
    correctAnswer: 0,
    difficulty: "intermediate" as const
  },
  {
    id: 10,
    question: "What is a deadlock in operating systems?",
    options: [
      "When a system crashes completely",
      "A situation where two or more processes are unable to proceed because each is waiting for the other to release a resource",
      "A virus that locks all system files",
      "When the CPU usage reaches 100%"
    ],
    correctAnswer: 1,
    difficulty: "intermediate" as const
  },
  {
    id: 11,
    question: "What is the purpose of paging in memory management?",
    options: [
      "To increase the size of RAM",
      "To optimize CPU scheduling",
      "To allow processes to be stored in non-contiguous memory locations",
      "To improve graphics rendering"
    ],
    correctAnswer: 2,
    difficulty: "intermediate" as const
  },
  {
    id: 12,
    question: "What is a semaphore in operating systems?",
    options: [
      "A type of interrupt signal",
      "A synchronization tool used to control access to a common resource in a concurrent system",
      "A special type of file system",
      "A network protocol used by operating systems"
    ],
    correctAnswer: 1,
    difficulty: "intermediate" as const
  },
  {
    id: 13,
    question: "Which of the following is a solution to the critical section problem?",
    options: [
      "Virtual memory",
      "Peterson's algorithm",
      "Round-robin scheduling",
      "File compression"
    ],
    correctAnswer: 1,
    difficulty: "intermediate" as const
  },
  
  // Advanced Questions
  {
    id: 14,
    question: "What is the Banker's algorithm used for in operating systems?",
    options: [
      "CPU scheduling",
      "Deadlock avoidance",
      "Memory allocation",
      "File system management"
    ],
    correctAnswer: 1,
    difficulty: "advanced" as const
  },
  {
    id: 15,
    question: "What is thrashing in the context of virtual memory management?",
    options: [
      "A virus that corrupts memory",
      "A situation where the system spends more time paging than executing",
      "A method to compress memory content",
      "An algorithm to optimize memory usage"
    ],
    correctAnswer: 1,
    difficulty: "advanced" as const
  },
  {
    id: 16,
    question: "What is the difference between a microkernel and a monolithic kernel?",
    options: [
      "A microkernel is smaller in size, while a monolithic kernel is larger",
      "A microkernel runs minimal services in kernel space with most running in user space, while a monolithic kernel runs all services in kernel space",
      "A microkernel is used only in embedded systems, while monolithic kernels are used in desktop computers",
      "There is no technical difference; the terms are interchangeable"
    ],
    correctAnswer: 1,
    difficulty: "advanced" as const
  },
  {
    id: 17,
    question: "What is a race condition in operating systems?",
    options: [
      "A competition between processes to access the CPU first",
      "A situation where the order of operations affects the outcome in a multi-threaded environment",
      "When two or more processes are racing to complete their execution",
      "A method to increase process execution speed"
    ],
    correctAnswer: 1,
    difficulty: "advanced" as const
  },
  {
    id: 18,
    question: "What is copy-on-write (COW) in the context of process management?",
    options: [
      "A technique where processes created via fork() initially share the same memory pages",
      "A method to duplicate files quickly",
      "A way to optimize printer operations",
      "A special command in the terminal to copy text"
    ],
    correctAnswer: 0,
    difficulty: "advanced" as const
  }
];
