import { readFile } from 'fs/promises';
export default async function jsonLoader(path) {
  return JSON.parse(await readFile(new URL(path, import.meta.url)));
}
