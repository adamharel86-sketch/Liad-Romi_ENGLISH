import React from "react";
import { useNavigate } from "react-router-dom";
import { useStudentContext } from "../context/StudentContext";
import { CONVERSATION_SCENARIOS } from "../data/seed/conversations";
import { Card } from "../components/ui/Card";

export function ConversationsPage() {
  const { activeStudent } = useStudentContext();
  const navigate = useNavigate();
  if (!activeStudent) return null;

  return (
    <div dir="rtl" className="p-4 sm:p-8 max-w-4xl mx-auto">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 mb-1">💬 שיחות עם AI</h1>
      <p className="text-ink-500 mb-6">בחר/י תרחיש ותתחיל/י לתרגל שיחה אמיתית באנגלית</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CONVERSATION_SCENARIOS.map((s) => (
          <Card key={s.id} interactive onClick={() => navigate(`/conversations/${s.id}`)} className="text-center py-6">
            <div className="text-4xl mb-2">{s.emoji}</div>
            <div className="font-semibold text-ink-900 text-sm">{s.titleHe}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
