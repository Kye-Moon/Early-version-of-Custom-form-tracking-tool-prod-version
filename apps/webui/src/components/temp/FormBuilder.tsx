import React, {useEffect, useState} from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import Designer from "./Designer";
import {DndContext, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import useDesigner from "@/Hooks/useDesigner";
import {ImSpinner2} from "react-icons/im";
import {FindFormTemplateQuery} from "gql-types";
import SaveFormBtn from "@/Components/temp/SaveFormBtn";
import PublishFormBtn from "@/Components/temp/PublishFormBtn";
import {FormElements} from "@/Components/temp/FormElements";
import {Input} from "@/Primitives/Input";

function FormBuilder({form}: { form: FindFormTemplateQuery['formTemplate'] }) {
	const {setElements, setSelectedElement} = useDesigner();
	const [isReady, setIsReady] = useState(false);
	const {elements, setFormName, setFormDescription, formDescription, formName} = useDesigner();

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10, // 10px
		},
	});

	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: {
			delay: 300,
			tolerance: 5,
		},
	});

	const sensors = useSensors(mouseSensor, touchSensor);

	useEffect(() => {
		setFormName(form.name);
		setFormDescription(form.description ?? "");
	}, [form, setFormName, setFormDescription]);


	useEffect(() => {
		if (isReady) return;
		if (form.structure === null) {
			setElements([]);
			setSelectedElement(null);
			const readyTimeout = setTimeout(() => setIsReady(true), 500);
			return () => clearTimeout(readyTimeout);
		}
		const elements = JSON.parse(JSON.stringify(form.structure?.elements));
		setElements(elements ?? []);
		setSelectedElement(null);
		const readyTimeout = setTimeout(() => setIsReady(true), 500);
		return () => clearTimeout(readyTimeout);
	}, [form, setElements, isReady, setSelectedElement]);

	if (!isReady) {
		return (
			<div className="flex flex-col items-center justify-center w-full h-full">
				<ImSpinner2 className="animate-spin h-12 w-12"/>
			</div>
		);
	}

	if (form.status === "ACTIVE") {
		return (
			<div className={"flex flex-col w-full h-full"}>
				<div className="px-4 py-2 border-b">
					<p className="text-lg font-bold text-muted-foreground">Form View</p>
					<p className="text-sm text-muted-foreground">This is how your form looks to your
						users.</p>
				</div>
				<div
					className="bg-primary/10 flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">
					<div
						className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
						{elements.map((element) => {
							const FormComponent = FormElements[element.type].formComponent;
							return <FormComponent key={element.id} elementInstance={element}/>;
						})}
					</div>
				</div>
			</div>
		)
	}


	return (
		<DndContext sensors={sensors}>
			<main className="flex flex-col w-full h-screen ">
				<nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
					<div className={'space-y-2'}>
						<h2 className="">
							<span className="text-muted-foreground mr-2">Form:</span>
							<Input value={formName}
								   onChange={(e) => setFormName(e.target.value)}/>{' '}
						</h2>
						<h2 className="">
							<span className="text-muted-foreground mr-2">Description:</span>
							<Input value={formDescription}
								   onChange={(e) => setFormDescription(e.target.value)}/>{' '}
						</h2>
						<h3 className={'py-2 text-md font-semibold text-primary/50'}>
							NOTE: All forms have a title and description field by default. You do
							not need to add these fields.
						</h3>
					</div>
					<div className="flex items-center gap-2">
						<PreviewDialogBtn/>
						{form.status !== "ACTIVE" && (
							<>
								<SaveFormBtn id={form.id}/>
								<PublishFormBtn id={form.id}/>
							</>
						)}
					</div>
				</nav>
				<div
					className="flex w-full flex-grow items-center justify-center relative overflow-y-auto bg-primary/10  rounded-lg">
					<Designer/>
				</div>
			</main>
			<DragOverlayWrapper/>
		</DndContext>
	);
}

export default FormBuilder;
