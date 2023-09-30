import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b-2 border-black dark:border-white w-full py-2 flex items-center gap-x-2">
      <Link href="/" className="internal-link">
        Home
      </Link>
      <Link href="/admin" className="internal-link">
        Admin
      </Link>
      <a
        className="internal-link "
        target="_blank"
        rel="noopener noreferrer"
        href="https://mem.tech/ide?launchExample=7908734530a8551c11b02e0b553abbd3&mainnet=true"
      >
        Contract ↗
      </a>
    </nav>
  );
}
