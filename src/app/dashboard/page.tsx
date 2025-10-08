import React from "react";
import ModernChatInterface from "./_components/ModernChatInterface";

const MainPage: React.FC = async () => {
  // Auth check can be enabled later
  // const session = await auth();
  // if (!session?.user) {
  //   redirect("/sign-in");
  // }

  return <ModernChatInterface />;
};

export default MainPage;
