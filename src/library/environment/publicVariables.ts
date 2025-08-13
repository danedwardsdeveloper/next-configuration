import type { LogLevel } from "@/types";

export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = process.env.NODE_ENV === "development";

/*
Create a local database
psql
CREATE DATABASE project_name;
*/

export const developmentDatabaseString = 'postgresql://localhost/next_configuration'

export const bareDomain = "bare-domain.vercel.app";
export const productionBaseUrl = `https://${bareDomain}`;
export const developmentBaseUrl = "http://localhost:3000";
export const dynamicBaseUrl = isProduction
	? productionBaseUrl
	: developmentBaseUrl;

export const serverLogLevel: LogLevel = "level5debug";
export const browserLogLevel: LogLevel = isDevelopment
	? "level5debug"
	: "level0none";
