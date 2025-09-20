import api from './_api';

import {
    ISendFileRequest,
    ISendFileResponse,
} from './FileService.interface';

const PREFIX = '/file'

export const sendFile = async (data: ISendFileRequest): Promise<ISendFileResponse> => api.post(`${PREFIX}/addImage`, { inputData: data, isImage: true });