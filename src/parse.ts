import { dropSubjects } from './__static';

import type { CloudMailin, EmailData } from './types';

function parseSender(sender: string): [string, string] {
  const [name, email] = sender.split(/<|>/);
  return [name, email];
}

export function shouldForward(subject: string): boolean {
  for (const line of dropSubjects) {
    const pattern = new RegExp(line, 'g');
    if (subject.match(pattern)) {
      return false;
    } else {
      return true;
    }
  }
}

export async function parseEmailData(data: CloudMailin.Message): Promise<EmailData> {
  const { headers, plain } = data;
  const { subject = '' } = headers;
  let company = '';
  let [name, email] = parseSender(headers.from);
  const kv = await EMAIL_TO_SFDC_ORG_MATCH.list();

  for (const key of kv.keys) {
    const pattern = new RegExp(key.name, 'gi');
    const match = subject.match(pattern) ?? [];
    if (match.length !== 0) {
      company = await EMAIL_TO_SFDC_ORG_MATCH.get(key.name);
    }
  }
  return {
    company,
    name,
    email,
    subject,
    body: plain,
  };
}
