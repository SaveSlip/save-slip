// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "save-slip",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        cloudflare: "5.37.1",
      },
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

    const pkg = await import("./package.json");

    new sst.aws.Nextjs("MyWeb", {
      domain: $dev
        ? undefined
        : {
            name: isProduction ? domain : `${$app.stage}.${domain}`,
            redirects: isProduction ? [`www.${domain}`] : [],
            dns: sst.cloudflare.dns({ proxy: true }),
          },
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
