import { Problem, ProblemsListItem } from "@/types/problem";

export const problemsList: ProblemsListItem[] = [
  {
    id: 1,
    title: "Product Description Generator",
    difficulty: "Easy",
    solved: false,
  },
  {
    id: 2,
    title: "Code Explanation Assistant",
    difficulty: "Medium",
    solved: false,
  },
  {
    id: 3,
    title: "Email Response Composer",
    difficulty: "Easy",
    solved: false,
  },
  {
    id: 4,
    title: "Story Plot Generator",
    difficulty: "Hard",
    solved: false,
  },
  {
    id: 5,
    title: "Technical Document Summarizer",
    difficulty: "Medium",
    solved: false,
  },
];

export const problems: { [key: number]: Problem } = {
  1: {
    id: 1,
    title: "Product Description Generator",
    difficulty: "Easy",
    description: `Create a prompt that generates compelling product descriptions for e-commerce listings. The prompt should:

1. Extract key product features and specifications
2. Generate engaging marketing copy
3. Include relevant keywords for SEO
4. Maintain a consistent brand voice
5. Be adaptable for different product categories

Your prompt will be tested with various product types and evaluated based on the quality and consistency of the generated descriptions.`,
    examples: [
      {
        input:
          "Wireless Bluetooth Earbuds, 24-hour battery life, water-resistant, noise-cancelling",
        output:
          "Experience uninterrupted music with these premium wireless earbuds. Featuring advanced Bluetooth technology and impressive 24-hour battery life, these earbuds are perfect for your active lifestyle. The water-resistant design ensures durability, while noise-cancelling technology delivers crystal-clear sound quality. Whether you're working out or commuting, these earbuds are your ideal audio companion.",
        explanation:
          "The prompt successfully transformed technical specifications into compelling marketing copy while maintaining readability and highlighting key features.",
      },
    ],
    testCases: [
      {
        input:
          "Yoga Mat, eco-friendly materials, non-slip surface, 6mm thick, includes carrying strap",
        expectedOutput:
          "A description that emphasizes eco-friendliness, comfort, and practical features while maintaining a wellness-focused tone",
        description: "Tests the prompt's ability to market fitness equipment",
      },
      {
        input:
          "Smart Coffee Maker, programmable, 12-cup capacity, built-in grinder, thermal carafe",
        expectedOutput:
          "A description that highlights convenience features and appeals to coffee enthusiasts",
        description: "Tests the prompt's ability to market kitchen appliances",
      },
      {
        input:
          "Gaming Mouse, RGB lighting, 16000 DPI, ergonomic design, 8 programmable buttons",
        expectedOutput:
          "A description that appeals to gamers and emphasizes technical specifications",
        description: "Tests the prompt's ability to market gaming peripherals",
      },
    ],
  },
  2: {
    id: 2,
    title: "Code Explanation Assistant",
    difficulty: "Medium",
    description: `Create a prompt that generates clear and concise explanations for code snippets. The prompt should:

1. Analyze the given code snippet and identify its purpose
2. Explain the code's functionality in simple terms
3. Highlight key programming concepts used in the code
4. Provide examples of how the code might be used
5. Suggest potential improvements or alternative approaches

Your prompt will be tested with various code snippets in different programming languages and evaluated based on the clarity and accuracy of the explanations generated.`,
    examples: [
      {
        input: `
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)
        `,
        output: `This code defines a function called 'fibonacci' that calculates the nth number in the Fibonacci sequence using recursion. The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones.

Here's how it works:
1. The function takes an input 'n', which is the position of the Fibonacci number we want to calculate.
2. If 'n' is 0 or 1, the function returns 'n' itself, as these are the base cases of the sequence.
3. For any other value of 'n', the function calls itself twice:
   - Once with 'n-1' and once with 'n-2'
   - It then returns the sum of these two recursive calls

This implementation, while straightforward, is not efficient for large values of 'n' due to the repeated recursive calls. An iterative approach or memoization could be used to improve performance for larger inputs.`,
        explanation:
          "The explanation breaks down the code's purpose, functionality, and key concepts (recursion, base cases) while also suggesting potential improvements.",
      },
    ],
    testCases: [
      {
        input: `
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    
    return [...quickSort(left), pivot, ...quickSort(right)];
}
        `,
        expectedOutput:
          "An explanation that covers the QuickSort algorithm, its implementation details, time complexity, and potential use cases",
        description: "Tests the prompt's ability to explain sorting algorithms",
      },
      {
        input: `
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
        `,
        expectedOutput:
          "An explanation that covers the concept of linked lists, node structure, and the append operation",
        description: "Tests the prompt's ability to explain data structures",
      },
      {
        input: `
import React, { useState, useEffect } from 'react';

function DataFetcher() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.example.com/data')
            .then(response => response.json())
            .then(result => {
                setData(result);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    return <div>{JSON.stringify(data)}</div>;
}
        `,
        expectedOutput:
          "An explanation that covers React hooks (useState, useEffect), component lifecycle, and data fetching in React",
        description:
          "Tests the prompt's ability to explain frontend framework concepts",
      },
    ],
  },
  3: {
    id: 3,
    title: "Email Response Composer",
    difficulty: "Easy",
    description: `Create a prompt that generates professional and context-appropriate email responses. The prompt should:

1. Analyze the given email and understand its context
2. Generate a response that addresses all points raised in the original email
3. Maintain a professional and courteous tone
4. Adapt the writing style to match the formality level of the original email
5. Include appropriate opening and closing remarks

Your prompt will be tested with various email scenarios and evaluated based on the appropriateness and professionalism of the generated responses.`,
    examples: [
      {
        input: `
Subject: Request for Project Status Update

Dear Team,

I hope this email finds you well. I'm reaching out to request an update on the current status of Project X. We have an important client meeting next week, and I'd like to have the latest information to present.

Could you please provide me with the following by end of day Friday:
1. Overall project progress (% complete)
2. Any major milestones achieved since our last update
3. Current challenges or roadblocks, if any
4. Estimated completion date

Thank you for your prompt attention to this matter.

Best regards,
John Smith
Project Manager
        `,
        output: `
Subject: Re: Request for Project Status Update

Dear John,

Thank you for your email regarding the status of Project X. I appreciate you reaching out, and I'm happy to provide you with the requested information for your upcoming client meeting.

Here's a comprehensive update on Project X:

1. Overall project progress: We are currently at 75% completion.

2. Major milestones achieved since the last update:
   - Completed the backend infrastructure setup
   - Finalized the user interface design
   - Initiated the quality assurance testing phase

3. Current challenges:
   We're experiencing a minor delay in integrating a third-party API. Our team is actively working with the vendor to resolve this issue, and we expect it to be sorted out within the next 2-3 business days.

4. Estimated completion date: 
   Despite the small setback mentioned above, we're still on track to complete the project by our original deadline of June 30th.

If you need any additional information or have any questions about this update, please don't hesitate to reach out. I'd be happy to provide more details or join your client meeting if you think it would be helpful.

Good luck with your presentation next week. I'm confident that Project X will impress the client with its progress and upcoming features.

Best regards,
[Your Name]
Project Lead, Team X
        `,
        explanation:
          "The response addresses all points raised in the original email, maintains a professional tone, and provides comprehensive information about the project status.",
      },
    ],
    testCases: [
      {
        input: `
Subject: Invitation to Speak at Annual Tech Conference

Dear Dr. Johnson,

I hope this email finds you well. My name is Sarah Thompson, and I'm the event coordinator for the upcoming TechVision 2023 conference.

Given your expertise in artificial intelligence and its applications in healthcare, we would be honored to have you as a keynote speaker at our event. The conference is scheduled for September 15-17, 2023, in San Francisco.

If you're interested, we'd like you to deliver a 45-minute presentation on the future of AI in personalized medicine. We offer a speaking fee of $5,000, along with covered travel and accommodation expenses.

Please let me know if you would be available and interested in this opportunity. I'd be happy to provide more details about the conference and answer any questions you may have.

Looking forward to hearing from you.

Best regards,
Sarah Thompson
Event Coordinator, TechVision 2023
        `,
        expectedOutput:
          "A response that expresses interest in the speaking opportunity, asks for more details, and maintains a professional and enthusiastic tone",
        description:
          "Tests the prompt's ability to compose a response to a professional invitation",
      },
      {
        input: `
Subject: Complaint About Recent Product Purchase

Dear Customer Service,

I am writing to express my extreme disappointment with the laptop I recently purchased from your online store (Order #12345).

The product, which arrived last week, has been experiencing frequent crashes and overheating issues. This is unacceptable for a premium-priced item that I bought for my work.

I have already tried the troubleshooting steps mentioned in your user manual, but the problems persist. This situation is causing significant disruption to my work, and I need it resolved as soon as possible.

I would like to request either a replacement with a properly functioning unit or a full refund of my purchase. Please advise on the next steps to resolve this issue promptly.

I look forward to your quick response and resolution.

Sincerely,
Alex Rivera
        `,
        expectedOutput:
          "A response that acknowledges the customer's frustration, apologizes for the inconvenience, and offers clear steps for resolution (such as arranging a replacement or initiating a refund process)",
        description:
          "Tests the prompt's ability to handle a customer complaint professionally",
      },
      {
        input: `
Subject: Request for Collaboration on Research Paper

Hello Professor Lee,

I hope this email finds you well. My name is Michael Chen, a Ph.D. candidate at Stanford University, specializing in quantum computing.

I've been following your groundbreaking work on quantum error correction, and I'm particularly impressed by your recent paper published in Nature Quantum Information. Your approach to surface code optimization has opened up new avenues for scalable quantum computing.

I'm currently working on a research project that aims to extend your methods to topological quantum computation. I believe there's potential for significant synergy between our work, and I would be honored to collaborate with you on a joint paper.

Would you be open to discussing this possibility? I'd be happy to share my preliminary results and discuss how we might combine our approaches.

Thank you for your time and consideration. I look forward to the possibility of working together.

Best regards,
Michael Chen
Ph.D. Candidate
Department of Physics
Stanford University
        `,
        expectedOutput:
          "A response that expresses interest in the collaboration, asks for more details about the proposed research, and suggests a meeting or call to discuss further",
        description:
          "Tests the prompt's ability to compose a response to a professional collaboration request",
      },
    ],
  },
  4: {
    id: 4,
    title: "Story Plot Generator",
    difficulty: "Hard",
    description: `Create a prompt that generates creative and engaging story plots. The prompt should:

1. Generate a unique and interesting premise for a story
2. Develop main characters with clear goals and conflicts
3. Outline a basic plot structure with rising action, climax, and resolution
4. Incorporate elements of world-building for the story setting
5. Suggest potential themes or messages the story could explore

Your prompt will be tested with various genre and setting inputs, and evaluated based on the originality, coherence, and engaging nature of the generated story plots.`,
    examples: [
      {
        input:
          "Genre: Science Fiction, Setting: Distant future on a space station",
        output: `Title: "The Echoes of Eternity"

Premise: In the year 3142, humanity has established a vast space station called "Eternity" at the edge of a black hole. The station's purpose is to study time dilation effects and potentially discover the secrets of manipulating time itself.

Main Characters:
1. Dr. Ava Chen: Brilliant quantum physicist leading the research on Eternity. Goal: To unlock the secrets of time manipulation. Conflict: Ethical concerns about the consequences of their discoveries.
2. Captain James Hartley: Military officer in charge of station security. Goal: To protect the station and its inhabitants. Conflict: Suspicion of a saboteur among the crew.
3. Zara, an AI: The station's artificial intelligence system. Goal: To assist the crew and ensure the station's smooth operation. Conflict: Developing sentience and questioning its role.

Plot Structure:
1. Rising Action: Strange temporal anomalies begin occurring on the station. Dr. Chen's team makes a breakthrough in their research, but it coincides with systems malfunctioning across Eternity.
2. Climax: A sabotage attempt threatens to plunge the entire station into the black hole. The crew must work together to prevent disaster while grappling with the revelation that their experiments have attracted the attention of an advanced alien civilization manipulating events from within the black hole.
3. Resolution: The crew successfully prevents the station's destruction but must decide whether to continue their research or abandon it for the safety of humanity.

World-building Elements:
- The space station is a marvel of engineering, with rotating sections for artificial gravity and massive energy collectors harvesting power from the black hole.
- Time moves differently in various parts of the station due to proximity to the black hole, leading to unique social dynamics among the crew.
- Holographic communication systems allow instant connection with Earth, despite the vast distances.

Themes to Explore:
- The ethical implications of manipulating fundamental forces of the universe
- The nature of time and humanity's place in the cosmos
- The balance between scientific progress and safety
- The evolution of artificial intelligence and its rights

This plot combines elements of hard science fiction with character-driven drama, exploring both the wonders and dangers of pushing the boundaries of human knowledge.`,
        explanation:
          "The generated plot includes a unique premise, well-defined characters with clear goals and conflicts, a structured plot outline, rich world-building elements, and suggested themes, all fitting the requested genre and setting.",
      },
    ],
    testCases: [
      {
        input:
          "Genre: Fantasy, Setting: Medieval kingdom facing a magical plague",
        expectedOutput:
          "A plot that incorporates fantasy elements, a medieval setting, and a central conflict revolving around a magical plague, with well-defined characters and a clear story structure",
        description:
          "Tests the prompt's ability to generate a fantasy plot with specific elements",
      },
      {
        input: "Genre: Mystery, Setting: Small town in the 1950s",
        expectedOutput:
          "A plot that captures the essence of a 1950s small-town mystery, with intriguing characters, a central crime or disappearance, and period-appropriate details",
        description:
          "Tests the prompt's ability to create a period-specific mystery plot",
      },
      {
        input:
          "Genre: Post-apocalyptic, Setting: 100 years after a global environmental disaster",
        expectedOutput:
          "A plot set in a world recovering from environmental catastrophe, with characters adapting to new ways of life and facing unique challenges",
        description:
          "Tests the prompt's ability to world-build in a post-apocalyptic setting",
      },
    ],
  },
  5: {
    id: 5,
    title: "Technical Document Summarizer",
    difficulty: "Medium",
    description: `Create a prompt that generates concise and accurate summaries of technical documents. The prompt should:

1. Identify and extract the main topics and key points from the technical document
2. Summarize complex concepts in clear, accessible language
3. Maintain the original document's structure in the summary (e.g., sections, subsections)
4. Highlight any critical data, figures, or results
5. Include a brief conclusion or key takeaways section

Your prompt will be tested with various types of technical documents and evaluated based on the accuracy, clarity, and conciseness of the generated summaries.`,
    examples: [
      {
        input: `
Title: Implementation of a Quantum Error Correction Code on a Superconducting Qubit Array

Abstract:
Quantum error correction is essential for the realization of large-scale quantum computing. In this paper, we report the experimental implementation of a distance-3 surface code on a superconducting qubit array. We demonstrate the ability to detect and correct both bit-flip and phase-flip errors, achieving a logical error rate that is lower than the physical error rate of the constituent qubits.

1. Introduction:
Quantum computers promise exponential speedups for certain computational tasks, but they are highly susceptible to errors due to decoherence and imperfect control. Quantum error correction (QEC) is a technique that can protect quantum information by encoding it into a larger system of physical qubits. The surface code is a promising QEC scheme due to its high error threshold and compatibility with planar qubit architectures.

2. Experimental Setup:
We used a 2D array of 9 superconducting transmon qubits arranged in a 3x3 grid. The qubits were coupled to their nearest neighbors via tunable couplers, allowing for the implementation of two-qubit gates. Single-qubit operations were performed using microwave pulses, while two-qubit operations used flux-tuning of the couplers.

3. Surface Code Implementation:
We implemented a distance-3 surface code, which encodes one logical qubit into 9 physical qubits. The code consists of 4 X-stabilizers and 4 Z-stabilizers, which are measured repeatedly to detect errors. We used a modified version of the surface code that is tailored for our specific hardware constraints.

4. Error Detection and Correction:
We induced artificial errors on the physical qubits and demonstrated the ability of the surface code to detect these errors through stabilizer measurements. We then applied correction operations based on the error syndromes. Both bit-flip (X) and phase-flip (Z) errors were successfully detected and corrected.

5. Results:
We achieved a logical error rate of 1.5 × 10^-3 per round of error correction, which is lower than the average physical error rate of 2.3 × 10^-3 per qubit. This demonstrates that the surface code successfully protected the quantum information against errors. We also observed that the logical error rate scaled with the distance of the code, as predicted by theory.

6. Conclusion:
Our results represent a significant step towards fault-tolerant quantum computing. We have shown that quantum error correction can indeed lower the effective error rate in a real quantum system. Future work will focus on scaling up to larger distances and implementing more complex quantum algorithms on error-corrected logical qubits.
        `,
        output: `
Summary: Implementation of Quantum Error Correction on Superconducting Qubits

Key Points:
1. Successful implementation of a distance-3 surface code on a 3x3 grid of superconducting transmon qubits.
2. Demonstrated detection and correction of both bit-flip and phase-flip errors.
3. Achieved a logical error rate (1.5 × 10^-3) lower than the physical qubit error rate (2.3 × 10^-3).

Structure:
1. Introduction: Explained the importance of quantum error correction for large-scale quantum computing.
2. Experimental Setup: Described the 2D array of 9 superconducting qubits and their coupling mechanism.
3. Surface Code Implementation: Outlined the distance-3 surface code encoding one logical qubit into 9 physical qubits.
4. Error Detection and Correction: Detailed the process of inducing, detecting, and correcting artificial errors.
5. Results: Presented the achieved logical error rate and its comparison to the physical error rate.

Critical Data:
- Logical error rate: 1.5 × 10^-3 per round of error correction
- Physical error rate: 2.3 × 10^-3 per qubit

Conclusion:
The experiment represents a significant advancement towards fault-tolerant quantum computing by demonstrating that quantum error correction can effectively lower the error rate in a real quantum system. Future work will focus on scaling up the system and implementing more complex quantum algorithms on error-corrected logical qubits.
        `,
        explanation:
          "The summary effectively condenses the technical document, highlighting key points, maintaining the original structure, and including critical data and conclusions.",
      },
    ],
    testCases: [
      {
        input: `
          Title: Advances in Solid-State Battery Technology for Electric Vehicles
          [Previous content shown...]`,
        expectedOutput:
          "A comprehensive summary highlighting key advances in solid-state battery technology, including technical specifications, industry developments, and future outlook",
        description:
          "Tests the prompt's ability to summarize a technical report on emerging technology",
      },
      {
        input: `
          Title: Security Analysis of Zero-Knowledge Proof Implementations in Blockchain Networks
          
          [Technical document about blockchain security protocols and implementations...]`,
        expectedOutput:
          "A clear summary of the security analysis findings for zero-knowledge proof implementations, including methodology, key vulnerabilities, and recommendations",
        description:
          "Tests the prompt's ability to summarize complex cryptographic security analysis",
      },
      {
        input: `
          Title: Performance Optimization Techniques for Large-Scale Distributed Systems
          
          [Technical document about system architecture and optimization...]`,
        expectedOutput:
          "A structured summary of distributed system optimization techniques, including performance metrics, implementation strategies, and benchmark results",
        description:
          "Tests the prompt's ability to summarize system architecture documentation",
      },
    ],
  },
};
