import Link from "next/link";

// Mock data, in the future this will be fetched from content-index.json
const DUMMY_CATEGORIES = [
  {
    name: "Foundation",
    lessons: [
      { id: "iam", title: "IAM Basics" },
      { id: "s3", title: "S3 Storage" }
    ]
  },
  {
    name: "Compute",
    lessons: [
      { id: "ec2", title: "EC2 Fundamentals" },
      { id: "lambda", title: "AWS Lambda" }
    ]
  }
];

export function Sidebar() {
  return (
    <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r border-gray-200 dark:border-gray-800 py-6 pr-6 md:sticky md:block lg:py-8 lg:w-64 bg-white dark:bg-gray-950">
      <div className="w-full">
        {DUMMY_CATEGORIES.map((category, index) => (
          <div key={index} className="pb-6">
            <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              {category.name}
            </h4>
            <div className="flex flex-col gap-1 w-full text-sm">
              {category.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className="block rounded-md px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 transition-colors"
                >
                  {lesson.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
