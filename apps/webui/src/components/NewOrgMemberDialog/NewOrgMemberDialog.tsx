import React from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/Primitives/Dialog";
import {cn} from "@/Lib/utils";
import {buttonVariants} from "@/Primitives/Button/Button";
import {PlusIcon} from "lucide-react";
import NewJobForm from "@/Components/Jobs/NewJobDialog/NewJobForm/NewJobForm";
import NewOrgMemberForm from "@/Components/NewOrgMemberDialog/NewOrgMemberForm";

interface NewOrgMemberDialogProps {
    triggerText?: string;
    dialogTitle?: string;
    role?: string;
    defaultRole?: string;
}

export default function NewOrgMemberDialog({
                                               triggerText,
                                               dialogTitle,
                                               defaultRole
                                           }: NewOrgMemberDialogProps) {
    const [open, setOpen] = React.useState(false);
    const onFormSubmitComplete = () => {
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={cn(buttonVariants({variant: "default", size: "default"}))}>
                <PlusIcon className={"mr-2 h-4 w-4 shrink-0"}/>
                {triggerText || "Add new member"}
            </DialogTrigger>
            <DialogContent className={"max-w-xl"}>
                <DialogHeader>
                    <DialogTitle>{dialogTitle || "Add new member"}</DialogTitle>
                </DialogHeader>
                <p className={'text-sm text-primary/50'}>If they do not have an account, they will
                    receive an email to create one</p>
                <NewOrgMemberForm onFormSubmitComplete={onFormSubmitComplete} defaultRole={defaultRole}/>
            </DialogContent>
        </Dialog>
    );
}
