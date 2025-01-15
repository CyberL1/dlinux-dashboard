import { useLoaderData, useRevalidator } from "react-router";
import { Container } from "../../types";
import { Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { useState } from "react";
import ContainerStats from "../../components/ContainerStats";

interface Params {
  name: string;
}

export async function Loader({ params }: { params: Params }) {
  const container = await fetch(`/api/containers/${params.name}`);

  const data = await container.json();
  return data;
}

export default function ContainerPage() {
  const container = useLoaderData() as Container & { statusCode: number };

  if (container.statusCode === 404) {
    return "Container not found";
  }

  const revalidator = useRevalidator();
  const [isPowerStateLocked, setPowerStateLocked] = useState<boolean>();

  return (
    <Paper square sx={{ padding: 1 }}>
      <Paper sx={{ display: "flex" }} variant="outlined">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Managing: {container.name}
        </Typography>
        <ButtonGroup>
          <Button
            loading={isPowerStateLocked}
            onClick={async () => {
              await switchPowerState(
                container.status === "running" ? "stop" : "start",
              );
            }}
          >
            Power {container.status === "running" ? "off" : "on"}
          </Button>
          <Button
            onClick={async () => await switchPowerState("restart")}
            loading={isPowerStateLocked}
            disabled={container.status === "exited"}
          >
            Restart
          </Button>
        </ButtonGroup>
      </Paper>
      <ContainerStats id={container.id} />
    </Paper>
  );

  async function switchPowerState(state: string) {
    setPowerStateLocked(true);

    const res = await fetch(`/api/containers/${container.name}/${state}`, {
      method: "PUT",
    });

    if (res.ok) {
      setPowerStateLocked(false);
      revalidator.revalidate();
    }
  }
}
