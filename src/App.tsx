import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage.tsx"
import TeamList from "./pages/TeamList.tsx"
import TeamMember from "./pages/TeamMember.tsx"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={
      <HomePage />} />
      <Route path="/TeamList" element={
      <TeamList />} />
      <Route path="/user/:id" element={<TeamMember />} />
    </Routes>
    </>
    
  )
}

export default App

