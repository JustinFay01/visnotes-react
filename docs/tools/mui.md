# MUI

## Configuration

### Installation

For a [default installation](https://mui.com/material-ui/getting-started/installation/), run the following command:

```bash
pnpm add @mui/material @emotion/react @emotion/styled
```

*You may need to add a -w flag to add the package to your workspace root.*

Thats it! You are ready to start using MUI.

### Theme 

In your `src/library/` directory, create a new file called `theme.ts`. This file will house your custom theme. If you don't have a good theme in mind, I would checkout out [Coolors](https://coolors.co/).

Start by create a theme object: 
    
```ts
export const themeColors = {
    background: '#f2f2f7',
    white: '#ffffff',
    black: '#08080a',
    brand: {
        slateBlue: '#736CED',
        tropicalIndigo: '#9F9FED',
        thistle: '#D4C1EC',
        champagnePink: '#F2DFD7',
        spaceCadet: '#2E294E',
    }
}
```

Next, create a theme object that uses the colors you defined:

```ts
import { createTheme } from '@mui/material/styles';

export const themeColors = { ... }

export const theme = createTheme({
    palette: {
        primary: {
            main: themeColors.brand.slateBlue,
        },
        secondary: {
            main: themeColors.brand.tropicalIndigo,
        },
        background: {
            default: themeColors.background,
            paper: themeColors.white,
        },
        text: {
            primary: themeColors.black,
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
    },
});
```

Now, you can use the `ThemeProvider` to apply the theme to your application:

```tsx
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './library/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <YourApp />
        </ThemeProvider>
    );
}
```

#### Styling 

- Use [Padding and Margin](https://mui.com/system/spacing/) to be the numbers.
- Use [Typography](https://mui.com/system/typography/) to be `rem`.
- Utilize the [sx prop](https://mui.com/system/the-sx-prop/) for applying styles directly to components.
- Leverage [styled components](https://mui.com/system/styled/) for creating custom-styled components.

#### Global

- Customize the theme using [createTheme](https://mui.com/material-ui/customization/theming/#createtheme-options-args-theme) to define global styles, color palettes, typography, and component overrides.
- Use the [ThemeProvider](https://mui.com/material-ui/customization/theming/#themeprovider) to apply the custom theme across the entire application.
- For more info on how to customize, check [here](https://mui.com/material-ui/customization/how-to-customize/).