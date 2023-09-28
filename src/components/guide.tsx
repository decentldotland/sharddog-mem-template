export default function Guide() {
  return (
    <div className="text-blue-400 text-center max-w-[600px]">
      To get started,{" "}
      <a
        className="underline hover:text-blue-300"
        target="_blank"
        rel="noopener noreferrer"
        href="https://mem.tech/ide?launchExample=7908734530a8551c11b02e0b553abbd3&mainnet=true"
      >
        deploy ↗
      </a>{" "}
      the contract with the controlling{" "}
      <code className="text-gray-400">admin_address</code> and contact{" "}
      <a
        href="https://t.me/Akapepe007"
        className="underline hover:text-blue-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        @charmful0x
      </a>{" "}
      to whitelist the contract. <br /> To start interacting, export the private
      key of the <code className="text-gray-400">admin_address</code> into{" "}
      <code className="text-gray-400">.env.local</code> as{" "}
      <code className="text-gray-400">ETH_ADMIN_PK</code>.
    </div>
  );
}
