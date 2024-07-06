import logger from "../logger";

export default function parseNextData<T>(html: string): T {
  const start = new Date().getTime();

  const startScript = '<script id="__NEXT_DATA__" type="application/json">';
  const endScript = "</script>";

  const startScriptIndex = html.indexOf(startScript);
  const endScriptIndex = html.indexOf(endScript, startScriptIndex);

  if (startScriptIndex === -1 || endScriptIndex === -1) {
    throw new Error("Could not find __NEXT_DATA__");
  }

  const jsonStringParsed = html.slice(
    startScriptIndex + startScript.length,
    endScriptIndex
  );

  const json = JSON.parse(jsonStringParsed as string);
  const props = json.props.pageProps;

  const took = new Date().getTime() - start;
  logger.debug(`Parsing NextData took ${took}ms`);

  return props as T;
}
