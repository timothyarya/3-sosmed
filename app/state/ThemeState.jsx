import { create } from "zustand"

// theme: 1 - light, 0 - dark

const useTheme = create((setTheme) => ({
    theme: 1,
    updateTheme: () => setTheme((state) => ({ theme: state.theme === 1 ? 0 : 1 })),
    logTest: () => console.log(theme)
}))
