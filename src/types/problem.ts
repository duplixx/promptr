export interface TestCase {
    input: string
    expectedOutput: string
    description: string
  }
  
  export interface Problem {
    id: number
    title: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    description: string
    examples: {
      input: string
      output: string
      explanation: string
    }[]
    testCases: TestCase[]
  }
  
  export interface ProblemsListItem {
    id: number
    title: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    solved?: boolean
  }
  
  