import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import World from "./pages/World"
import Technology from "./pages/Technology";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/world/:worldId" element={<World />} />
      <Route path="/world/:worldId/:techId" element={<Technology />} />
    </Routes>
  )
}
