import type { ReactNode } from "react";
import { useScrollToHash } from "@shared/hooks/useScrollToHash";

type GenericContentProps = {
  title: string;
  content: ReactNode;
};

function GenericContent({ title, content }: GenericContentProps) {
  useScrollToHash();

  return (
    <div className="flex-1 p-10 max-w-5xl mx-auto animate-fadeIn">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight border-b-2 border-red-700 pb-4">
        {title}
      </h1>
      <div className="prose prose-slate max-w-none">{content}</div>
    </div>
  );
}

export default GenericContent;
