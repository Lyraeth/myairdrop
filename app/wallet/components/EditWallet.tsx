import { z } from "zod";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";

const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name wallet must be at least 2 characters." })
        .max(50, { message: "Name wallet maximal 50 characters." }),
    address: z
        .string()
        .min(2, { message: "Address wallet must be at least 2 characters." }),
    check_extension: z.boolean().default(false).optional(),
    check_application: z.boolean().default(false).optional(),
});

type WalletEditActionsProps = {
    walletId: number;
    openEditWallet: boolean;
    onOpenEditChange: (openEditWallet: boolean) => void;
};

type Wallet = {
    name: string;
    address: string;
    check_extension: boolean;
    check_application: boolean;
};

const EditWallet: React.FC<WalletEditActionsProps> = ({
    walletId,
    openEditWallet,
    onOpenEditChange,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [walletData, setWalletData] = useState<Wallet | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            address: "",
            check_extension: false,
            check_application: false,
        },
    });

    const { reset } = form;

    const handleView = async () => {
        try {
            const response = await fetch(`/api/wallet/read/${walletId}`, {
                method: "GET",
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to view wallet");
            }
            const data = await response.json();
            setWalletData(data);
            reset(data);
        } catch (error) {
            console.error("Error viewing wallet:", error);
        }
    };

    useEffect(() => {
        if (openEditWallet) {
            handleView();
        }
    }, [openEditWallet, walletId, reset]);

    const handleEdit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            const editData = await fetch(`/api/wallet/edit/${walletId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!editData.ok) {
                const errorData = await editData.json();
                throw new Error(errorData.error || "Something went wrong");
            }

            toast("Wallet has been edited");
            form.reset();
            handleView();
        } catch (error) {
            console.error("Error editing wallet:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={openEditWallet} onOpenChange={onOpenEditChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Edit Wallet Details
                    </DialogTitle>
                    <Separator className="my-4" />
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleEdit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="my-1">
                                    <FormLabel>Edit name wallet</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="my-1">
                                    <FormLabel>Edit wallet address</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormLabel>Location?</FormLabel>
                        <div className="flex flex-row gap-2 my-1">
                            <FormField
                                control={form.control}
                                name="check_extension"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:border-black hover:shadow-xl">
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
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:border-black hover:shadow-xl">
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
                <DialogFooter>
                    <Button
                        variant={"outline"}
                        type="submit"
                        disabled={isSubmitting}
                        onClick={form.handleSubmit(handleEdit)}
                        className="neoshadows bg-green-200 hover:bg-green-400"
                    >
                        {isSubmitting ? "Submitting..." : "Change"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditWallet;
