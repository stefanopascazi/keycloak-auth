# keycloak-auth
Beautifull and fast module for authenticate with OAuth2 use Keycloak.


```javascript
import {Keycloak} from 'keycloak-auth'

Keycloak.init({
    "realm": "myrealm",
    "auth-server-url": "https://your-keycloak-domain.com/",
    "ssl-required": "external",
    "resource": "myclient",
    "public-client": true,
    "confidential-port": 0
}, "https://your-redirect.com/api/auth")

Keycloak.auth().createLoginString()
```

## Installation

This is a **Node.js** module available through the npm registry.

Before installing, **download and install Node.js**. Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a package.json first with the **npm init command**.

Installation is done using the **npm install command**:

```bash
$ npm install keycloak-auth`
```
## Example
[https://github.com/stefanopascazi/keycloak-auth/tree/main/example](https://github.com/stefanopascazi/keycloak-auth/tree/main/example)