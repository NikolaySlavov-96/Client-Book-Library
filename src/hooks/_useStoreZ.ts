import { create } from "zustand";
import { persist } from 'zustand/middleware';

import createCommonSlicer, { ICommonSlicer } from "../Store/Slicers/CommonSlicer";
import createModalSlicer, { IModalSlicer } from "../Store/Slicers/ModalSlicer";
import createSupportSlicer, { ISupportSlicer } from "../Store/Slicers/SupportSlicer";

import { STORAGE_KEYS } from "../Constants";

// const commonSlicerPersist = persist(createCommonSlicer, {
//     name: STORAGE_KEYS.CONNECT_ID
// })
type StoreState = IModalSlicer & ISupportSlicer & ICommonSlicer;

const _useStoreZ = create<StoreState>((set, get, store) => ({
    ...createModalSlicer(set, get, store),
    ...createSupportSlicer(set, get, store),
    ...createCommonSlicer(set, get, store),
}));

export default _useStoreZ;