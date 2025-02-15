import { Skeleton } from "@/components/ui/skeleton";

export function ViewWalletSkeleton() {
    return (
        <div className="flex flex-col col-span-2">
            <div className="flex flex-row row-span-2 my-1 bg-gray-200 rounded-md">
                <Skeleton className="w-[420] h-[50px]" />
            </div>
            <div className="flex flex-row row-span-2 my-1 bg-gray-200 rounded-md">
                <Skeleton className="w-[420] h-[50px]" />
            </div>
            <div className="flex flex-row row-span-2 my-1 bg-gray-200 rounded-md">
                <Skeleton className="w-[420] h-[50px]" />
            </div>
            <div className="flex flex-row row-span-2 my-1 bg-gray-200 rounded-md">
                <Skeleton className="w-[420] h-[50px]" />
            </div>
        </div>
    );
}
