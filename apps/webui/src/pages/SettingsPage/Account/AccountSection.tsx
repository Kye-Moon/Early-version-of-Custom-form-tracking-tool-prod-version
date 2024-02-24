import PersonalInformationForm from "@/Pages/SettingsPage/Account/PersonalInformationForm";
import {graphql} from "gql-types";
import {useMutation, useSuspenseQuery} from "@apollo/client";
import React, {useState} from "react";
import PersonalInformationView from "@/Pages/SettingsPage/Account/PersonalInformationView";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
	personalInformationFormSchema
} from "@/Pages/SettingsPage/Account/PersonalInformationSchema";
import toast from "react-hot-toast";
import {Button} from "@/Primitives/Button/Button";
import {EditIcon, SaveIcon} from "lucide-react";
import {Spinner} from "@/Components/Loading/Spinner";
import {isEmptyObject} from "@/Lib/utils";

const query = graphql(`
	query UserAccount {
		currentUser {
			id
			name
			email
			phone
			organisation {
				id
				name
			}
		}
	}
`)

const mutation = graphql(`
	mutation UpdateUser($input: UpdateUserInput!) {
		updateUser(updateUserInput: $input) {
			id
			name
			email
			phone
		}
	}
`)

export default function AccountSection() {
	const {data} = useSuspenseQuery(query)
	const [isEditing, setIsEditing] = useState<boolean>(false)

	const form = useForm({
		resolver: zodResolver(personalInformationFormSchema),
		defaultValues: {
			name: data.currentUser.name ?? "",
			email: data.currentUser.email ?? "",
			phone: data.currentUser.phone ?? "",
		}
	})

	const [updateUser, {loading}] = useMutation(mutation, {
		onCompleted: () => {
			form.reset(form.getValues())
			setIsEditing(!isEditing)
		},
		onError: () => {
			toast.error("Error updating job")
		},
		refetchQueries: ["UserAccount"],
		awaitRefetchQueries: true,
	})


	const onSaveDetails = async () => {
		if (form.formState.isDirty && isEmptyObject(form.formState.errors)) {
			await updateUser({
				variables: {
					input: {
						id: data.currentUser.id,
						name: form.getValues().name,
						email: form.getValues().email,
						phone: form.getValues().phone,
					}
				}
			});
		} else {
			if (!isEmptyObject(form.formState.errors)) return
			setIsEditing(!isEditing)
		}
	}


	return (
		<div>
			<div className={'flex justify-between align-middle mr-4'}>
				<h3 className={'text-xl font-semibold'}>Details</h3>
				<Button onClick={() => onSaveDetails()} size={'sm'}
						variant={'outline'}>
					{loading
						? <Spinner/>
						: isEditing
							? <SaveIcon size={20}/>
							: <EditIcon size={20}/>}
				</Button>
			</div>
			{isEditing
				? (<PersonalInformationForm form={form}/>)
				: (<PersonalInformationView user={data.currentUser}/>)
			}
		</div>

	)
}
