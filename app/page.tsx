import PageTransition from "@/app/components/motion/PageTransition";

export default function Home() {
    return (
        <PageTransition>
            <main className="mt-20 flex justify-center items-center">
                <h1 className="neoshadows p-2 bg-base3">
                    Welcome to MyAirdrop!
                </h1>
            </main>
        </PageTransition>
    );
}
