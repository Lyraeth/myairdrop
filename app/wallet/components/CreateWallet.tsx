import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name wallet must be at least 2 characters." })
        .max(50, { message: "Name wallet maximal 50 characters." }),
    address: z
        .string()
        .min(2, { message: "Address wallet must be at least 2 characters." }),
});

export function DialogWalletPOST() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            address: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/wallet/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Something went wrong");
            }

            toast("Add Wallet successfully, please refresh the table");
            form.reset();
        } catch (error) {
            console.error("Error creating wallet:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger className="neoshadows bg-base3 px-2">
                Add Wallet
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Wallet</DialogTitle>
                    <DialogDescription>
                        Input your unique Wallet Name and Wallet Address.
                    </DialogDescription>
                    <Separator />
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="my-1">
                                    <FormLabel>Name Wallet</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your wallet name..."
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
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="my-1">
                                    <FormLabel>Wallet Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your wallet address..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
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
