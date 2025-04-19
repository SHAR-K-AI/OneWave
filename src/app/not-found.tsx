import Link from "next/link";
import Image from "next/image";

/**
 *
 * @constructor
 */
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center mt-6 p-4 bg-gray-100 text-center">
            <Image
                src="/images/not-found.png"
                alt="404 Not Found"
                width={400}
                height={400}
                className="mb-8"
            />
            <Link
                href="/"
                className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 transition"
            >
                Go back home
            </Link>
        </div>
    );
}
