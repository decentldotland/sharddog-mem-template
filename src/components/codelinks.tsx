export default function CodeLinks() {
  const gistURL =
    "https://gist.github.com/maxknivets/827df954a9884ae68f2d0812dfa3da99";
  return (
    <div className="flex gap-x-4">
      <a
        className="underline hover:text-blue-300"
        target="_blank"
        rel="noopener noreferrer"
        href={gistURL + "#file-contract-js"}
      >
        Contract File ↗
      </a>
      <a
        className="underline hover:text-blue-300"
        target="_blank"
        rel="noopener noreferrer"
        href={gistURL + "#file-state-json"}
      >
        State File ↗
      </a>
      <a
        className="underline hover:text-blue-300"
        target="_blank"
        rel="noopener noreferrer"
        href="https://mem.tech/ide?launchExample=827df954a9884ae68f2d0812dfa3da99&mainnet=true"
      >
        Deploy Your Own ↗
      </a>
    </div>
  );
}
