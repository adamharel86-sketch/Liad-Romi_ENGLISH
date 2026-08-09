import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useStudentContext } from "./context/StudentContext";
import { AppShell } from "./components/layout/AppShell";
import { WelcomePage } from "./pages/WelcomePage";
import { PlacementTestPage } from "./pages/PlacementTestPage";
import { DashboardPage } from "./pages/DashboardPage";
import { TutorPage } from "./pages/TutorPage";
import { ConversationsPage } from "./pages/ConversationsPage";
import { ConversationSessionPage } from "./pages/ConversationSessionPage";
import { VocabularyPage } from "./pages/VocabularyPage";
import { ReadingPage } from "./pages/ReadingPage";
import { GrammarPage } from "./pages/GrammarPage";
import { WritingPage } from "./pages/WritingPage";
import { SpeakingPage } from "./pages/SpeakingPage";
import { AchievementsPage } from "./pages/AchievementsPage";
import { ParentsPage } from "./pages/ParentsPage";
import { ParentGate } from "./components/parents/ParentGate";

function RequireStudentAndOnboarding({ children }: { children: React.ReactNode }) {
  const { activeStudent } = useStudentContext();
  if (!activeStudent) return <Navigate to="/welcome" replace />;
  if (!activeStudent.onboardingComplete) return <Navigate to="/welcome" replace />;
  if (!activeStudent.placementTestComplete) return <Navigate to="/placement" replace />;
  return <>{children}</>;
}

function RequireStudentOnly({ children }: { children: React.ReactNode }) {
  const { activeStudent } = useStudentContext();
  if (!activeStudent) return <Navigate to="/welcome" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route
        path="/parents"
        element={
          <ParentGate>
            <ParentsPage />
          </ParentGate>
        }
      />
      <Route
        path="/placement"
        element={
          <RequireStudentOnly>
            <PlacementTestPage />
          </RequireStudentOnly>
        }
      />
      <Route
        element={
          <RequireStudentAndOnboarding>
            <AppShell />
          </RequireStudentAndOnboarding>
        }
      >
        <Route path="/home" element={<DashboardPage />} />
        <Route path="/tutor" element={<TutorPage />} />
        <Route path="/conversations" element={<ConversationsPage />} />
        <Route path="/conversations/:scenarioId" element={<ConversationSessionPage />} />
        <Route path="/vocabulary" element={<VocabularyPage />} />
        <Route path="/reading" element={<ReadingPage />} />
        <Route path="/grammar" element={<GrammarPage />} />
        <Route path="/writing" element={<WritingPage />} />
        <Route path="/speaking" element={<SpeakingPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
}
