import {
  BodyContentType,
  Configuration,
  EmailContent,
  EmailsApi,
  EmailTransactionalMessageData,
  TransactionalRecipient,
} from "@elasticemail/elasticemail-client-ts-axios";

export interface EmailData<T = Record<string, string>> {
  recipients: TransactionalRecipient;
  subject?: string;
  template?: {
    templateName: string;
    variables: T;
  };
  body?: {
    contentType?: BodyContentType;
    content: string;
  };
}

interface Settings {
  defaultFrom: string;
  defaultReplyTo: string;
}

interface ProviderOptions {
  apiKey: string;
}

export default {
  init(providerOptions: ProviderOptions, settings: Settings) {
    const config = new Configuration({ apiKey: providerOptions.apiKey });
    const emailsApi = new EmailsApi(config);
    const sender = settings.defaultFrom;
    console.log(
      "\n\n\n\n\n\n",
      { sender, apiKey: providerOptions.apiKey },
      "\n\n\n\n\n\n"
    );

    return {
      send(options: EmailData): Promise<void> {
        return new Promise((resolve, reject) => {
          const Content: EmailContent = {
            From: sender,
            Subject: options.subject,
          };

          if (options.template) {
            Content.TemplateName = options.template.templateName;
            Content.Merge = options.template.variables;
          }

          if (options.body) {
            Content.Body = [
              {
                Content: options.body.content,
                ContentType: options.body.contentType || "HTML",
              },
            ];
          }

          const emailData: EmailTransactionalMessageData = {
            Recipients: {
              ...options.recipients,
              To: [...options.recipients.To],
            },
            Content,
          };

          emailsApi
            .emailsTransactionalPost(emailData)
            .then((response) => {
              console.log(response.data);
              resolve();
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        });
      },
    };
  },
};
