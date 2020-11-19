/**
 * CloudMailin JSON format.
 * @see https://docs.cloudmailin.com/http_post_formats/json_normalized
 */
export namespace CloudMailin {
  /**
   * @see https://docs.cloudmailin.com/http_post_formats/json_normalized/#headers
   */
  export interface Headers {
    return_path: string;
    received: string[];
    date: string;
    from: string;
    to: string;
    message_id: string;
    subject: string;
    mime_version?: string;
    content_type?: string;
    dkim_signature?: string[];
    [k: string]: any;
  }
  /**
   * @see https://docs.cloudmailin.com/http_post_formats/json_normalized/#envelope
   */
  export interface Envelope {
    to: string;
    recipients: string[];
    from: string;
    helo_domain: string;
    remote_ip: string;
    tls: boolean;
    tls_cipher: string;
    md5: string;
    spf: {
      result: 'none' | 'neutral' | 'pass' | 'fail' | 'softfail' | 'temperror' | 'permerror';
      domain: string;
    };
  }
  /**
   * @see https://docs.cloudmailin.com/http_post_formats/json_normalized/#attachments
   */
  export interface Attachment {
    file_name: string;
    content_type: string;
    content?: string;
    size: number;
    disposition: 'attachment' | 'inline';
    url?: string;
  }
  export interface Message {
    headers: Headers;
    envelope: Envelope;
    plain: string;
    html: string;
    reply_plain: string | null;
    attachments: Attachment[];
  }
}

export interface EmailData {
  company: string;
  name: string;
  email: string;
  body: string;
  subject: string;
}
