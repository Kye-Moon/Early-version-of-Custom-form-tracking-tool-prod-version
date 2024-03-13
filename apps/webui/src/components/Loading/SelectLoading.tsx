import {Spinner} from "@/Components/Loading/Spinner";

export default function SelectLoading() {
	return (
		<div className={"flex flex-col space-y-1 mt-4"}>
			<div className={"flex flex-col h-8 border border-gray-300 rounded-md px-2"}>
				<Spinner/>
			</div>
		</div>
	);
}
