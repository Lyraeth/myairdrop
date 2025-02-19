import { Skeleton } from "@/components/ui/skeleton";

export function ViewWalletSkeleton() {
    return (
        <div className="flex flex-col col-span-2 gap-4">
            <div className="sm:max-w-[425px]">
                <div className="space-y-4">
                    <div className="space-y-4 p-0">
                        <div className="space-y-1.5">
                            <Skeleton className="w-[80px] h-[20px] bg-gray-400 rounded-md" />
                            <Skeleton className="w-[380px] h-[25px] bg-gray-400 rounded-md" />
                        </div>
                        <div className="space-y-1.5">
                            <Skeleton className="w-[80px] h-[20px] bg-gray-400 rounded-md" />
                            <Skeleton className="w-[380px] h-[25px] bg-gray-400 rounded-md" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
