"use client";
import { Application } from "@playcanvas/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from "playcanvas";
import "./globals.css"

const queryClient = new QueryClient();

export default function PhysicsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<QueryClientProvider client={queryClient}>
				{children}
		</QueryClientProvider>
	);
}
