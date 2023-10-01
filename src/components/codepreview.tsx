import { MEMState } from "@/types/state";

interface CodePreviewProps {
  isMockup: boolean;
  state: MEMState | undefined;
}

export default function CodePreview({ state, isMockup }: CodePreviewProps) {
  return (
    <>
      <h2 className="font-bold text-center">MEM Application state</h2>
      <div className="border-2 border-black dark:border-white max-h-[400px] overflow-y-scroll p-2 max-w-[60vw]">
        <pre>
          <code>{JSON.stringify(state, null, 4)}</code>
        </pre>
      </div>
    </>
  );
}
