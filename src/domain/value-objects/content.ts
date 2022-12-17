export class Content {
  private readonly content: string;

  constructor(content: string) {
    const isContentLengthIsValid = this.validateLength(content);

    if (!isContentLengthIsValid) throw new Error('Content length is invalid');

    this.content = content;
  }

  get value(): string {
    return this.content;
  }

  private validateLength(content: string): boolean {
    return content.length >= 5 && content.length <= 255;
  }
}
