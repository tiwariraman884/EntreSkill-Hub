import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] p-4 text-center">
      <div className="flex items-center justify-center size-20 rounded-full bg-muted text-muted-foreground mb-8">
        <SearchX className="size-10" />
      </div>
      <h1 className="text-4xl font-bold font-heading mb-4 text-foreground">
        404 - Page Not Found
      </h1>
      <p className="text-muted-foreground max-w-md mb-8 text-lg">
        We couldn&apos;t find the page you were looking for. It might have been moved or doesn&apos;t exist.
      </p>
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="default">Return to Homepage</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
