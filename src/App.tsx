import { useState } from "react";

import type { DemoMode } from "./components/DemoSwitcher";

import BuyerLayout from "./layouts/BuyerLayout";
import BuilderLayout from "./layouts/BuilderLayout";

import BuyerPrePossession from "./screens/buyer/BuyerPrePossession";
import BuyerPostPossession from "./screens/buyer/BuyerPostPossession";
import BuilderOverview from "./screens/builder/BuilderOverview";

function App() {
  const [mode, setMode] =
    useState<DemoMode>("buyer-pre");

  return (
    <div className="min-h-screen">

      {mode === "buyer-pre" && (
        <BuyerLayout phase="pre" mode={mode} onModeChange={setMode}>
          <BuyerPrePossession />
        </BuyerLayout>
      )}

      {mode === "buyer-post" && (
        <BuyerLayout phase="post" mode={mode} onModeChange={setMode}>
          <BuyerPostPossession />
        </BuyerLayout>
      )}

      {mode === "builder" && (
        <BuilderLayout mode={mode} onModeChange={setMode}>
          <BuilderOverview />
        </BuilderLayout>
      )}

    </div>
  );
}

export default App;