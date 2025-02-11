import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check } from "lucide-react";

const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name wallet must be at least 2 characters." })
        .max(50, { message: "Name wallet maximal 50 characters." }),
    address: z.string(),
    check_extension: z.boolean().default(false).optional(),
    check_application: z.boolean().default(false).optional(),
});

export function DrawerWalletPOST() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            address: "",
            check_extension: false,
            check_application: false,
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

            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            form.reset();
        } catch (error) {
            console.error("Error creating wallet:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Drawer>
            <DrawerTrigger>
                <Button
                    variant={"outline"}
                    className="neoshadows bg-green-200/90 hover:bg-green-400"
                >
                    Add Wallet
                </Button>
            </DrawerTrigger>
            <DrawerContent className="space-x-4">
                <DrawerHeader>
                    <DrawerTitle>Add Wallet</DrawerTitle>
                    <DrawerDescription className="mb-3 border-b-2">
                        Input your unique Wallet Name and Wallet Address.
                    </DrawerDescription>
                </DrawerHeader>

                {showAlert && (
                    <Alert className="mb-3">
                        <Check className="h-4 w-4" />
                        <AlertTitle>Wallet Added Successfully!</AlertTitle>
                        <AlertDescription>
                            Your wallet has been added.
                        </AlertDescription>
                    </Alert>
                )}

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name Wallet</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your wallet name..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your wallet name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Wallet Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your wallet address..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your unique wallet address.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-row gap-2">
                            <FormField
                                control={form.control}
                                name="check_extension"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Extension?</FormLabel>
                                            <FormDescription>
                                                this wallet is on extension?
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="check_application"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Application?</FormLabel>
                                            <FormDescription>
                                                this wallet is on application?
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>

                <DrawerFooter>
                    <Button
                        variant={"outline"}
                        type="submit"
                        disabled={isSubmitting}
                        onClick={form.handleSubmit(onSubmit)}
                        className="neoshadows bg-green-200 hover:bg-green-400"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                    <DrawerClose>
                        <Button
                            variant={"outline"}
                            className="neoshadows bg-red-200 hover:bg-red-400 w-full"
                        >
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
