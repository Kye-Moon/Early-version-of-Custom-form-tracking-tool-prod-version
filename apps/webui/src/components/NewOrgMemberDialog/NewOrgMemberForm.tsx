import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
	newOrgMemberFormSchema,
	NewOrgMemberFormType
} from "@/Components/NewOrgMemberDialog/NewOrgMemberFormSchema";
import {Form, FormField} from "@/Primitives/Form";
import FormInputWrapper from "@/Components/FormInputWrapper/FormInputWrapper";
import {Input} from "@/Primitives/Input";
import * as React from "react";
import DropSelect from "@/Components/DropSelect/DropSelect";
import {roleSelectOptions} from "@/Constants/constants";
import {hasRole} from "@/Lib/utils";
import {useAuth, useOrganization} from "@clerk/clerk-react";
import toast from "react-hot-toast";
import LoadingButton from "@/Components/Loading/LoadingButton/LoadingButton";


/**
 * Props for the NewProjectForm component
 */
interface NewCrewMemberFormProps {
	/**
	 * Function to call when the form is submitted, used to close the modal and perform any other actions
	 */
	onFormSubmitComplete?: () => void;
	defaultRole?: string;
}

export default function NewOrgMemberForm({
											 onFormSubmitComplete,
											 defaultRole
										 }: NewCrewMemberFormProps) {
	const {orgRole} = useAuth();
	const {organization} = useOrganization();
	const [loading, setLoading] = React.useState(false);
	const form = useForm<NewOrgMemberFormType>({
		resolver: zodResolver(newOrgMemberFormSchema),
		defaultValues: {
			email: '',
			role: defaultRole || "",
		},
	});

	async function onSubmit(values: NewOrgMemberFormType) {
		setLoading(true)
		try {
			await organization?.inviteMember({
				emailAddress: values.email,
				role: values.role
			})
		} catch (e) {
			toast.error('Error sending invitation')
			setLoading(false)
			return
		}

		if (onFormSubmitComplete) {
			onFormSubmitComplete();
		}
		setLoading(false)
		toast.success('Invitation sent')
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 overflow-auto">
				<div className=" px-1 mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-3">
					<div className="sm:col-span-3">
						<FormField
							control={form.control}
							name="email"
							render={({field}) => (
								<FormInputWrapper label={"Email"}>
									<Input type={'text'} {...field} />
								</FormInputWrapper>
							)}
						/>
					</div>
					<div className="sm:col-span-3">
						<FormField
							control={form.control}
							name="role"
							render={({field}) => (
								<FormInputWrapper label={"Role"}
												  description={"The role you want the user to have"}>
									<DropSelect
										options={[...roleSelectOptions, ...(hasRole(orgRole, 'org:admin') ? [{
											label: "Admin",
											value: "org:admin"
										}] : [])]}
										defaultValue={field.value}
										onChange={field.onChange}
										placeholder={"Role"}
									/>
								</FormInputWrapper>
							)}
						/>
					</div>
				</div>
				<div className={"flex justify-end"}>
					<LoadingButton label={"Submit"} loadingStatus={loading} type={"submit"}/>
				</div>
			</form>
		</Form>
	)
}
