import React from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/Primitives/Dialog";
import {cn} from "@/Lib/utils";
import {buttonVariants} from "@/Primitives/Button/Button";
import {PlusIcon} from "lucide-react";


interface NewItemFormDialogProps {
    label: string;
    description?: string;
    triggerLabel: string;
    form: React.ReactElement; // Changed from React.ReactNode to React.ReactElement for cloneElement to work
    onFormSubmitCompleteAction?: () => void;
    dialogContentWidth?: 'md' | 'lg'
}

export default function NewItemFormDialog({
                                              label,
                                              triggerLabel,
                                              form,
                                              onFormSubmitCompleteAction,
                                              dialogContentWidth = 'md',
                                              description
                                          }: NewItemFormDialogProps) {
    const [open, setOpen] = React.useState(false);
    const onFormSubmitComplete = () => {
        setOpen(false);
        onFormSubmitCompleteAction && onFormSubmitCompleteAction();
    };
    const clonedForm = React.cloneElement(form, {onFormSubmitComplete});

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={cn(buttonVariants({variant: "default", size: "default"}))}>
                <PlusIcon className={"mr-2 h-4 w-4 shrink-0"}/>
                {triggerLabel}
            </DialogTrigger>
            <DialogContent
                className={cn("w-full", dialogContentWidth === 'md' ? "max-w-2xl" : "max-w-6xl")}>
                <DialogHeader>
                    <DialogTitle>{label}</DialogTitle>
                    {description && <p className={'text-sm'}>{description}</p>}
                </DialogHeader>
                {clonedForm}
            </DialogContent>
        </Dialog>
    );
}
