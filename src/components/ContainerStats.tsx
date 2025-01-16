import { useEffect, useState } from "react";
import { ContainerStats as ContainerStatsType } from "dockerode";
import { Typography } from "@mui/material";

export default function ContainerStats({ id }: { id: string }) {
  const [stats, setStats] = useState<ContainerStatsType>();

  useEffect(() => {
    const sse = new EventSource(`/api/containers/${id}/stats`);

    sse.onmessage = ({ data }) => {
      const parsed = JSON.parse(data);
      setStats(parsed);
    };

    return () => {
      sse.close();
    };
  }, []);

  if (!stats) {
    return "Fetching container stats...";
  }

  const CPUPercentage =
    ((stats.cpu_stats.cpu_usage.total_usage -
      stats.precpu_stats.cpu_usage.total_usage) /
      (stats.cpu_stats.system_cpu_usage -
        stats.precpu_stats.system_cpu_usage)) *
    stats.cpu_stats.online_cpus *
    100;

  return (
    <Typography>CPU Usage: {(CPUPercentage || 0).toFixed(2) + "%"}</Typography>
  );
}
