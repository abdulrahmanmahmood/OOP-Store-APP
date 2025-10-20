import { Product } from "./Product";

export class DigitalProduct extends Product {
  private static readonly UNLIMITED_STOCK = Number.MAX_SAFE_INTEGER;

  constructor(
    name: string,
    price: number,
    private _fileSize: number,
    private _downloadLink: string
  ) {
    super(name, price, DigitalProduct.UNLIMITED_STOCK, "Digital");
    if (_fileSize <= 0) {
      throw new Error("File size must be a positive number.");
    }
    this._fileSize = _fileSize;
    this._downloadLink = _downloadLink;
  }

  // Getters For private properties
  get fileSize(): number {
    return this._fileSize;
  }

  get downloadLink(): string {
    return this._downloadLink;
  }

  get fileSizeFormatted(): string {
    if (this._fileSize >= 1024) {
      return (this._fileSize / 1024).toFixed(2) + " MB";
    } else {
      return this._fileSize.toFixed(2) + " KB";
    }
  }

  // Override parent method - demonstrates polymorphism
  public displayInfo(): string {
    return ` File Size: ${this.fileSizeFormatted}, Download Link: ${this.downloadLink}`;
  }

  /**
   * Checks if the file size is within acceptable limits.
   * @param maxSize The maximum allowed file size in KB.
   * @returns True if the file size is acceptable, false otherwise.
   */

  public isFileSizeAcceptable(maxSize: number = 1000): boolean {
    return this._fileSize <= maxSize;
  }
  // Digital products have unlimited stock; override reduceStock
  public reduceStock(quantity: number): boolean {
    // Digital products have unlimited stock; always return true
    return true;
  }
}
