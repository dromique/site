const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  if (!path) return path;

  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith("data:") || path.startsWith("#")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!basePath) return normalizedPath;
  if (normalizedPath.startsWith(`${basePath}/`) || normalizedPath === basePath) return normalizedPath;

  return `${basePath}${normalizedPath}`;
}
