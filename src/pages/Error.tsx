import { ErrorResponse, useRouteError } from "react-router";

export default function ErrorPage() {
	const error = useRouteError() as Error & ErrorResponse;

	return <>Error: {error.statusText || error.message}</>;
}
