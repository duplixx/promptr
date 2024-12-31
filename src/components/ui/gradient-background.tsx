import React from "react";

const GradientBackground: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[#080913] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="relative z-10 py-12">{children}</div>
    </div>
  );
};

export default GradientBackground;
