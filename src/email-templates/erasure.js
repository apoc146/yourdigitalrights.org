export default {
  subject: "Erasure Request",
  formatBody(data) {
    const date = new Date();
    return `${data.name}
${data.address}
${data.email}

${date.toLocaleDateString()}

Dear Sir or Madam:

I am writing to request that you erase all my personal information from all your information systems pursuant to Article 17 of the General Data Protection Regulation (GDPR). Please confirm that you have erased my personal information, and that you have followed up with any organization with whom my information has been shared with.

If you need any more information from me, please let me know as soon as possible. Please note that I have the right to receive this information in a standardized format within 30 days of your receipt of this request.

If you do not normally deal with these requests, please pass along this letter to your Data Protection Officer. I can be contacted by email, phone, and mail. My preferred method of contact is email.

Regards,

${data.name}`;
  }
};