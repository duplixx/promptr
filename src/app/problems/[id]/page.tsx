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

import { ProblemDescription } from "@/components/problem-description";
import { ProblemSidebar } from "@/components/problem-sidebar";
import { PromptEditor } from "@/components/prompt-editor";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!problem) {
    notFound();
  }

  return (
    <div className="h-screen w-full bg-gray-900 flex justify-between fixed inset-0">
        <div>
        <ProblemSidebar
          problems={problemsList}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        </div>
        <div className="p-5">
        <ResizablePanelGroup
          direction="horizontal"
          className="flex"
        >
          <ResizablePanel defaultSize={50} className="overflow-auto">
            <ProblemDescription problem={problem} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50} className="overflow-auto">
            <PromptEditor testCases={problem.testCases} />
          </ResizablePanel>
        </ResizablePanelGroup>
        </div>
    </div>
  );
}
