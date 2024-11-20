import { StateCreator } from "zustand";

import { E_FORM_NAMES } from "../../Constants";

type FormFiled = Map<string, string>
type FormData = {
    fields: FormFiled;
}

export interface ICommonSlicer {
    pageLimit: number;
    setPageLimit: (limit: number) => void;
    connectId: string,
    setConnectId: (id: string) => void;

    search: Map<string, FormData>,
    setSearch: (formName: E_FORM_NAMES, field: string, value: string) => void;
    clearSearch: () => void;
}

const createCommonSlicer: StateCreator<ICommonSlicer> = (set) => ({
    pageLimit: 12,
    setPageLimit: (limit) => set({ pageLimit: limit }),

    connectId: '',
    setConnectId: (id) => set({ connectId: id }),

    search: new Map(),
    setSearch: (formName, field, value) => {
        set((state) => {
            const searchData = state.search;

            if (!searchData.has(formName)) {
                searchData.set(formName, { fields: new Map() })
            }

            const form = searchData.get(formName);
            form?.fields.set(field, value);

            return { search: new Map(searchData) }
        })
    },
    clearSearch: () => {

    },
});

export default createCommonSlicer;