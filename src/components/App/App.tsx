import React from "react";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <main className="bg-body-secondary text-center py-5">
      <h1>👷‍♂️ WORK IN PROGRESS 👷‍♂️</h1>
      <Outlet />
    </main>
  );
};

export default App;
