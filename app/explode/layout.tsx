"use client";
import { Application } from "@playcanvas/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FILLMODE_FILL_WINDOW } from "playcanvas";

const queryClient = new QueryClient();

export default function GlbViewerLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<QueryClientProvider client={queryClient}>
			<Application fillMode={FILLMODE_FILL_WINDOW} usePhysics>
				{children}
			</Application>
		</QueryClientProvider>
	);
}
