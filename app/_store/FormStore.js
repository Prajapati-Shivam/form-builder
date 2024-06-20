import { create } from 'zustand';

export const useFormStore = create((set) => ({
  forms: [],
  setForms: (forms) => set({ forms }),
  addForm: (form) => set((state) => ({ forms: [...state.forms, form] })),
  updateForm: (form) =>
    set((state) => ({
      forms: state.forms.map((f) => (f.id === form.id ? form : f)),
    })),
  deleteForm: (formId) =>
    set((state) => ({
      forms: state.forms.filter((f) => f.id !== formId),
    })),
}));
