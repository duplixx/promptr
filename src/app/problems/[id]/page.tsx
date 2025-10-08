// "use client";

// import { ProblemDescription } from "@/components/problem-description";
// import { ProblemSidebar } from "@/components/problem-sidebar";
// import { PromptEditor } from "@/components/prompt-editor";
// import { problems, problemsList } from "@/data/problems";
// import { notFound } from "next/navigation";
// import Split from "react-split";
// import { useState } from "react";

// export default function ProblemPage({
//   params,
// }: {
//   params: { id: keyof typeof problems };
// }) {
//   const problem = problems[params.id];
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   if (!problem) {
//     notFound();
//   }

//   return (
//     <div className="fixed inset-0 flex h-screen w-screen overflow-hidden bg-gray-900">
//       <ProblemSidebar
//         problems={problemsList}
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//       />
// <Split
//   direction="horizontal"
//   sizes={[50, 50]}
//   minSize={200}
//   gutterSize={6}
//   className="flex"
// >
//   <div className="h-full w-full">  {/* Remove overflow-auto from here */}
//     <ProblemDescription problem={problem} />
//   </div>
//   <div className="h-full w-full">
//     <PromptEditor testCases={problem.testCases} />
//   </div>
// </Split>

//     </div>
//   );
// }

"use client";

import { ModernProblemDescription } from "@/components/ModernProblemDescription";
import { ModernProblemSidebar } from "@/components/ModernProblemSidebar";
import { ModernPromptEditor } from "@/components/ModernPromptEditor";
import { problems, problemsList } from "@/data/problems";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { notFound } from "next/navigation";
import { useState } from "react";

export default function ProblemPage({
  params,
}: {
  params: { id: keyof typeof problems };
}) {
  const problem = problems[params.id];
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!problem) {
    notFound();
  }

  return (
    <div className="fixed inset-0 flex h-screen w-full overflow-hidden bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900">
      {/* Sidebar */}
      <ModernProblemSidebar
        problems={problemsList}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex">
          {/* Problem Description Panel */}
          <ResizablePanel defaultSize={50} minSize={30} className="overflow-hidden">
            <ModernProblemDescription problem={problem} />
          </ResizablePanel>

          {/* Resizable Handle */}
          <ResizableHandle className="w-1 bg-gray-700/50 transition-colors hover:bg-indigo-500/50" />

          {/* Prompt Editor Panel */}
          <ResizablePanel defaultSize={50} minSize={30} className="overflow-hidden">
            <ModernPromptEditor
              testCases={problem.testCases}
              problemContext={problem.description}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
