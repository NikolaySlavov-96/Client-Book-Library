export interface ISendFileRequest {
    deliverFile: File;
    src: string;
}

export interface ISendFileResponse {
    resourcePath: string;
    fileId: number;
}
