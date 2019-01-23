const Gremlin = require('gremlin');
const config = require('./../../secret.settings.json').ConnectionStrings;

export class BaseService {

    private authenticator: any;
    protected gremlinClient: any;

    constructor(){
        this.authenticator = new Gremlin
            .driver
            .auth
            .PlainTextSaslAuthenticator(
                `/dbs/${config.database}/colls/${config.collection}`, config.primaryKey);

        this.gremlinClient = new Gremlin.driver.Client(
            config.ConnectionStrings.endpoint,
            {
                authenticator: this.authenticator,
                traversalsource : 'g',
                rejectUnauthorized : true,
                mimeType : 'application/vnd.gremlin-v2.0+json'
            }
        );
    }
}
