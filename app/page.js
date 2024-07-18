import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto bg-gray-100 text-center py-20">
      <div
        className="flex justify-center items-center h-[68vh]"
      >
        <div className="md:w-8/12">
          <h1 className="text-4xl font-bold">
            A better online to-do list app for work
          </h1>
          <p className="text-xl mt-4">
            TodoStream makes it easier for everyone to plan their work by using
            online to-do lists.
          </p>
          <Link
            href="/todos"
            className="mt-6 inline-block px-6 py-3 bg-black text-white text-lg rounded"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
