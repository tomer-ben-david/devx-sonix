import { google, type drive_v3 } from "googleapis";
import type { DriveGateway, ListAssetsRequest, MeetingAsset } from "./pipeline";

export type DriveAuthClient = drive_v3.Options["auth"];

export const createDriveClient = (auth: DriveAuthClient): drive_v3.Drive =>
  google.drive({
    version: "v3",
    auth,
  });

export const createGoogleDriveGateway = (
  client: drive_v3.Drive,
): DriveGateway => ({
  async listAssets(request: ListAssetsRequest): Promise<MeetingAsset[]> {
    const mimeQuery = request.mimeTypes?.length
      ? ` and (${request.mimeTypes
          .map((type) => `mimeType='${type}'`)
          .join(" or ")})`
      : "";

    const response = await client.files.list({
      q: `'${request.folderId}' in parents and trashed=false${mimeQuery}`,
      fields: "files(id, name, mimeType, webViewLink, createdTime)",
      orderBy: "createdTime desc",
    });

    return (
      response.data.files?.map((file) => ({
        id: file.id ?? "",
        name: file.name ?? "Untitled",
        mimeType: file.mimeType ?? "application/octet-stream",
        webViewLink: file.webViewLink ?? undefined,
        createdTime: file.createdTime ?? undefined,
      })) ?? []
    );
  },
});
