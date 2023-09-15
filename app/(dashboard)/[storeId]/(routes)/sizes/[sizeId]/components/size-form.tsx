"use client";

import * as z from "zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Size } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";

import { TrashIcon } from "lucide-react";

interface SizeFormProps {
    initialData: Size | null;
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
});

type SizeFormValues = z.infer<typeof formSchema>;

const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit Size" : "Create Size";
    const description = initialData ? "Edit a Size" : "Add a New Size";
    const toastMessage = initialData ? "Size updated." : "Size created.";
    const action = initialData ? "Save Changes" : "Create Size";

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || { name: "", value: "" }
    });

    const onSubmit = async (data: SizeFormValues) => {
        try {
            setLoading(true);

            if (initialData) {
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/sizes`, data);
            }

            router.refresh();
            router.push(`/${params.storeId}/sizes`);
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
            router.refresh();
            router.push(`/${params.storeId}/sizes`);
            toast.success("Size deleted.")
        } catch (error) {
            toast.error("Make sure you removed all products using this Size first.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
                        <TrashIcon className="w-4 h-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Size name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="value" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Size value" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">{action}</Button>
                </form>
            </Form>
        </>
    )
}

export default SizeForm