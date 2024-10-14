import { create } from "zustand";

import createModalSlicer, { ModalSlicer } from "../Store/Slicers/ModalSlicer";
import createSupportSlicer, { SupportSlicer } from "../Store/Slicers/SupportSlicer";

type StoreState = ModalSlicer & SupportSlicer;

const _useStoreZ = create<StoreState>((set, get, store) => ({
    ...createModalSlicer(set, get, store),
    ...createSupportSlicer(set, get, store),
}));

export default _useStoreZ;