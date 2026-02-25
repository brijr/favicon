import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { convertEmojiToFavicon } from "./favicon";

// Helper to set up canvas mock with a specific blob type
function mockCanvas(blobType: string) {
  const originalCreateElement = Object.getPrototypeOf(
    document
  ).createElement.bind(document);

  return vi
    .spyOn(document, "createElement")
    .mockImplementation((tag: string) => {
      if (tag === "canvas") {
        const canvas = originalCreateElement("canvas");
        canvas.getContext = vi.fn().mockReturnValue({
          font: "",
          textAlign: "",
          textBaseline: "",
          fillText: vi.fn(),
        });
        canvas.toBlob = vi.fn((cb: BlobCallback) => {
          cb(new Blob(["fake"], { type: blobType }));
        });
        return canvas;
      }
      return originalCreateElement(tag);
    });
}

describe("convertEmojiToFavicon", () => {
  beforeEach(() => {
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:fake-url");
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
    // Stub appendChild/removeChild to accept the anchor element
    vi.spyOn(document.body, "appendChild").mockImplementation(
      (node) => node as any
    );
    vi.spyOn(document.body, "removeChild").mockImplementation(
      (node) => node as any
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should create a 32x32 canvas and request image/x-icon", async () => {
    const createSpy = mockCanvas("image/x-icon");

    await convertEmojiToFavicon("👋");

    const canvasCall = createSpy.mock.results.find(
      (r) => r.type === "return" && r.value.tagName === "CANVAS"
    );
    expect(canvasCall).toBeDefined();
    const canvas = canvasCall!.value;
    expect(canvas.width).toBe(32);
    expect(canvas.height).toBe(32);
    expect(canvas.toBlob).toHaveBeenCalledWith(
      expect.any(Function),
      "image/x-icon"
    );
  });

  it('should return "png" when browser falls back to image/png (Firefox)', async () => {
    mockCanvas("image/png");

    const format = await convertEmojiToFavicon("🔥");
    expect(format).toBe("png");
  });

  it('should return "ico" when browser supports image/x-icon (Chromium)', async () => {
    mockCanvas("image/x-icon");

    const format = await convertEmojiToFavicon("🔥");
    expect(format).toBe("ico");
  });

  it("should set download filename to favicon.png on Firefox", async () => {
    mockCanvas("image/png");

    await convertEmojiToFavicon("✨");

    const appendCall = (document.body.appendChild as ReturnType<typeof vi.fn>)
      .mock.calls[0][0];
    expect(appendCall.download).toBe("favicon.png");
  });

  it("should set download filename to favicon.ico on Chromium", async () => {
    mockCanvas("image/x-icon");

    await convertEmojiToFavicon("✨");

    const appendCall = (document.body.appendChild as ReturnType<typeof vi.fn>)
      .mock.calls[0][0];
    expect(appendCall.download).toBe("favicon.ico");
  });

  it("should reject when canvas context is unavailable", async () => {
    const originalCreateElement = Object.getPrototypeOf(
      document
    ).createElement.bind(document);

    vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
      if (tag === "canvas") {
        const canvas = originalCreateElement("canvas");
        canvas.getContext = vi.fn().mockReturnValue(null);
        return canvas;
      }
      return originalCreateElement(tag);
    });

    await expect(convertEmojiToFavicon("👋")).rejects.toThrow(
      "Could not get canvas context"
    );
  });

  it("should clean up blob URL after download", async () => {
    mockCanvas("image/x-icon");

    await convertEmojiToFavicon("🚀");

    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:fake-url");
  });

  it("should trigger a click on the download link", async () => {
    mockCanvas("image/x-icon");

    await convertEmojiToFavicon("🎯");

    const link = (document.body.appendChild as ReturnType<typeof vi.fn>).mock
      .calls[0][0];
    expect(link.tagName).toBe("A");
    expect(link.href).toBe("blob:fake-url");
  });
});
