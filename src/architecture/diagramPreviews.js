const previewAssets = import.meta.glob("../../diagrams/exports/png/*.png", {
  eager: true,
  import: "default",
});

export const diagramPreviewById = Object.fromEntries(
  Object.entries(previewAssets).map(([filePath, assetUrl]) => {
    const id = filePath.split("/").pop()?.replace(/\.png$/i, "");
    return [id, assetUrl];
  })
);

export function getDiagramPreview(id) {
  return diagramPreviewById[id] || null;
}

