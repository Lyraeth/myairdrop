import { z } from "zod";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

const formSchema = z.object({
    nameProject: z
        .string()
        .min(2, { message: "Airdrop name must be at least 2 characters." })
        .max(20, { message: "Airdrop name maximal 20 characters." }),
    walletId: z.string(),
    linkProject: z
        .string()
        .url({
            message: "must be a valid url",
        })
        .startsWith("https://", "must start with https://")
        .optional(),
    linkAirdrop: z
        .string()
        .url({
            message: "must be a valid url",
        })
        .startsWith("https://", "must start with https://")
        .optional(),
    tags: z.string().optional(),
    descAirdrop: z
        .string()
        .max(100, { message: "max 100 characters" })
        .optional(),
});

export function DialogAirdropPOST() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [wallets, setWallets] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        async function fetchWallet() {
            try {
                const respone = await fetch("/api/airdrop/read/walletUser");
                const data = await respone.json();
                setWallets(data);
            } catch (error) {
                console.error("Failed to fetch wallets:", error);
            }
        }
        fetchWallet();
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nameProject: "",
            walletId: "",
            linkProject: "",
            linkAirdrop: "",
            descAirdrop: "",
            tags: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/airdrop/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Something went wrong");
            }

            toast("Create airdrop successfully, please refresh the table");
            form.reset();
        } catch (error) {
            console.error("Error creating airdrop:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger className="neoshadows bg-base3 px-2">
                Add Airdrop
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Airdrop</DialogTitle>
                    <DialogDescription>
                        Enter the details of your airdrop below.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-row w-full gap-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full"
                        >
                            <FormField
                                control={form.control}
                                name="nameProject"
                                render={({ field }) => (
                                    <FormItem className="my-1">
                                        <FormLabel>Name Project</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex w-full mt-2.5"
                        >
                            <FormField
                                control={form.control}
                                name="walletId"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col my-1">
                                        <FormLabel>Wallet</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        role="combobox"
                                                        className={cn(
                                                            "w-[227px] justify-between",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? wallets.find(
                                                                  (wallet) =>
                                                                      wallet.id ===
                                                                      field.value
                                                              )?.name
                                                            : "Select wallet"}
                                                        <ChevronsUpDown className="opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder="Search wallet..."
                                                        className="h-9"
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            No wallet found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {wallets.map(
                                                                (wallet) => (
                                                                    <CommandItem
                                                                        value={
                                                                            wallet.name
                                                                        }
                                                                        key={
                                                                            wallet.id
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                "walletId",
                                                                                wallet.id
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            wallet.name
                                                                        }
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                wallet.id ===
                                                                                    field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <div className="flex flex-row w-full gap-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full"
                        >
                            <FormField
                                control={form.control}
                                name="linkProject"
                                render={({ field }) => (
                                    <FormItem className="my-1">
                                        <FormLabel>Link Website</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="link_website"
                                                placeholder="https://"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full"
                        >
                            <FormField
                                control={form.control}
                                name="linkAirdrop"
                                render={({ field }) => (
                                    <FormItem className="my-1">
                                        <FormLabel>Link Airdrop</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="link_airdrop"
                                                placeholder="https://"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>

                <div className="flex flex-row w-full gap-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full"
                        >
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem className="my-1">
                                        <FormLabel>Type Airdrop</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="testnet,retro,node,etc"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full"
                        >
                            <FormField
                                control={form.control}
                                name="descAirdrop"
                                render={({ field }) => (
                                    <FormItem className="my-1">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <Button
                        variant={"outline"}
                        type="submit"
                        disabled={isSubmitting}
                        onClick={form.handleSubmit(onSubmit)}
                        className="neoshadows bg-base3 hover:bg-base3"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
