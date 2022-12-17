import { randomUUID } from 'node:crypto';
import { Content } from '../value-objects/content';

export interface CreateNotificationProps {
  id?: string;
  content: Content;
  category: string;
  recipientId: string;
  canceledAt?: Date | null;
  createdAt?: Date;
  readAt?: Date | null;
}

export class Notification {
  private readonly _id: string;
  private _content: Content;
  private _category: string;
  private _recipientId: string;
  private _canceledAt?: Date | null;
  private readonly _createdAt: Date;
  private _readAt?: Date | null;

  constructor(props: CreateNotificationProps) {
    this._id = props.id ?? randomUUID();
    this._content = props.content;
    this._category = props.category;
    this._recipientId = props.recipientId;
    this._createdAt = props.createdAt ?? new Date();
    this._readAt = props.readAt;
    this._canceledAt = props.canceledAt ?? undefined;
  }

  public get id(): string {
    return this._id;
  }

  public get content(): Content {
    return this._content;
  }

  public set content(content: Content) {
    this._content = content;
  }

  public get category(): string {
    return this._category;
  }

  public set category(category: string) {
    this._category = category;
  }

  public get recipientId(): string {
    return this._recipientId;
  }

  public set recipientId(recipientId: string) {
    this.recipientId = recipientId;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get readAt(): Date | null | undefined {
    return this._readAt;
  }

  public unread() {
    this._readAt = null;
  }

  public read() {
    this._readAt = new Date();
  }

  public cancel(): void {
    this._canceledAt = new Date();
  }

  public get canceledAt(): Date | null | undefined {
    return this._canceledAt;
  }
}
