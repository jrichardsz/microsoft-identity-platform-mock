# microsoft-identity-platform-mock

|![](./coverage/lines.svg) |![](./coverage/statements.svg) | ![](./coverage/branches.svg) | ![](./coverage/functions.svg)| 
|--|--|--|--|

![](https://user-images.githubusercontent.com/3322836/224444450-77aa348e-bf7f-4c26-827b-272935a9e198.png)

Simple mock of [Microsoft identity platform](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc) to speed up local developments

## Endpoints mocked

|endpoint| method| request | response | description |
|--|--|--|--|--|
| /mytenant/oauth2/v2.0/authorize  | GET  | ?redirect_uri=acme.com/foo_callback  | ?302 redirect to acme.com/foo_callback?code=*****  ||
| /mytenant/oauth2/v2.0/token  | POST | {}  | `{"access_token":"*****"}` ||
| /v1.0/me  | GET  |  | `{"mail":"jane@doe.com", "displayName":"Jane Doe"}` | this value could be overrided with an env var **expected_mail**|

## Contributors

<table>
  <tbody>
    <td>
      <img src="https://avatars0.githubusercontent.com/u/3322836?s=460&v=4" width="100px;"/>
      <br />
      <label><a href="http://jrichardsz.github.io/">JRichardsz</a></label>
      <br />
    </td>
  </tbody>
</table>