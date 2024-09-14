import { create } from "zustand";

import createModalSlicer from "../Store/Slicers/ModalSlicer";

const _useStoreZ = create((set) => ({
    ...createModalSlicer(set),
}));

export default _useStoreZ;