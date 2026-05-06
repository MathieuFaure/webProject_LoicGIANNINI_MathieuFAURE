document.addEventListener('DOMContentLoaded', () => {
    // FILTER
    const catBtns = document.querySelectorAll('.cat-btn');
    const yearRows = document.querySelectorAll('.year-row');

    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const year = btn.dataset.year;

            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            yearRows.forEach(row => {
                if (year === 'all' || row.dataset.year === year) {
                    row.style.display = 'block';
                    setTimeout(() => { row.style.opacity = '1'; }, 10);
                } else {
                    row.style.opacity = '0';
                    setTimeout(() => { row.style.display = 'none'; }, 400);
                }
            });
        });
    });

    // PLANNING
    let currentWeek = 1;
    const btnPrev = document.getElementById('prevWeek');
    const btnNext = document.getElementById('nextWeek');
    const label = document.getElementById('weekLabel');
    const week1 = document.getElementById('week1');
    const week2 = document.getElementById('week2');

    function updatePlanningDisplay() {

        if (!week1 || !week2 || !label) return;

        if (currentWeek === 1) {

            week1.style.display = "block";
            week2.style.display = "none";
            label.textContent = "Week 1 (Oct 20 - 24)";

            btnPrev.style.opacity = "0.3";
            btnPrev.style.pointerEvents = "none";
            btnNext.style.opacity = "1";
            btnNext.style.pointerEvents = "auto";
        } else {

            week1.style.display = "none";
            week2.style.display = "block";
            label.textContent = "Week 2 (Oct 27 - 31)";

            btnNext.style.opacity = "0.3";
            btnNext.style.pointerEvents = "none";
            btnPrev.style.opacity = "1";
            btnPrev.style.pointerEvents = "auto";
        }
    }

    if (btnNext && btnPrev) {
        btnNext.addEventListener('click', () => {
            currentWeek = 2;
            updatePlanningDisplay();
        });

        btnPrev.addEventListener('click', () => {
            currentWeek = 1;
            updatePlanningDisplay();
        });
    }

    updatePlanningDisplay();

    // MODAL
    const modal = document.getElementById('courseModal');
    const closeModal = document.querySelector('.close-modal');

    if (closeModal) {
        closeModal.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";

            // Optionnel : Reset à la semaine 1 pour la prochaine ouverture
            currentWeek = 1;
            updatePlanningDisplay();
        };
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
            currentWeek = 1;
            updatePlanningDisplay();
        }
    };
});

