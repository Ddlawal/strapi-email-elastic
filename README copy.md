# @strapi/provider-email-elastic

Elastic provider for strapi email

# @strapi/provider-email-elastic

### Example

**Path -** `config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: 'elastic',
      providerOptions: {
        apiKey: env('ELASTIC_API_KEY'),
      },
      settings: {
        defaultFrom: env('ELASTIC_SENDER_EMAIL'),
        defaultTo: env('ELASTIC_REPLY_TO_EMAIL'),
      },
    },
  },
  // ...
})
```
