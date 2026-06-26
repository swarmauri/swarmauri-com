import React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import MarkdownBody from "../MarkdownBody";
import { FaqItem } from "../../data/faq";

interface FaqQuestionAnswerProps {
  item: FaqItem;
  defaultOpen?: boolean;
  key?: string | number;
}

export default function FaqQuestionAnswer({ item, defaultOpen = false }: FaqQuestionAnswerProps) {
  return (
    <details
      className="group rounded-lg border border-zinc-200 bg-white shadow-sm"
      defaultOpen={defaultOpen}
      id={`faq-${item.id}`}
    >
      <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
          <HelpCircle className="h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-bold leading-snug text-zinc-950">
            {item.question}
          </span>
          <span className="mt-1 inline-flex rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-zinc-500">
            {item.category}
          </span>
        </span>
        <ChevronDown className="h-4 w-4 text-zinc-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-zinc-100 px-4 pb-5 pt-4 sm:pl-14">
        <MarkdownBody markdown={item.answer} />
      </div>
    </details>
  );
}
