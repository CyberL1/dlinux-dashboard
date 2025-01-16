export interface Info {
	success: boolean;
	data: InfoData;
}

export interface InfoData {
	name: string;
	IPAddress: string;
	MacAddress: string;
	memory: string;
	cpus: string;
	restartPolicy: { Name: string; MaximumRetryCount: number };
	restarts: number;
	state: {
		Status: string;
		Running: boolean;
		Paused: boolean;
		Restarting: boolean;
		OOMKilled: boolean;
		Dead: boolean;
		Pid: number;
		ExitCode: number;
		Error: string;
		StartedAt: string;
		FinishedAt: string;
	};
	created: string;
	image: string;
}

export interface Process {
	pid: number;
	user: string;
	command: string;
}
