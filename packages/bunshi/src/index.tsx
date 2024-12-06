export * from "./block";
export * from "./layer";
export * from "./utils";

import { Preview } from "./components";
import {
  ThemeProvider,
  LayerProvider,
  AssetProvider,
  PreviewProvider,
} from "./providers";

type Props = React.ComponentProps<typeof ThemeProvider> &
  React.ComponentProps<typeof LayerProvider> &
  React.ComponentProps<typeof AssetProvider> &
  React.ComponentProps<typeof PreviewProvider> &
  React.ComponentProps<typeof Preview>;

export function Editor({ layers, assets, onUpload, onClose, onExport }: Props) {
  return (
    <ThemeProvider>
      <LayerProvider layers={layers}>
        <PreviewProvider>
          <AssetProvider
            assets={assets}
            onUpload={onUpload}
          >
            <Preview
              onClose={onClose}
              onExport={onExport}
            />
          </AssetProvider>
        </PreviewProvider>
      </LayerProvider>
    </ThemeProvider>
  );
}
