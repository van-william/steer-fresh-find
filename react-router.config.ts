import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
  appDirectory: "src",
  ssr: true,
  presets: [vercelPreset()],
  future: { unstable_viteEnvironmentApi: true },
} satisfies Config;
