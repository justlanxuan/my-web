import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 1. 确保这里的路径和你文件的实际存放位置 100% 一致
// 如果 LogDetail.jsx 在 src/pages 下，就写 "./pages/LogDetail"
// 如果在 src 下，就写 "./LogDetail"
import Home from "./pages/Home";
import Log from "./pages/Log";
import LogDetail from "./pages/LogDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<Log />} />
        {/* 2. 重新加入这一行 */}
        <Route path="/log/:slug" element={<LogDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
