import { createClient } from "@supabase/supabase-js";

import { env } from "@/env.mjs";

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_KEY;
const appEnv = env.NEXT_PUBLIC_APP_ENV;

export const SUPABASE = {
  client: createClient(supabaseUrl, supabaseKey),

  _createAvatarUrl(userId: string, fileType: string) {
    return `${appEnv}/${userId}.${fileType}`;
  },
  async uploadFile(file: File, userId: string) {
    const fileType =
      file.name?.split(".").at(-1) || file.type.split("/").at(-1) || "jpg";
    const path = this._createAvatarUrl(userId, fileType);
    const { data, error } = await this.client.storage
      .from("avatar")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (data) {
      return this._getAvatarUrl(data.path);
    }

    throw error;
  },
  async deleteFiles(filePaths: string[]) {
    return await this.client.storage.from("avatar").remove(filePaths);
  },

  async listOfFiles(folder: string) {
    return await this.client.storage
      .from("avatar")
      .list(folder, { sortBy: { column: "created_at", order: "desc" } });
  },
  _getAvatarUrl(path: string) {
    return `${supabaseUrl}/storage/v1/object/public/avatar/${path}`;
  },
};
