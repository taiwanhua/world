export function getServicePageTitle(
  serviceKey: string,
  title: string,
  isTakeLast: boolean,
): string | undefined {
  return isTakeLast ? title.split(">").pop() : `[${serviceKey}] ${title}`;
}
