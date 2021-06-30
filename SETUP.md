# src

## Environments Configuration

Environment configuration must be added to the root level 'environments.js' with 
operational requirements for each environment.  

The default is 'development' and the enironment can be changed using a .env 
file and setting the STAGE variable to another environment.

```bash

require('dotenv').config();

const env = process.env.STAGE || 'development'

const configs = {
  development: {
    api: {
      endpoint: '',
      key: ''
    },
    googleservices: {
      key: ''
    }
  },
  staging: {
    api: {
      endpoint: '',
      key: ''
    },
    googleservices: {
      key: ''
    }
  },
  production: {
    api: {
      endpoint: '',
      key: ''
    },
    googleservices: {
      key: ''
    }
  }
}

const config = configs[env]

export { config, env }

```

GOOGLE SERVICES (googleservices.key)

Will need to setup a Google Services API Key with google maps web access and geo coding.
