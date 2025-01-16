import ProcessesTable from "../../components/ProcessesTable";

export default function ProcessesPage() {
	const containerName = localStorage["hostname"];
	return <ProcessesTable container={containerName} />;
}
