import querystring from 'querystring';
import { parseEmailData } from './parse';

import type { CloudMailin } from './types';

/**
 * Submit validated & parsed data to SFDC.
 */
export async function submitData(
  data: CloudMailin.Message,
  userData: IUserData,
): Promise<Response> {
  // Destructure request JSON data & set defaults in case fields are not set.
  const { body, ...emailData } = await parseEmailData(data);

  // Initialize multi-line string for case comments, to which User Data will be added.
  let caseComment = '';

  // Add each User Data key & value to case comment.
  for (let [k, v] of Object.entries(userData)) {
    caseComment += `
    ${k}: ${v}`;
  }

  // Formulate an object conforming with SFDC field requirements.
  let formData: TSFDCRequest = {
    orgid: SFDC_ORG_ID,
    status: 'New',
    type: 'Request',
    description: body,
    ['00N3j00000FccHG']: caseComment,
    ...emailData,
  };

  // Add debug fields if in development environment.
  if (ENVIRONMENT === 'development') {
    formData = { debug: 1, debugEmail: 'matt@stellar.tech', ...formData };
  }

  /**
   * Construct the submission URL in query string formatting, to emulate generic HTML form
   * submission.
   */
  const submitUrl = `${SFDC_SUBMIT_URL}?${querystring.stringify(formData)}`;
  return await fetch(submitUrl, { method: 'POST' });
}
