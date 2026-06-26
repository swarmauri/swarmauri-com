import React from "react";
import FaqQuestionAnswer from "./FaqQuestionAnswer";
import { FaqItem } from "../../data/faq";

interface FaqQuestionAnswerListProps {
  items: FaqItem[];
}

export default function FaqQuestionAnswerList({ items }: FaqQuestionAnswerListProps) {
  return (
    <div className="space-y-3" id="faq-question-answer-list">
      {items.map((item, index) => (
        <FaqQuestionAnswer key={item.id} item={item} defaultOpen={index === 0} />
      ))}
    </div>
  );
}
