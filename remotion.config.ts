import { Config } from "@remotion/cli/config";

// Default configuration for transparent video output
Config.setVideoImageFormat("png");
Config.setCodec("vp9");
Config.setPixelFormat("yuva420p");
