"use client";

import * as z from "zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Billboard } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { useOrigin } from "@/hooks/use-origin";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";

import { TrashIcon } from "lucide-react";
import ImageUpload from "@/components/ui/image-upload";

interface BillboardFormProps {
    initialData: Billboard | null;
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
});

type BillboardFormValues = z.infer<typeof formSchema>;

const BillboardForm: React.FC<BillboardFormProps> = ({initialData}) => {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const title = initialData ? "Edit Billboard" : "Create Billboard";
    const description = initialData ? "Edit a Billboard" : "Add a New Billboard";
    const toastMessage = initialData ? "Billboard updated." : "Billboard created.";
    const action = initialData ? "Save Changes" : "Create Billboard";

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {label: "", imageUrl: ""}
    });

    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setLoading(true);
            
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, data);
            }

            router.refresh();
            toast.success(toastMessage)
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
            router.refresh();
            router.push("/");
            toast.success("Billboard deleted.")
        } catch (error) {
            toast.error("Make sure you removed all categories using this billboard first.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading}/>
            <div className="flex items-center justify-between">
                <Heading title={title} description={description}/>
                {initialData && (
                    <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
                        <TrashIcon className="w-4 h-4"/>
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                    <FormField control={form.control} name="imageUrl" render={({field}) => (
                        <FormItem>
                            <FormLabel>Background Image</FormLabel>
                            <FormControl>
                                <ImageUpload
                                value={field.value ? [field.value] : []}
                                onChange={(url) => field.onChange(url)} 
                                disabled={loading} 
                                onRemove={() => field.onChange("")}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="label" render={({field}) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Billboard label" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">{action}</Button>
                </form>
            </Form>
            <Separator />
        </>
    )
}

export default BillboardForm