import { IMDB_GRAPHQL_ENDPOINT } from "@/config";
import { HTTPException } from "hono/http-exception";

const tryParseJson = (text: string) => {
  try {
    return JSON.parse(text) as any;
  } catch {
    try {
      const splitted = text.split("\n&&&\n");
      if (splitted.length < 3) throw new Error();

      return splitted
        .map((s) => {
          try {
            return JSON.parse(s);
          } catch {
            return null;
          }
        })
        .filter((s) => s) as any[];
    } catch {
      return text as string;
    }
  }
};

export interface ImdbApiProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  body?: any;
  headers?: Record<string, string>;
  query?: Record<string, string>;
}

export const imdbApi = async <T>(props: ImdbApiProps) => {
  const { method, url, body, headers = {}, query } = props;

  const constructedUrl = new URL(url);

  if (query) {
    Object.keys(query).forEach((key) =>
      constructedUrl.searchParams.append(key, query[key])
    );
  }

  const response = await fetch(constructedUrl.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const { status, ok } = response;
  const result = tryParseJson(await response.text());

  if (!ok) {
    throw new HTTPException(status as any, {
      message: `API Error Occured with status code ${status}`,
    });
  }

  return result as T;
};

export interface ImdbGraphqlApiProps {
  persistedQueryHash: string;
  variables: Record<string, any>;
  operationName: string;
}

export const imdbGraphqlApi = async <T>(props: ImdbGraphqlApiProps) => {
  const { persistedQueryHash, variables, operationName } = props;

  const queryBuilder = new URLSearchParams({
    operationName: operationName,
    variables: JSON.stringify(variables),
    extensions: JSON.stringify({
      persistedQuery: { version: 1, sha256Hash: persistedQueryHash },
    }),
  });

  const response = await fetch(
    `${IMDB_GRAPHQL_ENDPOINT}?${queryBuilder.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "X-Imdb-Client-Name": "imdb-web-next-localized",
        "X-Imdb-User-Language": "en-US",
        "X-Imdb-User-Country": "US",
      },
    }
  );

  const { status, ok } = response;
  const result = tryParseJson(await response.text());

  if (!ok) {
    throw new HTTPException(status as any, {
      message: `API Error Occured with status code ${status}`,
    });
  }

  return result as T;
};
