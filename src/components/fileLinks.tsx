import { arseedURL } from "@/constants";

interface FileLinksProps {
  fileLinks: string[];
}

function FileLinks({ fileLinks }: FileLinksProps) {
  return (
    <div className="flex flex-col gap-y-2">
      {fileLinks.map((tx, index) => (
        <a
          className="internal-link"
          key={index}
          href={arseedURL + tx}
          target="_blank"
          rel="noopener noreferrer"
        >
          Goodie {index + 1}
        </a>
      ))}
    </div>
  );
}

export default FileLinks;