// OPEN MODAL
const courseData = {
    "Algorithms & Logic": {
        info: "CS101 | Instructor: Dr. Alan Turing (a.turing@efrei.fr) | Office: Room 302 | Credits: 6 ECTS",
        description: "Foundations of computational thinking and procedural programming using Python. Students learn to translate logic into executable code.",
        objectives: "Analyze problem complexity, design robust flowcharts, and implement algorithms.",
        resources: "Textbook: 'Introduction to Algorithms' (CLRS) | Software: Python 3.12, PyCharm.",
        calendar: "Week 1: Logic Gates | Week 2: Control Flow | Week 3: Functions | Week 4: Recursion.",
        grading: "30% Continuous Assessment, 20% Midterm Project, 50% Final Exam.",
        rules: "Attendance: Mandatory (>80%) | Academic Integrity: Zero tolerance for plagiarism/unauthorized AI."
    },
    "Computer Architecture": {
        info: "CS102 | Instructor: Prof. Grace Hopper (g.hopper@efrei.fr) | Office: Room 105 | Credits: 6 ECTS",
        description: "Exploration of the internal structure of computers, focusing on how hardware executes software instructions.",
        objectives: "Master binary arithmetic, design logic circuits, and understand CPU instruction cycles.",
        resources: "Digital Logic Design Simulator (Logisim) | Computer Organization and Design (Patterson & Hennessy).",
        calendar: "Week 1: Binary/Hex | Week 2: Logic Gates | Week 3: CPU & ALU | Week 4: Memory Hierarchy.",
        grading: "40% Lab Exercises (Circuits), 60% Final Exam.",
        rules: "Safety: No food/drinks in hardware labs. Collaboration allowed on circuit design but reports must be individual."
    },
    "Discrete Mathematics": {
        info: "MA101 | Instructor: Dr. Ada Lovelace (a.lovelace@efrei.fr) | Office: Room 410 | Credits: 4 ECTS",
        description: "Mathematical structures that are fundamentally discrete rather than continuous, essential for algorithm analysis.",
        objectives: "Apply set theory, master boolean algebra for circuit simplification, and solve graph-related problems.",
        resources: "Discrete Mathematics and Its Applications (Kenneth Rosen) | Course Booklets.",
        calendar: "Week 1: Set Theory | Week 2: Formal Logic | Week 3: Induction & Proofs | Week 4: Graph Theory.",
        grading: "20% Weekly Quizzes, 80% Final Examination.",
        rules: "Calculators: Only non-programmable models allowed during exams."
    },
    "C Programming": {
        info: "CS201 | Instructor: Dennis Ritchie (d.ritchie@efrei.fr) | Office: Room 202 | Credits: 6 ECTS",
        description: "Deep dive into low-level programming to understand how software interacts directly with computer memory.",
        objectives: "Master pointer manipulation, manage dynamic memory allocation (malloc/free), and build custom data structures.",
        resources: "The C Programming Language (K&R) | GCC Compiler | Valgrind for memory leak detection.",
        calendar: "Week 1: Syntax & Types | Week 2: Pointers | Week 3: Memory Allocation | Week 4: File I/O.",
        grading: "50% Coding Projects, 50% Practical Lab Exam.",
        rules: "Code Quality: Must follow Efrei coding standards. Zero points if code fails to compile."
    },
    "Web Technologies": {
        info: "WD101 | Instructor: Sir Tim Berners-Lee (t.blee@efrei.fr) | Office: Room 305 | Credits: 4 ECTS",
        description: "Comprehensive introduction to the architecture of the World Wide Web and frontend development.",
        objectives: "Develop responsive layouts with HTML5/CSS3 and create interactive elements with Vanilla JavaScript.",
        resources: "MDN Web Docs | VS Code Editor | Browser Developer Tools.",
        calendar: "Week 1: Semantic HTML | Week 2: CSS Flexbox/Grid | Week 3: JS Basics | Week 4: DOM Manipulation.",
        grading: "60% Personal Portfolio Project, 40% Continuous Assessment.",
        rules: "Originality: Use of CSS frameworks (Bootstrap, etc.) is forbidden for this introductory module."
    },
    "Operating Systems I": {
        info: "CS202 | Instructor: Linus Torvalds (l.torvalds@efrei.fr) | Office: Room 101 | Credits: 6 ECTS",
        description: "Introduction to Unix-like operating systems, the command line interface, and system-level automation.",
        objectives: "Master the Linux CLI, write complex Bash scripts, and understand process/file system management.",
        resources: "Linux Virtual Machine (Ubuntu) | The Linux Command Line (William Shotts).",
        calendar: "Week 1: CLI Basics | Week 2: Permissions | Week 3: Shell Scripting | Week 4: Process Management.",
        grading: "30% Scripting Lab, 70% Final Exam (on Terminal).",
        rules: "Root access: Misuse of administrative privileges on lab machines will result in immediate exclusion."
    },
    "Object-Oriented Programming": {
        info: "CS301 | Instructor: Dr. James Gosling (j.gosling@efrei.fr) | Office: Room 210 | Credits: 6 ECTS",
        description: "Mastering the paradigm of Object-Oriented Programming using Java. Focus on creating reusable, maintainable, and scalable software.",
        objectives: "Implement inheritance and polymorphism, apply SOLID principles, and use common Design Patterns (Singleton, Factory).",
        resources: "Effective Java (Joshua Bloch) | IntelliJ IDEA | JDK 21.",
        calendar: "Week 1: Classes & Objects | Week 2: Inheritance | Week 3: Interfaces & Polymorphism | Week 4: Design Patterns.",
        grading: "40% Weekly Coding Labs, 60% Final Project (Desktop App).",
        rules: "Code must follow Oracle Java Style Guide. Documentation (Javadoc) is mandatory."
    },
    "Data Structures": {
        info: "CS302 | Instructor: Prof. Niklaus Wirth (n.wirth@efrei.fr) | Office: Room 308 | Credits: 6 ECTS",
        description: "In-depth study of how data is organized, managed, and stored to enable efficient access and modification.",
        objectives: "Build and optimize Linked Lists, Binary Search Trees, Stacks, and Hash Tables. Analyze algorithmic complexity.",
        resources: "Algorithms + Data Structures = Programs (Wirth) | Visualgo.net for visualizations.",
        calendar: "Week 1: Lists & Stacks | Week 2: Trees & Heaps | Week 3: Hashing | Week 4: Sorting Algorithms.",
        grading: "30% Algorithm Benchmarking Lab, 70% Final Exam.",
        rules: "Implementation must be done from scratch without using standard collections libraries initially."
    },
    "Database Systems": {
        info: "DB301 | Instructor: Dr. Edgar Codd (e.codd@efrei.fr) | Office: Room 405 | Credits: 4 ECTS",
        description: "Introduction to relational database management systems (RDBMS) and the art of structured querying.",
        objectives: "Design ER diagrams, normalize databases (1NF to 3NF), and write complex SQL joins and subqueries.",
        resources: "PostgreSQL | DBeaver | Database System Concepts (Silberschatz).",
        calendar: "Week 1: ER Modeling | Week 2: Normalization | Week 3: SQL Basics | Week 4: Advanced Joins & Triggers.",
        grading: "40% Database Design Project, 60% SQL Practical Exam.",
        rules: "All SQL queries must be optimized for performance. No ORM allowed for this course."
    },
    "Network Fundamentals": {
        info: "NW101 | Instructor: Vint Cerf (v.cerf@efrei.fr) | Office: Room 112 | Credits: 4 ECTS",
        description: "Understanding the physical and logical architecture of the Internet and local networks.",
        objectives: "Analyze the 7 layers of the OSI model, configure IP addressing (IPv4/IPv6), and understand routing protocols.",
        resources: "Cisco Packet Tracer | Wireshark | Computer Networking: A Top-Down Approach.",
        calendar: "Week 1: OSI Model | Week 2: Ethernet & Switching | Week 3: IP Routing | Week 4: TCP/UDP Protocols.",
        grading: "50% Packet Tracer Labs, 50% Theoretical Exam.",
        rules: "Labs must be validated in-person during the session."
    },
    "Software Engineering": {
        info: "SE201 | Instructor: Kent Beck (k.beck@efrei.fr) | Office: Room 205 | Credits: 6 ECTS",
        description: "Transitioning from coding to professional software development using industry-standard methodologies.",
        objectives: "Master Git/GitHub workflows, implement Agile (Scrum) practices, and perform Unit Testing (JUnit).",
        resources: "Clean Code (Robert Martin) | GitHub | Jira.",
        calendar: "Week 1: Version Control (Git) | Week 2: Agile & Scrum | Week 3: Unit Testing & TDD | Week 4: CI/CD Basics.",
        grading: "100% Group Project (Project Management + Code Quality).",
        rules: "Zero tolerance for 'Lone Wolf' behavior. Peer evaluation will impact 30% of the final grade."
    },
    "UI/UX Design": {
        info: "UI101 | Instructor: Don Norman (d.norman@efrei.fr) | Office: Room 501 | Credits: 4 ECTS",
        description: "Focus on the human-centered approach to software interface design and user experience.",
        objectives: "Conduct user research, create wireframes, and build interactive high-fidelity prototypes.",
        resources: "Figma | Adobe XD | The Design of Everyday Things.",
        calendar: "Week 1: Design Thinking | Week 2: Wireframing | Week 3: Prototyping in Figma | Week 4: Usability Testing.",
        grading: "70% Design Portfolio, 30% Presentation.",
        rules: "Prototypes must be fully interactive and tested with at least 3 real users."
    },
    "Artificial Intelligence": {
        info: "AI101 | Instructor: Dr. Marvin Minsky (m.minsky@efrei.fr) | Office: Room 303 | Credits: 6 ECTS",
        description: "Introduction to the core concepts of AI, focusing on classical search algorithms and symbolic logic before moving to modern heuristics.",
        objectives: "Implement A* and Minimax algorithms, understand expert systems, and master state-space search techniques.",
        resources: "Artificial Intelligence: A Modern Approach (Russell & Norvig) | Python (AIMA-python library).",
        calendar: "Week 1: State-Space Search | Week 2: Heuristics & A* | Week 3: Adversarial Search | Week 4: Logic & Knowledge.",
        grading: "40% Coding Assignments (Chess/Puzzle IA), 60% Final Exam.",
        rules: "Logic over brute force: Efficient algorithms are prioritized over high-resource computing."
    },
    "Cybersecurity": {
        info: "SEC101 | Instructor: Prof. Kevin Mitnick (k.mitnick@efrei.fr) | Office: Room 404 | Credits: 6 ECTS",
        description: "Comprehensive overview of system and network security, focusing on both offensive (pentesting) and defensive strategies.",
        objectives: "Understand symmetric/asymmetric encryption, perform basic SQL injections (in controlled labs), and secure network protocols.",
        resources: "Kali Linux | Metasploit Framework | Wireshark | 'The Art of Deception'.",
        calendar: "Week 1: Cryptography Basics | Week 2: Network Attacks | Week 3: Web Security | Week 4: Pentesting Lab.",
        grading: "50% CTF (Capture The Flag) Challenge, 50% Theoretical Assessment.",
        rules: "Ethics: Any use of learned techniques outside the lab environment results in immediate expulsion."
    },
    "Mobile Development": {
        info: "MOB101 | Instructor: Dr. Steve Jobs (s.jobs@efrei.fr) | Office: Room 505 | Credits: 4 ECTS",
        description: "Building native applications for the two major mobile ecosystems: iOS and Android.",
        objectives: "Master Swift for iOS development and Kotlin for Android. Understand mobile lifecycle and UI responsiveness.",
        resources: "Xcode (Mac required for iOS) | Android Studio | Firebase SDK.",
        calendar: "Week 1: Mobile UI Design | Week 2: Swift & iOS | Week 3: Kotlin & Android | Week 4: API Integration.",
        grading: "100% Final App Project (Dual-platform submission).",
        rules: "User Experience: Apps must follow Human Interface Guidelines (iOS) and Material Design (Android)."
    },
    "Cloud Computing": {
        info: "CLD101 | Instructor: Dr. Werner Vogels (w.vogels@efrei.fr) | Office: Room 202 | Credits: 6 ECTS",
        description: "Transitioning from monolithic applications to scalable, cloud-native microservices architectures.",
        objectives: "Deploy containers using Docker, orchestrate with Kubernetes, and manage AWS/Azure cloud resources.",
        resources: "AWS Academy Access | Docker Desktop | Terraform.",
        calendar: "Week 1: Virtualization vs Containers | Week 2: Docker | Week 3: Kubernetes | Week 4: Serverless Computing.",
        grading: "40% Practical Lab (Deployment), 60% Architecture Case Study.",
        rules: "Cost Management: Students are responsible for monitoring their cloud credit usage."
    },
    "Parallel Programming": {
        info: "PAR101 | Instructor: Prof. Seymour Cray (s.cray@efrei.fr) | Office: Room 108 | Credits: 4 ECTS",
        description: "Learning to write software that leverages multi-core processors and distributed systems for high performance.",
        objectives: "Identify race conditions, manage deadlocks, and implement parallel algorithms using OpenMP and MPI.",
        resources: "C/C++ | OpenMP Documentation | HPC Cluster Access.",
        calendar: "Week 1: Concurrency Basics | Week 2: Multi-threading | Week 3: Shared Memory (OpenMP) | Week 4: Distributed Computing.",
        grading: "30% Performance Benchmarking, 70% Final Practical Exam.",
        rules: "Code must demonstrate significant speed-up compared to sequential versions."
    },
    "Compilers": {
        info: "CMP101 | Instructor: Dr. Noam Chomsky (n.chomsky@efrei.fr) | Office: Room 412 | Credits: 6 ECTS",
        description: "Understanding the bridge between high-level code and machine instructions by building a functional compiler.",
        objectives: "Perform lexical analysis, build abstract syntax trees (AST), and generate intermediate code representation.",
        resources: "Lex & Yacc / Flex & Bison | 'The Dragon Book' (Aho et al.).",
        calendar: "Week 1: Scanning (Lexical) | Week 2: Parsing (Syntax) | Week 3: Semantic Analysis | Week 4: Code Generation.",
        grading: "80% Compiler Building Project, 20% Theoretical Quiz.",
        rules: "Project: Students must define and compile their own mini-language."
    },
    "Machine Learning": {
        info: "ML401 | Instructor: Dr. Andrew Ng (a.ng@efrei.fr) | Office: Room 502 | Credits: 6 ECTS",
        description: "A comprehensive study of algorithms that allow computers to learn from data. Focuses on statistical modeling and predictive analytics.",
        objectives: "Implement supervised and unsupervised learning, master gradient descent, and build neural networks using TensorFlow.",
        resources: "Hands-On Machine Learning (Aurélien Géron) | Scikit-Learn | TensorFlow | Google Colab.",
        calendar: "Week 1: Regression Models | Week 2: Classification & SVM | Week 3: Clustering (K-Means) | Week 4: Neural Networks Basics.",
        grading: "40% Kaggle-style Competition, 60% Final Exam.",
        rules: "Data Ethics: Models must be checked for bias and fairness. Overfitting will be penalized."
    },
    "DevOps & CI/CD": {
        info: "DEV401 | Instructor: Prof. Nicole Forsgren (n.forsgren@efrei.fr) | Office: Room 102 | Credits: 6 ECTS",
        description: "Bridge the gap between development and operations by automating the software delivery pipeline.",
        objectives: "Build CI/CD pipelines with Jenkins, manage infrastructure as code (Terraform), and master Kubernetes orchestration.",
        resources: "The Phoenix Project (Gene Kim) | Docker | Kubernetes | GitHub Actions.",
        calendar: "Week 1: CI/CD Principles | Week 2: Dockerization | Week 3: Kubernetes Clusters | Week 4: Monitoring & Prometheus.",
        grading: "70% Pipeline Project, 30% Theory Quiz.",
        rules: "Zero Downtime: Points are deducted if the production environment crashes during deployment."
    },
    "Blockchain Technology": {
        info: "BC401 | Instructor: Dr. Vitalik Buterin (v.buterin@efrei.fr) | Office: Room 415 | Credits: 4 ECTS",
        description: "Foundations of decentralized ledgers and smart contract development for Web3 applications.",
        objectives: "Understand consensus mechanisms (PoW/PoS), write smart contracts in Solidity, and deploy DApps on Ethereum.",
        resources: "Mastering Ethereum (Andreas Antonopoulos) | Remix IDE | Ganache | Hardhat.",
        calendar: "Week 1: Decentralization Theory | Week 2: Cryptography & Hashing | Week 3: Solidity Basics | Week 4: Smart Contract Auditing.",
        grading: "60% DApp Project, 40% Security Audit Report.",
        rules: "Security: Gas optimization and reentrancy attack prevention are core evaluation criteria."
    },
    "Big Data Analytics": {
        info: "BD401 | Instructor: Prof. Doug Cutting (d.cutting@efrei.fr) | Office: Room 211 | Credits: 6 ECTS",
        description: "Storage and processing of massive datasets that exceed the capacity of traditional database systems.",
        objectives: "Master MapReduce paradigms, use Apache Spark for stream processing, and design NoSQL schemas (MongoDB/Cassandra).",
        resources: "Hadoop: The Definitive Guide | Apache Spark | MongoDB Atlas.",
        calendar: "Week 1: Hadoop Ecosystem | Week 2: Apache Spark SQL | Week 3: NoSQL Architectures | Week 4: Real-time Streaming.",
        grading: "50% Data Pipeline Project, 50% Final Lab Exam.",
        rules: "Scalability: Projects must be tested on datasets larger than 10GB."
    },
    "Embedded Systems": {
        info: "EMB401 | Instructor: Dr. Sophie Wilson (s.wilson@efrei.fr) | Office: Room 004 | Credits: 6 ECTS",
        description: "Programming at the edge: interfacing software with physical hardware through microcontrollers and RTOS.",
        objectives: "Master C for embedded systems, understand interrupt handling, and program FreeRTOS on ESP32/ARM Cortex.",
        resources: "STM32 Boards | Oscilloscopes | FreeRTOS Documentation.",
        calendar: "Week 1: GPIO & Peripherals | Week 2: Interrupts & Timers | Week 3: I2C/SPI Protocols | Week 4: RTOS Scheduling.",
        grading: "60% IoT Hardware Project, 40% Debugging Exam.",
        rules: "Hardware Care: Damaging lab equipment through incorrect wiring will impact the final grade."
    },
    "Computer Graphics": {
        info: "CG401 | Instructor: Prof. John Carmack (j.carmack@efrei.fr) | Office: Room 510 | Credits: 4 ECTS",
        description: "The mathematics and algorithms behind 3D rendering, shading, and real-time visualization.",
        objectives: "Understand the graphics pipeline, master GLSL shaders, and implement 3D transformations/lighting models.",
        resources: "Real-Time Rendering (Akenine-Möller) | OpenGL | C++ | Vulkan SDK.",
        calendar: "Week 1: Linear Algebra for 3D | Week 2: Rasterization | Week 3: Lighting & Shading | Week 4: Ray Tracing Basics.",
        grading: "80% Rendering Engine Project, 20% Math Quiz.",
        rules: "Performance: Projects must maintain a minimum of 60 FPS on standard lab hardware."
    },
    "Deep Learning": {
        info: "DL501 | Instructor: Dr. Yann LeCun (y.lecun@efrei.fr) | Office: Room 503 | Credits: 6 ECTS",
        description: "Advanced study of deep neural networks. We move beyond basic ML to explore complex architectures for computer vision and natural language processing.",
        objectives: "Build and train CNNs for image recognition, implement Transformers for NLP, and master hyperparameter tuning with PyTorch.",
        resources: "Deep Learning with PyTorch (Eli Stevens) | PyTorch Framework | NVIDIA GPU Cluster access.",
        calendar: "Week 1: Convolutional Nets | Week 2: RNNs & LSTMs | Week 3: Attention & Transformers | Week 4: Generative Models (GANs).",
        grading: "50% Research Project, 50% Technical Implementation Challenge.",
        rules: "Compute Usage: Training must be optimized to avoid unnecessary GPU consumption."
    },
    "Quantum Computing": {
        info: "QC501 | Instructor: Prof. Richard Feynman (r.feynman@efrei.fr) | Office: Room 109 | Credits: 4 ECTS",
        description: "Introduction to the revolutionary paradigm of quantum information processing, using qubits and quantum logic gates.",
        objectives: "Understand superposition and entanglement, program quantum circuits on IBM Q, and analyze Shor’s and Grover’s algorithms.",
        resources: "Qiskit SDK | IBM Quantum Experience | 'Quantum Computation and Quantum Information' (Nielsen & Chuang).",
        calendar: "Week 1: Qubits & Superposition | Week 2: Quantum Gates | Week 3: Quantum Teleportation | Week 4: Search Algorithms.",
        grading: "40% Circuit Design Labs, 60% Final Theoretical Exam.",
        rules: "Mathematical Rigor: Proficiency in complex linear algebra is essential for this module."
    },
    "Advanced Cryptography": {
        info: "CRY501 | Instructor: Dr. Cynthia Dwork (c.dwork@efrei.fr) | Office: Room 411 | Credits: 6 ECTS",
        description: "Exploring the future of security in a post-quantum world. Deep dive into privacy-preserving technologies.",
        objectives: "Master Zero-Knowledge Proofs (ZKP), understand Lattice-based cryptography, and implement Homomorphic Encryption.",
        resources: "A Graduate Course in Applied Cryptography (Boneh & Shoup) | Zokrates for ZKPs.",
        calendar: "Week 1: Post-Quantum Basics | Week 2: Zero-Knowledge Proofs | Week 3: Differential Privacy | Week 4: Secure Multi-party Computation.",
        grading: "50% Crypto-Protocol Audit, 50% Advanced Implementation Lab.",
        rules: "Integrity: Students must sign a non-disclosure agreement for certain security labs."
    },
    "IT Strategy & Governance": {
        info: "MGT501 | Instructor: Prof. Michael Porter (m.porter@efrei.fr) | Office: Room 201 | Credits: 4 ECTS",
        description: "Alignment of IT resources with business goals. Focuses on management frameworks, legal compliance, and strategic decision-making.",
        objectives: "Apply COBIT and ITIL frameworks, manage IT audits, and ensure GDPR compliance in corporate environments.",
        resources: "ITIL 4 Foundation Guide | GDPR Official Documentation | Case Studies on IT Failures.",
        calendar: "Week 1: ITIL Framework | Week 2: IT Governance (COBIT) | Week 3: GDPR & Legal | Week 4: IT Strategy Roadmap.",
        grading: "60% Strategic Audit Report (Group), 40% Individual Oral Exam.",
        rules: "Professionalism: Business attire is required for the final oral presentation."
    },
    "Virtual & Augmented Reality": {
        info: "VAR501 | Instructor: Dr. Palmer Luckey (p.luckey@efrei.fr) | Office: Room 005 | Credits: 6 ECTS",
        description: "Design and development of immersive 3D environments and augmented reality overlays for industrial and entertainment use.",
        objectives: "Master Unity 3D for VR, implement ARCore/ARKit for mobile AR, and optimize 3D assets for real-time performance.",
        resources: "Unity 3D | Meta Quest 3 Headsets | C# Programming.",
        calendar: "Week 1: VR Interaction Design | Week 2: 3D Physics in Unity | Week 3: AR Tracking | Week 4: Spatial Audio & Optimization.",
        grading: "100% Immersive Prototype Project.",
        rules: "Safety: Mandatory breaks every 20 minutes of headset use during lab sessions."
    },
    "Master Thesis": {
        info: "THS501 | Instructor: Department Board | Office: Research Lab | Credits: 18 ECTS",
        description: "A major individual research or industrial project representing the culmination of the Computer Science program.",
        objectives: "Identify an innovative problem, conduct a literature review, develop a technical solution, and defend the results.",
        resources: "Efrei Research Lab | Academic Journals (IEEE, ACM) | Industry Mentors.",
        calendar: "Month 1: Proposal | Month 2-4: Development | Month 5: Writing | Month 6: Defense.",
        grading: "20% Intermediate Review, 40% Written Dissertation, 40% Final Oral Defense.",
        rules: "Plagiarism: The thesis will be passed through 'Compilatio' software. 0 tolerance."
    }
};

function openCourseModal(title, sem, year, desc) {
    const modal = document.getElementById('courseModal');
    const modalTitle = document.getElementById('modalCourseTitle');
    const tableContainer = document.getElementById('syllabusTableContainer');

    const data = courseData[title];

    if (modal && data) {
        modalTitle.textContent = title;

        tableContainer.innerHTML = `
            <table class="syllabus-table">
                <tr>
                    <td class="syll-cat">1. General Info</td>
                    <td><strong>${year} - ${sem}</strong><br>${data.info}</td>
                </tr>
                <tr>
                    <td class="syll-cat">2. Description</td>
                    <td>${data.description}<br><strong>Objectives:</strong> ${data.objectives}</td>
                </tr>
                <tr>
                    <td class="syll-cat">3. Resources</td>
                    <td>${data.resources}</td>
                </tr>
                <tr>
                    <td class="syll-cat">4. Calendar</td>
                    <td>${data.calendar}</td>
                </tr>
                <tr>
                    <td class="syll-cat">5. Grading</td>
                    <td>${data.grading}</td>
                </tr>
                <tr>
                    <td class="syll-cat">6. Policies</td>
                    <td>${data.rules}</td>
                </tr>
            </table>
        `;

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
}