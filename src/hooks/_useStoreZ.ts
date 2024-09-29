import create from "zustand";

import createModalSlicer, { ModalSlicer } from "../Store/Slicers/ModalSlicer";

type StoreState = ModalSlicer;

const _useStoreZ = create<StoreState>((set, get, store) => ({
    ...createModalSlicer(set, get, store),
}));

export default _useStoreZ;