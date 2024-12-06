#!/usr/bin/env bun

import path from "path";
import "dotenv/config";
import { promisify } from "util";
import { exec } from "child_process";
import deepMerge from "deepmerge";
import { program } from "commander";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

import { Api } from "@saitamadotfun/sdk";
import { safeTry } from "@saitamadotfun/utils";
import type { Layer } from "@saitamadotfun/bunshi/lib";

program.version("0.0.0").description("Saitama template starter pack cli");

program
  .command("new <projectName> [framework]")
  .action(async (projectName, framework) => {
    if (projectName && framework)
      if (framework === "nextjs") {
        await promisify(exec)(
          "git clone https://github.com/saitamadotfun/nextjs-template " +
            projectName
        );

        const filePath = path.join(projectName, "package.json");

        const packageJson = JSON.parse(readFileSync(filePath, "utf-8"));
        packageJson["name"] = projectName;
        writeFileSync(filePath, JSON.stringify(packageJson, undefined, 2));
      }
  });

program
  .command("sync")
  .option("-u, --url <url>", "api base api")
  .option("-k, --key <key>", "api key")
  .option("-i, --id <id>", "site id")
  .action(async (options) => {
    const siteId = process.env[options.id];
    const apiURL = process.env[options.url] ?? options.url;
    const authToken = process.env[options.key] ?? options.key;

    let props: Record<string, Record<string, any>> = {};

    const layers: Layer[] = (
      await import(path.join(process.cwd(), "./src/layers.tsx"))
    ).layers;
    for (const layer of layers) {
      const blocks: Record<string, any> = {};
      for (const child of layer.children) blocks[child.key!] = child.args;
      props[layer.key!] = blocks;
    }

    let data: Record<string, Record<string, any>> = {};

    if (siteId && apiURL && authToken) {
      const api = new Api(apiURL, authToken);
      const response = await safeTry(api.site.retrieve)(siteId);
      if (response && response.data.sync) data = response.data.sync.document;
    }

    if (!existsSync("./.saitama")) mkdirSync("./.saitama");

    props = deepMerge(data, props);

    writeFileSync(
      "./.saitama/saitama.json",
      JSON.stringify(props, undefined, 2)
    );
  });

program.parse(process.argv);
