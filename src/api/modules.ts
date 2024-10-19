const modules = {
    beginner: [
      { id: 1, title: "Introduction to Prompt Engineering", lab: null },
      { id: 2, title: "Simple Completion Prompts", lab: "Write a Simple Prompt" },
      { id: 3, title: "Providing Context", lab: "Context-Based Prompts" },
      { id: 4, title: "Crafting Directives", lab: "Task-Oriented Prompts" },
      { id: 5, title: "Prompt Debugging", lab: null },
    ],  
    intermediate: [
      { id: 6, title: "Chain of Thought Prompting", lab: "Step-by-Step Problem Solving" },
      { id: 7, title: "Multi-turn Conversations", lab: "Conversational AI Design" },
      { id: 8, title: "Role-playing Prompts", lab: "Character-Based Interactions" },
      { id: 9, title: "API Integration", lab: "OpenAI API Usage" },
      { id: 10, title: "Prompt Optimization", lab: null },
    ],
    advanced: [
      { id: 11, title: "Few-shot Learning", lab: "Example-Based Prompting" },
      { id: 12, title: "Zero-shot Learning", lab: "Context-Free Task Prompts" },
      { id: 13, title: "Conditional Generation", lab: "Input-Dependent Prompts" },
      { id: 14, title: "Model Fine-tuning", lab: "Custom Dataset Training" },
      { id: 15, title: "Complex Prompt Chaining", lab: "Multi-Step Problem Solving" },
    ],
  }
function getModuleByTitle(title: string) {
    for (const level in modules) {
        const module = (modules as { [key: string]: { id: number; title: string; lab: string | null; }[] })[level]?.find(mod => mod.title === title);
        if (module) {
            return module;
        }
    }
    return null; 
}
