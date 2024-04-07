import Designer from "@/Components/temp/Designer";
import {DndContext, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import DragOverlayWrapper from "@/Components/temp/DragOverlayWrapper";
import useDesigner from "@/Hooks/useDesigner";
import {useState} from "react";
import PreviewDialogBtn from "@/Components/temp/PreviewDialogBtn";
import SaveFormBtn from "@/Components/temp/SaveFormBtn";

export default function NewFormPage() {
	const {setElements, setSelectedElement} = useDesigner();
	const [isReady, setIsReady] = useState(false);

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


	return (
		<div className={''}>
			<DndContext sensors={sensors}>
				<main className="flex flex-col w-full h-screen">
					<nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
						<h2 className="truncate font-medium">
							<span className="text-muted-foreground mr-2">Form:</span>
							{"form.name"}
						</h2>
						<div className="flex items-center gap-2">
							<PreviewDialogBtn />
							{/*{!form.published && (*/}
							{/*	<>*/}
									<SaveFormBtn id={1} />
									{/*<PublishFormBtn id={form.id} />*/}
							{/*	</>*/}
							{/*)}*/}
						</div>
					</nav>
					<div
						className="flex w-full flex-grow items-center justify-center relative overflow-y-auto ">
						<Designer/>
					</div>
				</main>
				<DragOverlayWrapper/>
			</DndContext>
		</div>
	)
}
