// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />
import pkg from "./package.json";

export default $config({
  app(input) {
    return {
      name: "save-slip",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const domain = "amanbrar.pro";
    const isProduction = $app.stage === "production";

    let appUrl: string;
    if ($dev) {
      appUrl = `http://localhost:3000`;
    } else {
      appUrl = isProduction
        ? `https://${domain}`
        : `https://${$app.stage}.${domain}`;
    }

    new sst.aws.Nextjs("MyWeb", {
      dev: {
        command: "next dev",
      },
      environment: {
        LOG_LEVEL: isProduction ? "info" : "debug",
        APP_ENV: $dev ? "development" : $app.stage,
        VERSION: pkg.version,
        APP_URL: appUrl,
      },
    });
  },
});
