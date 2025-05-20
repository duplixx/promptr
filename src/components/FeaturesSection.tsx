"use client";

import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconBolt, IconCode, IconBulb, IconStar } from "@tabler/icons-react";
import { motion } from "framer-motion";

// Real-time Feedback Component
const RealTimeFeedbackVisual = () => (
  <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
    <div className="from-second/10 absolute inset-0 bg-gradient-to-br to-transparent opacity-30"></div>

    {/* Prompt editor */}
    <div className="border-second/30 shadow-second/10 h-[80%] w-[90%] overflow-hidden rounded-lg border bg-black/80 shadow-lg">
      <div className="border-second/20 flex h-6 items-center border-b bg-black/90 px-2">
        <div className="mr-1 h-2 w-2 rounded-full bg-red-500"></div>
        <div className="mr-1 h-2 w-2 rounded-full bg-yellow-500"></div>
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <div className="ml-2 text-xs text-white">prompt-analysis.ai</div>
      </div>
      <div className="flex h-[calc(100%-1.5rem)] flex-col p-4 text-left font-mono text-xs">
        <div className="mb-3">
          <div className="mb-1 text-white">// Your prompt:</div>
          <div className="border-second/20 rounded border bg-black/60 p-3 text-white">
            Create a detailed image of a futuristic city with flying cars,
            holographic advertisements, and tall skyscrapers. The city should
            have a cyberpunk aesthetic with neon lights and a dark atmosphere.
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="mb-1 text-white">// Real-time analysis:</div>
          <div className="space-y-3">
            <div className="border-second/20 rounded border bg-black/60 p-3">
              <div className="mb-2 flex items-center">
                <div className="bg-second mr-2 h-3 w-3 rounded-full"></div>
                <span className="text-second font-medium">Clarity</span>
                <div className="text-second ml-auto">92%</div>
              </div>
              <div className="text-xs text-white">
                Your prompt clearly specifies the subject (futuristic city) and
                key elements (flying cars, holographic ads, skyscrapers).
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border-second/20 rounded border bg-black/60 p-3"
            >
              <div className="mb-2 flex items-center">
                <div className="bg-second mr-2 h-3 w-3 rounded-full"></div>
                <span className="text-second font-medium">Specificity</span>
                <div className="text-second ml-auto">85%</div>
              </div>
              <div className="text-xs text-white">
                Good details about aesthetic (cyberpunk) and atmosphere (dark
                with neon lights).
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded border border-yellow-400/30 bg-black/60 p-3"
            >
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-yellow-400"></div>
                <span className="font-medium text-yellow-400">
                  Improvement Suggestion
                </span>
              </div>
              <div className="text-xs text-white">
                Consider adding details about time of day, weather conditions,
                and specific architectural styles to enhance the image
                generation.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Interactive Exercises Component
const InteractiveExercisesVisual = () => (
  <div className="relative flex h-[80%] w-full items-center justify-center">
    <div className="from-second/10 absolute inset-0 bg-gradient-to-br to-transparent opacity-30"></div>

    <div className="border-second/30 shadow-second/10 h-[80%] w-[90%] overflow-hidden rounded-lg border bg-black/80 shadow-lg">
      <div className="border-second/20 flex h-6 items-center border-b bg-black/90 px-2">
        <div className="mr-1 h-2 w-2 rounded-full bg-red-500"></div>
        <div className="mr-1 h-2 w-2 rounded-full bg-yellow-500"></div>
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <div className="ml-2 text-xs text-white">exercise-04.md</div>
      </div>

      <div className="flex h-[calc(100%-1.5rem)] flex-col p-4">
        <div className="border-second/20 mb-4 rounded border bg-black/60 p-3">
          <h3 className="text-second mb-2 text-sm font-medium">
            Exercise: Improve the Classification Prompt
          </h3>
          <p className="mb-3 text-xs text-white">
            The following prompt needs improvement. It should classify text into
            categories but lacks precision and clarity.
          </p>
          <div className="mb-3 rounded border border-white/10 bg-black/80 p-2 font-mono text-xs text-gray-300">
            Classify this text for me into categories.
          </div>
          <p className="text-xs text-white">
            Rewrite the prompt to be more specific about:
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-white">
            <li>What categories to use</li>
            <li>The format of the output</li>
            <li>How to handle edge cases</li>
          </ul>
        </div>

        <div className="border-second/20 flex-1 rounded border bg-black/60 p-3">
          <div className="mb-2 text-xs text-white">// Your solution:</div>
          <div className="h-[calc(100%-1.5rem)] rounded border border-white/10 bg-black/80 p-2 font-mono text-xs text-white">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1,
                repeatDelay: 1,
              }}
              className="border-second inline border-r pr-1"
            >
              Classify the following text into one of these categories:
              Technology, Business, Health, Entertainment, or Politics. If the
              text doesn't clearly fit any category, classify it as "Other". For
              each classification, provide: 1. The primary category 2.
              Confidence level (High/Medium/Low) 3. Keywords that influenced
              your decision Format your response as: Category: [category name]
              Confidence: [level] Keywords: [comma-separated list]
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// AI-Powered Suggestions Component
const AISuggestionsVisual = () => (
  <div className="relative flex h-[80%] w-full items-center justify-center">
    <div className="from-second/10 absolute inset-0 bg-gradient-to-br to-transparent opacity-30"></div>

    <div className="border-second/30 shadow-second/10 h-[80%] w-[90%] overflow-hidden rounded-lg border bg-black/80 shadow-lg">
      <div className="border-second/20 flex h-6 items-center border-b bg-black/90 px-2">
        <div className="mr-1 h-2 w-2 rounded-full bg-red-500"></div>
        <div className="mr-1 h-2 w-2 rounded-full bg-yellow-500"></div>
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <div className="ml-2 text-xs text-white">prompt-optimizer.ai</div>
      </div>

      <div className="flex h-[calc(100%-1.5rem)] flex-col p-4">
        <div className="mb-3">
          <div className="mb-1 text-xs text-white">// Original prompt:</div>
          <div className="rounded border border-white/10 bg-black/60 p-2 font-mono text-xs text-white">
            Write me a blog post about climate change.
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="mb-1 text-xs text-white">
            // AI-powered suggestions:
          </div>
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border-second/20 rounded border bg-black/60 p-3"
            >
              <div className="mb-2 flex items-center">
                <div className="bg-second mr-2 h-3 w-3 rounded-full"></div>
                <span className="text-second font-medium">Add specificity</span>
              </div>
              <div className="mb-2 text-xs text-white">
                Your prompt is too general. Specify the angle, tone, length, and
                audience.
              </div>
              <div className="rounded border border-white/10 bg-black/40 p-2 font-mono text-xs text-green-300">
                Write a 1000-word blog post about the economic impacts of
                climate change on coastal communities. Use a professional tone
                with data-backed arguments. Target audience is educated adults
                with basic knowledge of climate issues.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="border-second/20 rounded border bg-black/60 p-3"
            >
              <div className="mb-2 flex items-center">
                <div className="bg-second mr-2 h-3 w-3 rounded-full"></div>
                <span className="text-second font-medium">
                  Structure guidance
                </span>
              </div>
              <div className="mb-2 text-xs text-white">
                Provide structure for better organization of the content.
              </div>
              <div className="rounded border border-white/10 bg-black/40 p-2 font-mono text-xs text-green-300">
                Write a blog post about climate change with the following
                sections: 1. Introduction with key statistics 2. Three main
                environmental impacts 3. Economic consequences 4. Potential
                solutions 5. Call to action conclusion
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="border-second/20 rounded border bg-black/60 p-3"
            >
              <div className="mb-2 flex items-center">
                <div className="bg-second mr-2 h-3 w-3 rounded-full"></div>
                <span className="text-second font-medium">
                  Output formatting
                </span>
              </div>
              <div className="mb-2 text-xs text-white">
                Specify how you want the output formatted.
              </div>
              <div className="rounded border border-white/10 bg-black/40 p-2 font-mono text-xs text-green-300">
                Write a blog post about climate change. Format with HTML tags,
                include 3 subheadings, bold important points, and add a meta
                description for SEO.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Progress Tracking Component
const ProgressTrackingVisual = () => (
  <div className="relative flex h-[80%] w-full items-center justify-center">
    <div className="from-second/10 absolute inset-0 bg-gradient-to-br to-transparent opacity-30"></div>

    <div className="flex h-[80%] w-[90%] gap-4">
      {/* Stats panel */}
      <div className="border-second/30 shadow-second/10 h-full w-[40%] overflow-hidden rounded-lg border bg-black/80 p-4 shadow-lg">
        <h3 className="text-second mb-4 text-sm font-bold">Your Progress</h3>

        <div className="space-y-4">
          {/* Completion rate */}
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-medium text-white">Course Completion</span>
              <span className="text-second font-medium">72%</span>
            </div>
            <div className="border-second/10 h-2.5 overflow-hidden rounded-full border bg-black/60">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "72%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="from-second/70 to-second h-full rounded-full bg-gradient-to-r"
              ></motion.div>
            </div>
          </div>

          {/* Exercises Completed */}
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-medium text-white">
                Exercises Completed
              </span>
              <span className="text-second font-medium">18/25</span>
            </div>
            <div className="border-second/10 h-2.5 overflow-hidden rounded-full border bg-black/60">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "72%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="from-second/70 to-second h-full rounded-full bg-gradient-to-r"
              ></motion.div>
            </div>
          </div>

          {/* Prompt Quality Score */}
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-medium text-white">
                Prompt Quality Score
              </span>
              <span className="text-second font-medium">85/100</span>
            </div>
            <div className="border-second/10 h-2.5 overflow-hidden rounded-full border bg-black/60">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="from-second/70 to-second h-full rounded-full bg-gradient-to-r"
              ></motion.div>
            </div>
          </div>

          {/* Skill breakdown */}
          <div className="border-second/10 mt-2 border-t pt-3">
            <div className="mb-3 flex justify-between text-xs">
              <span className="font-medium text-white">Skill Breakdown</span>
              <span className="text-second font-bold">Advanced</span>
            </div>
            <div className="flex justify-between">
              <div className="text-center">
                <div className="bg-second/10 border-second/30 shadow-second/5 mx-auto mb-1 flex h-12 w-12 items-center justify-center rounded-lg border shadow-inner">
                  <span className="text-second font-bold">92%</span>
                </div>
                <div className="mt-1 text-xs text-white">Clarity</div>
              </div>
              <div className="text-center">
                <div className="bg-second/20 border-second/40 shadow-second/5 mx-auto mb-1 flex h-12 w-12 items-center justify-center rounded-lg border shadow-inner">
                  <span className="text-second font-bold">78%</span>
                </div>
                <div className="mt-1 text-xs text-white">Specificity</div>
              </div>
              <div className="text-center">
                <div className="bg-second/30 border-second/50 shadow-second/5 mx-auto mb-1 flex h-12 w-12 items-center justify-center rounded-lg border shadow-inner">
                  <span className="text-second font-bold">85%</span>
                </div>
                <div className="mt-1 text-xs text-white">Structure</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent activities */}
      <div className="border-second/30 shadow-second/10 h-full w-[60%] overflow-hidden rounded-lg border bg-black/80 p-4 shadow-lg">
        <h3 className="text-second mb-4 text-sm font-bold">
          Recent Activities
        </h3>

        <div className="space-y-2">
          {/* Activities list */}
          {[
            {
              type: "Exercise",
              name: "Image Generation Prompts",
              score: "92/100",
              time: "2 hours ago",
            },
            {
              type: "Challenge",
              name: "Weekly Prompt Battle",
              score: "1st Place",
              time: "Yesterday",
            },
            {
              type: "Lesson",
              name: "Advanced Chain-of-Thought",
              score: "Completed",
              time: "2 days ago",
            },
            {
              type: "Exercise",
              name: "Code Generation Prompts",
              score: "85/100",
              time: "3 days ago",
            },
            {
              type: "Assessment",
              name: "Mid-course Evaluation",
              score: "Advanced",
              time: "1 week ago",
              highlight: true,
            },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-center py-2.5 ${
                activity.highlight
                  ? "bg-second/10 border-second/30 rounded border px-2"
                  : "border-second/10 border-b"
              }`}
            >
              <div className="bg-second/20 border-second/40 mr-3 flex h-6 w-6 items-center justify-center rounded border">
                <span className="text-second text-xs font-bold">
                  {activity.type.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-white">
                  {activity.name}
                </div>
                <div className="text-xs text-white">{activity.time}</div>
              </div>
              <div className="text-second text-xs font-bold">
                {activity.score}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const items = [
  {
    title: "Real-time Feedback",
    description:
      "Get instant analysis on your prompts' strength and areas for improvement.",
    header: <RealTimeFeedbackVisual />,
    className: "md:col-span-2",
    icon: <IconBolt className="h-4 w-4 text-white" />,
  },
  {
    title: "Interactive Exercises",
    description: "Practice with hands-on exercises.",
    header: <InteractiveExercisesVisual />,
    className: "md:col-span-1",
    icon: <IconCode className="h-4 w-4 text-white" />,
  },
  {
    title: "AI-Powered Suggestions",
    description: "Receive intelligent suggestions.",
    header: <AISuggestionsVisual />,
    className: "md:col-span-1",
    icon: <IconBulb className="h-4 w-4 text-white" />,
  },
  {
    title: "Progress Tracking",
    description: "Monitor your improvement with detailed analytics.",
    header: <ProgressTrackingVisual />,
    className: "md:col-span-2",
    icon: <IconStar className="h-4 w-4 text-white" />,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden py-24">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="via-second mb-4 bg-gradient-to-r from-[#FFA9AE] to-[#69E1FE] bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            Platform Features
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Master the art of prompt engineering
          </p>
        </div>

        <BentoGrid className="mx-auto max-w-7xl md:auto-rows-[28rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn(
                "group/bento text-2xl transition-all duration-300 hover:shadow-2xl",
                "bg-second",
                "border-second/30 border backdrop-blur-2xl backdrop-filter", // Increased blur from xl to 2xl
                "overflow-hidden rounded-2xl",
                "hover:border-second hover:shadow-second/30",
                "bg-opacity-30",
                item.className,
              )}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

// Add this to your globals.css if not already there
