import { Storage, API } from "aws-amplify";

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });

  return stored.key;
}

export async function enhanceNote(id) {
  return API.post("notes", `/notes/${id}/enhance`);
}