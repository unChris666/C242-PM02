import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={200}
        height={200}
      />
      <h1 className="text-6xl font-bold">
        Welcome to{" "}
        <a
          className="text-blue-600"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Next.js!
        </a>
      </h1>
    </div>
  );
}
