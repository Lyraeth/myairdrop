import { Skeleton } from "@/components/ui/skeleton";

export default function ViewAirdropSkeleton() {
    return (
        <div className="sm:max-w-[425px] md:max-w-[450px]">
            <div className="space-y-4">
                <div className="space-y-1.5">
                    <Skeleton className="w-[90px] h-[20px]"></Skeleton>
                    <Skeleton className="w-[400px] h-[40px]"></Skeleton>
                </div>
                <div className="space-y-1.5">
                    <Skeleton className="w-[90px] h-[20px]"></Skeleton>
                    <Skeleton className="w-[400px] h-[40px]"></Skeleton>
                </div>
                <div className="space-y-1.5">
                    <Skeleton className="w-[90px] h-[20px]"></Skeleton>
                    <Skeleton className="w-[400px] h-[40px]"></Skeleton>
                </div>
                <div className="space-y-1.5">
                    <Skeleton className="w-[90px] h-[20px]"></Skeleton>
                    <Skeleton className="w-[400px] h-[40px]"></Skeleton>
                </div>
                <div className="space-y-1.5">
                    <Skeleton className="w-[90px] h-[20px]"></Skeleton>
                    <Skeleton className="w-[400px] h-[40px]"></Skeleton>
                </div>
                <div className="space-y-1.5">
                    <Skeleton className="w-[30px]"></Skeleton>
                    <Skeleton className="w-[50px] h-[20px] rounded-full"></Skeleton>
                </div>
                <div className="space-y-1.5">
                    <Skeleton className="w-[90px] h-[20px]"></Skeleton>
                    <Skeleton className="w-[400px] h-[40px]"></Skeleton>
                </div>
            </div>
        </div>
    );
}
