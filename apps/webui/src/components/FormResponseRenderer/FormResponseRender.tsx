import StackedLabelAndValue from "@/Components/StackedLabelAndValue";
import {Separator} from "@/Primitives/Seperator";
import dayjs from "dayjs";
import Badge from "@/Primitives/Badge/Badge";
import {Label} from "@/Primitives/Label";
import {Checkbox} from "@/Primitives/Checkbox";

interface FormField {
	id: string;
	type: string;
	title: string;
	value: string;
}

interface FormResponseRenderProps {
	formFields: FormField[];
}

export default function FormResponseRender({formFields}: FormResponseRenderProps) {
	return (
		<div className={'space-y-2 pb-6'}>
			{formFields.map((field) => {
				switch (field.type) {
					case "SeparatorField":
						return <Separator key={field.id}/>;
					case "SpacerField":
						return <div key={field.id} style={{margin: '10px 0'}}/>;
					case "TitleField":
						return <h2 className={'text-lg'} key={field.id}>{field.title}</h2>;
					case "SubTitleField":
						return <h3 className={'text-sm text-primary/50'}
								   key={field.id}>{field.title}</h3>;
					case "ParagraphField":
						return <p key={field.id}>{field.title}</p>;
					case "TextField":
					case "NumberField":
					case "TextAreaField":
						return (
							<StackedLabelAndValue
								key={field.id}
								label={field.title}
								value={field.value || "N/A"} // Or some other placeholder for empty values
							/>
						);
					case "DateField":
						return (
							<StackedLabelAndValue
								key={field.id}
								label={field.title}
								value={dayjs(field.value).format("DD/MM/YYYY") || "N/A"}
							/>
						);
					case "SelectField":
						return (
							<StackedLabelAndValue
								key={field.id}
								label={field.title}
								value={
									<Badge text={field.value || "N/A"} size={'sm'}/>
								}
							/>
						);
					case "CheckboxField":
						return (
							<div key={field.id} className={'flex flex-col space-y-2'}>
								<Label className={'text-primary/75 pt-2'}
									   key={field.id}>{field.title}</Label>
								<Checkbox checked={field.value === 'true'} disabled={true}/>
							</div>
						);
					default:
						return null;
				}
			})}
		</div>
	);
}
