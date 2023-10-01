export default function CodeLinks() {
  return (
    <div className="flex gap-x-4">
      <a
        className="underline hover:text-blue-300"
        target="_blank"
        rel="noopener noreferrer"
        href="https://gist.github.com/maxknivets/e6caa5baa68e5dcab13fa95cd1cff9e9#file-contract-js"
      >
        Contract File ↗
      </a>
      <a
        className="underline hover:text-blue-300"
        target="_blank"
        rel="noopener noreferrer"
        href="https://gist.github.com/maxknivets/e6caa5baa68e5dcab13fa95cd1cff9e9#file-state-json"
      >
        State File ↗
      </a>
      <a
        className="underline hover:text-blue-300"
        target="_blank"
        rel="noopener noreferrer"
        href="https://mem.tech/ide?launchExample=e6caa5baa68e5dcab13fa95cd1cff9e9&mainnet=true"
      >
        Deploy Your Own ↗
      </a>
    </div>
  );
}
