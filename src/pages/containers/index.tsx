import { useLoaderData } from "react-router";
import { Container } from "../../types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid2 as Grid,
} from "@mui/material";

export async function Loader() {
  const containers = await fetch("/api/containers");

  const data = await containers.json();
  return data;
}

export default function Containers() {
  const containers = useLoaderData() as Container[];

  return (
    <>
      <Grid container spacing={2}>
        {containers.map((container) => (
          <Card key={container.id}>
            <CardHeader
              title={container.name}
              sx={{
                textOverflow: "elipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            />
            <CardContent>
              Image: {container.image}
              <br />
              Status: {container.status}
            </CardContent>
            <CardActions>
              <Button href={`/containers/${container.name}`}>Manage</Button>
              <Button
                href={`//${container.name}.${document.location.host}`}
                target="_blank"
                disabled={container.status === "exited"}
              >
                Open container
              </Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </>
  );
}
